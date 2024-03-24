from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from smartsole.auth.serializers import LoginSerializer


class LoginViewSet(ViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post", "get"]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
