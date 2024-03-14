from django.db import models
from django.contrib.auth.hashers import make_password, check_password


# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


class Profile(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    dob = models.DateField()
    weight = models.FloatField(null=True)
    height = models.FloatField(null=True)
    shoe_size = models.FloatField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id.first_name + " " + self.user_id.last_name


class Test(models.Model):
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="Default Test Name")
    start_time = models.DateTimeField(auto_now=True)
    duration = models.IntegerField()  # in milliseconds
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Step(models.Model):
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.timestamp + " " + self.value


class SensorReading(models.Model):
    step_id = models.ForeignKey(Step, on_delete=models.CASCADE)
    sensor_id = models.IntegerField()
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sensor_id + " " + self.timestamp + " " + self.value


class AverageStep(models.Model):
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)
    sensor_0_time = models.IntegerField()
    sensor_0_value = models.FloatField()
    sensor_1_time = models.IntegerField()
    sensor_1_value = models.FloatField()
    sensor_2_time = models.IntegerField()
    sensor_2_value = models.FloatField()
    sensor_3_time = models.IntegerField()
    sensor_3_value = models.FloatField()
    sensor_4_time = models.IntegerField()
    sensor_4_value = models.FloatField()
    sensor_5_time = models.IntegerField()
    sensor_5_value = models.FloatField()

    def __str__(self):
        return (
            self.test_id
            + " "
            + self.sensor_0_time
            + " "
            + self.sensor_0_value
            + " "
            + self.sensor_1_time
            + " "
            + self.sensor_1_value
            + " "
            + self.sensor_2_time
            + " "
            + self.sensor_2_value
            + " "
            + self.sensor_3_time
            + " "
            + self.sensor_3_value
            + " "
            + self.sensor_4_time
            + " "
            + self.sensor_4_value
            + " "
            + self.sensor_5_time
            + " "
            + self.sensor_5_value
        )
