from django.db import models
from django.contrib.auth.hashers import make_password, check_password


# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


class Test(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration = models.IntegerField()  # in milliseconds
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class SensorReadings(models.Model):
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)
    sensor_id = models.IntegerField()
    timestamp = models.DateTimeField()
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sensor_id + " " + self.timestamp + " " + self.value
