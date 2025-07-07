from django.db import models
from django.contrib.auth.models import User
from machines.models import Machine
from directories.models import MaintenanceType, ServiceCompany

class Maintenance(models.Model):
    """Техническое обслуживание"""
    maintenance_type = models.ForeignKey(MaintenanceType, on_delete=models.CASCADE, verbose_name='Вид ТО')
    maintenance_date = models.DateField(verbose_name='Дата проведения ТО')
    operating_hours = models.IntegerField(verbose_name='Наработка, м/час')
    work_order_number = models.CharField(max_length=100, verbose_name='№ заказ-наряда')
    work_order_date = models.DateField(verbose_name='Дата заказ-наряда')
    maintenance_company = models.CharField(max_length=200, verbose_name='Организация, проводившая ТО')
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name='maintenances', verbose_name='Машина')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name='Сервисная компания')
    
    class Meta:
        verbose_name = 'Техническое обслуживание'
        verbose_name_plural = 'Техническое обслуживание'
        ordering = ['-maintenance_date']
    
    def __str__(self):
        return f"{self.maintenance_type.name} - {self.machine.serial_number} - {self.maintenance_date}"