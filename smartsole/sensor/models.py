from django.db import models
from smartsole.abstract.models import AbstractModel, AbstractManager


class SensorManager(AbstractManager):
    pass


class Sensor(AbstractModel):
    gaittest = models.ForeignKey(
        "smartsole_gaittest.GaitTest", on_delete=models.PROTECT
    )
    sensor_id = models.IntegerField()
    force = models.FloatField()
    timestamp = models.DateTimeField()
    step_number = models.IntegerField()

    objects = SensorManager()

    def __str__(self):
        return f"{self.sensor_id} - {self.timestamp}"
