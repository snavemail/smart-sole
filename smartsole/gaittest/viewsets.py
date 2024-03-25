from rest_framework.permissions import IsAuthenticated, IsAdminUser
from smartsole.abstract.viewsets import AbstractViewSet
from smartsole.gaittest.models import GaitTest
from smartsole.gaittest.serializers import GaitTestSerializer
from rest_framework import status
from rest_framework.response import Response


class GaitTestViewSet(AbstractViewSet):
    http_method_names = ["get", "post", "put", "delete"]
    serializer_class = GaitTestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GaitTest.objects.all()

    def get_object(self):
        obj = GaitTest.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
