from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Maintenance
from .serializers import MaintenanceSerializer

class MaintenanceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Maintenance.objects.select_related(
        'machine', 'maintenance_type', 'service_company'
    ).all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.AllowAny]  # Временно разрешить всем
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['maintenance_type', 'machine', 'service_company']
    search_fields = ['work_order_number', 'machine__serial_number']
    ordering_fields = ['maintenance_date', 'operating_hours']
    ordering = ['-maintenance_date']