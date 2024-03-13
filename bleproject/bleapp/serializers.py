from .models import User, Profile, Test, Step, SensorReading
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user_id",
            "shoe_size",
        ]


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["profile_id", "name", "start_time", "duration"]


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ["test_id", "timestamp"]


class SensorReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorReading
        fields = ["step_id", "sensor_id", "value"]


class AverageStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = "__all__"
