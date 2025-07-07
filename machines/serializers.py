from rest_framework import serializers
from .models import Machine
from directories.serializers import (
    TechniqueModelSerializer, EngineModelSerializer, TransmissionModelSerializer,
    DriveAxleModelSerializer, SteerAxleModelSerializer
)

class MachineListSerializer(serializers.ModelSerializer):
    """Сериализатор для списка машин (ограниченные поля для неавторизованных)"""
    technique_model = TechniqueModelSerializer(read_only=True)
    engine_model = EngineModelSerializer(read_only=True)
    transmission_model = TransmissionModelSerializer(read_only=True)
    drive_axle_model = DriveAxleModelSerializer(read_only=True)
    steer_axle_model = SteerAxleModelSerializer(read_only=True)
    
    class Meta:
        model = Machine
        fields = [
            'id', 'serial_number', 'technique_model', 'engine_model', 
            'engine_serial', 'transmission_model', 'transmission_serial',
            'drive_axle_model', 'drive_axle_serial', 'steer_axle_model', 
            'steer_axle_serial', 'shipment_date'
        ]

class MachineDetailSerializer(serializers.ModelSerializer):
    """Полный сериализатор для авторизованных пользователей"""
    technique_model = TechniqueModelSerializer(read_only=True)
    engine_model = EngineModelSerializer(read_only=True)
    transmission_model = TransmissionModelSerializer(read_only=True)
    drive_axle_model = DriveAxleModelSerializer(read_only=True)
    steer_axle_model = SteerAxleModelSerializer(read_only=True)
    client_name = serializers.CharField(source='client.get_full_name', read_only=True)
    service_company_name = serializers.CharField(source='service_company.get_full_name', read_only=True)
    
    class Meta:
        model = Machine
        fields = [
            'id', 'serial_number', 'technique_model', 'engine_model', 
            'engine_serial', 'transmission_model', 'transmission_serial',
            'drive_axle_model', 'drive_axle_serial', 'steer_axle_model', 
            'steer_axle_serial', 'supply_contract', 'shipment_date',
            'consignee', 'delivery_address', 'equipment', 'client_name',
            'service_company_name'
        ]
