from django.db import models
from django.contrib.auth.models import User
from directories.models import (
    TechniqueModel, EngineModel, TransmissionModel, 
    DriveAxleModel, SteerAxleModel, ServiceCompany
)

class Machine(models.Model):
    """Машина - основная сущность"""
    # Основные характеристики
    serial_number = models.CharField(max_length=50, unique=True, verbose_name='Зав. № машины')
    technique_model = models.ForeignKey(TechniqueModel, on_delete=models.CASCADE, verbose_name='Модель техники')
    engine_model = models.ForeignKey(EngineModel, on_delete=models.CASCADE, verbose_name='Модель двигателя')
    engine_serial = models.CharField(max_length=50, verbose_name='Зав. № двигателя')
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE, verbose_name='Модель трансмиссии')
    transmission_serial = models.CharField(max_length=50, verbose_name='Зав. № трансмиссии')
    drive_axle_model = models.ForeignKey(DriveAxleModel, on_delete=models.CASCADE, verbose_name='Модель ведущего моста')
    drive_axle_serial = models.CharField(max_length=50, verbose_name='Зав. № ведущего моста')
    steer_axle_model = models.ForeignKey(SteerAxleModel, on_delete=models.CASCADE, verbose_name='Модель управляемого моста')
    steer_axle_serial = models.CharField(max_length=50, verbose_name='Зав. № управляемого моста')
    
    # Договор и отгрузка
    supply_contract = models.CharField(max_length=100, verbose_name='Договор поставки №, дата')
    shipment_date = models.DateField(verbose_name='Дата отгрузки с завода')
    
    # Получатель и адрес
    consignee = models.CharField(max_length=200, verbose_name='Грузополучатель (конечный потребитель)')
    delivery_address = models.CharField(max_length=300, verbose_name='Адрес поставки (эксплуатации)')
    equipment = models.TextField(blank=True, verbose_name='Комплектация (доп. опции)')
    
    # Связи с пользователями
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_machines', verbose_name='Клиент')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name='Сервисная компания')
    
    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'
        ordering = ['-shipment_date']
    
    def __str__(self):
        return f"{self.technique_model.name} - {self.serial_number}"