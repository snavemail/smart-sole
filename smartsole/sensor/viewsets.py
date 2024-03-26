from uuid import UUID
from django.http.response import Http404

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from smartsole.abstract.viewsets import AbstractViewSet
from smartsole.sensor.models import Sensor
from smartsole.sensor.serializers import SensorSerializer
from smartsole.auth.permissions import UserPermission


class SensorViewSet(AbstractViewSet):
    http_method_names = ("post", "get", "put", "delete")
    permission_classes = (UserPermission,)
    serializer_class = SensorSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Sensor.objects.all()

        gaittest_pk = self.kwargs["gaittest_pk"]
        if gaittest_pk is None:
            return Http404
        queryset = Sensor.objects.filter(gaittest__public_id=gaittest_pk)

        return queryset

    def get_object(self):
        obj = Sensor.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
