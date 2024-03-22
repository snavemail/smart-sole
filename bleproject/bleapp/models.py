from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone


class User(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=100)

    email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


class Profile(models.Model):
    user_id = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    dob = models.DateField(null=True)
    gender = models.IntegerField(null=True)
    weight = models.FloatField(null=True)
    height = models.FloatField(null=True)
    shoe_size = models.FloatField(null=True)
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True)
    pw_last_reset = models.DateTimeField(auto_now=True)
    role = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id.first_name + " " + self.user_id.last_name


class Test(models.Model):
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="Test")
    start_time = models.DateTimeField(auto_now=True)
    duration = models.IntegerField()  # in milliseconds
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = f"Test: {timezone.now().date()}"
        super().save(*args, **kwargs)


class Step(models.Model):
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)
    step_number = models.IntegerField()  # Might not need this
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.test_id + " " + self.step_number


class Sensor(models.Model):
    sensor_id = models.IntegerField()
    step_id = models.ForeignKey(Step, on_delete=models.CASCADE)
    force = models.FloatField()

    def __str__(self):
        return self.sensor_name


class AverageSensorReading(models.Model):
    step_id = models.ForeignKey(Step, on_delete=models.CASCADE)
    sensor_id = models.IntegerField()
    std_dev = models.FloatField()
    mean = models.FloatField()
    median = models.FloatField()
    min_value = models.FloatField()
    max_value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sensor_id + " " + self.std_dev + " " + self.mean
