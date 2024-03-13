from .models import User, Profile, Test, Step, SensorReading
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


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = "__all__"


class SensorReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorReading
        fields = "__all__"


class AverageStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = "__all__"
