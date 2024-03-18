from django.db import models
from django.contrib.auth.hashers import make_password, check_password


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
    gender = models.IntegerField()
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


class AverageStep(models.Model):
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)
    std_dev = models.FloatField()
    mean = models.FloatField()
    median = models.FloatField()
    min_value = models.FloatField()
    max_value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.test_id + " " + self.std_dev + " " + self.mean


class AverageSensorReading(models.Model):
    step_id = models.ForeignKey(AverageStep, on_delete=models.CASCADE)
    sensor_id = models.IntegerField()
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            "avg step for sensor: "
            + self.sensor_id
            + " at "
            + self.timestamp
            + " is "
            + self.value
        )
