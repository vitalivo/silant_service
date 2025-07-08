from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Machine
from .serializers import MachineListSerializer, MachineDetailSerializer

class MachineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Machine.objects.select_related(
        'technique_model', 'engine_model', 'transmission_model',
        'drive_axle_model', 'steer_axle_model', 'client', 'service_company'
    ).all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['technique_model', 'engine_model', 'transmission_model', 'drive_axle_model', 'steer_axle_model']
    search_fields = ['serial_number', 'engine_serial', 'transmission_serial']
    ordering_fields = ['shipment_date', 'serial_number']
    ordering = ['-shipment_date']

    def get_permissions(self):
        """
        Настройка разрешений для разных действий
        """
        if self.action in ['list', 'retrieve', 'search_by_serial']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list' and not self.request.user.is_authenticated:
            return MachineListSerializer
        return MachineDetailSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Фильтрация по пользователю для клиентов и сервисных компаний
        if self.request.user.is_authenticated:
            user_groups = self.request.user.groups.values_list('name', flat=True)
            
            if 'Клиенты' in user_groups:
                # Клиент видит только свои машины
                queryset = queryset.filter(client=self.request.user)
            elif 'Сервисные организации' in user_groups:
                # Сервисная организация видит машины, которые она обслуживает
                queryset = queryset.filter(service_company=self.request.user)
        
        return queryset

    @action(
        detail=False, 
        methods=['get'], 
        permission_classes=[permissions.AllowAny],
        url_path='search_by_serial',
        url_name='search_by_serial'
    )
    def search_by_serial(self, request):
        """Поиск машины по серийному номеру - доступен всем"""
        serial = request.query_params.get('serial', '')
        if not serial:
            return Response({'error': 'Параметр serial обязателен'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Для неавторизованных пользователей используем базовый queryset без фильтрации
            base_queryset = Machine.objects.select_related(
                'technique_model', 'engine_model', 'transmission_model',
                'drive_axle_model', 'steer_axle_model'
            ).all()
            
            machine = base_queryset.get(serial_number=serial)
            
            # Используем ограниченный сериализатор для неавторизованных
            if not request.user.is_authenticated:
                serializer = MachineListSerializer(machine)
            else:
                serializer = MachineDetailSerializer(machine)
                
            return Response(serializer.data)
        except Machine.DoesNotExist:
            return Response({'error': 'Машина не найдена'}, status=status.HTTP_404_NOT_FOUND)

