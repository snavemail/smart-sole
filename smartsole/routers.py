from rest_framework_nested import routers
from smartsole.user.viewsets import UserViewSet
from smartsole.auth.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet
from smartsole.gaittest.viewsets import GaitTestViewSet
from smartsole.sensor.viewsets import SensorViewSet


router = routers.SimpleRouter()

# USER #
router.register(r"user", UserViewSet, basename="user")

# AUTH #
router.register(r"auth/register", RegisterViewSet, basename="auth-register")
router.register(r"auth/login", LoginViewSet, basename="auth-login")
router.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")

# GAIT TEST #
router.register(r"gaittest", GaitTestViewSet, basename="gaittest")

router.register(
    r"gaittest/(?P<gaittest_pk>[^/.]+)/sensor",
    SensorViewSet,
    basename="gaittest-sensor",
)


urlpatterns = [
    *router.urls,
]
