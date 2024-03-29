from rest_framework import serializers
from smartsole.user.models import User
from smartsole.abstract.serializers import AbstractSerializer


class UserSerializer(AbstractSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
            "email",
            "is_active",
            "dob",
            "gender",
            "weight",
            "height",
            "shoe_size",
            "created",
            "updated",
        ]
        read_only_field = ["is_active", "id", "created", "updated"]
