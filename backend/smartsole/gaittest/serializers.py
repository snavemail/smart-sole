from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from smartsole.abstract.serializers import AbstractSerializer
from smartsole.gaittest.models import GaitTest
from smartsole.user.models import User
from smartsole.user.serializers import UserSerializer


class GaitTestSerializer(AbstractSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="public_id"
    )
    duration = serializers.DurationField(read_only=True)

    def get_duration(self, instance):
        return 0

    def validate_author(self, value):
        if not self.context["request"].user.is_superuser:
            raise ValidationError("Only superusers can create gait tests")
        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        user = User.objects.get_object_by_public_id(rep["user"])
        rep["user"] = UserSerializer(user).data
        return rep

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        return instance

    class Meta:
        model = GaitTest
        fields = ["id", "user", "name", "created", "end_time", "duration", "updated"]

    def validate(self, attrs):
        if "end_time" in attrs:
            if (
                attrs["end_time"] is not None
                and attrs["end_time"] < attrs["start_time"]
            ):
                raise ValidationError(
                    {"end_time": "End time cannot be before start time."}
                )

        return attrs
