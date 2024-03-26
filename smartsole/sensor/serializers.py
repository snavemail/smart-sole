from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from smartsole.abstract.serializers import AbstractSerializer
from smartsole.user.models import User
from smartsole.user.serializers import UserSerializer
from smartsole.sensor.models import Sensor
from smartsole.gaittest.models import GaitTest
from smartsole.gaittest.serializers import GaitTestSerializer


class SensorSerializer(AbstractSerializer):
    gaittest = serializers.SlugRelatedField(
        queryset=GaitTest.objects.all(), slug_field="public_id"
    )

    def validate_gaittest(self, value):
        if self.instance:
            return self.instance.gaittest
        return value

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        return rep

    class Meta:
        model = Sensor
        fields = [
            "id",
            "gaittest",
            "sensor_id",
            "force",
            "timestamp",
            "step_number",
            "created",
            "updated",
        ]
        read_only_fields = ["edited"]
