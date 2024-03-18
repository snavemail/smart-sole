from .models import User, Profile, Test, AverageStep, AverageSensorReading
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"


class AverageStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageStep
        fields = "__all__"


class AverageSensorReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageSensorReading
        fields = "__all__"
