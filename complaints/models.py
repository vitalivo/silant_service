from django.db import models
from django.contrib.auth.models import User
from machines.models import Machine
from directories.models import FailureNode, RecoveryMethod, ServiceCompany

class Complaint(models.Model):
    """Рекламация"""
    failure_date = models.DateField(verbose_name='Дата отказа')
    operating_hours = models.IntegerField(verbose_name='Наработка, м/час')
    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE, verbose_name='Узел отказа')
    failure_description = models.TextField(verbose_name='Описание отказа')
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE, verbose_name='Способ восстановления')
    spare_parts = models.TextField(blank=True, verbose_name='Используемые запасные части')
    recovery_date = models.DateField(verbose_name='Дата восстановления')
    downtime = models.IntegerField(verbose_name='Время простоя техники')
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name='complaints', verbose_name='Машина')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name='Сервисная компания')
    
    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'
        ordering = ['-failure_date']
    
    def save(self, *args, **kwargs):
        # Автоматический расчет времени простоя
        if self.failure_date and self.recovery_date:
            self.downtime = (self.recovery_date - self.failure_date).days
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Рекламация {self.machine.serial_number} - {self.failure_date}"