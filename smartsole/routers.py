from rest_framework import routers
from smartsole.user.viewsets import UserViewSet
from smartsole.auth.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet


routers = routers.DefaultRouter()

# USER #
routers.register(r"user", UserViewSet, basename="user")

# AUTH #
routers.register(r"auth/register", RegisterViewSet, basename="auth-register")
routers.register(r"auth/login", LoginViewSet, basename="auth-login")
routers.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")

urlpatterns = [
    *routers.urls,
]
