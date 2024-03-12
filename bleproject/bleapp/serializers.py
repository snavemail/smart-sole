# serializers.py
from rest_framework import serializers
from .models import User, Test, SensorReadings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "created_at",
            "updated_at",
        ]


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = [
            "id",
            "user_id",
            "name",
            "start_time",
            "end_time",
            "duration",
            "created_at",
            "updated_at",
        ]


class SensorReadingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorReadings
        fields = [
            "id",
            "test_id",
            "sensor_id",
            "timestamp",
            "value",
            "created_at",
            "updated_at",
        ]
