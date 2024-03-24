from rest_framework import routers
from smartsole.user.viewsets import UserViewSet

router = routers.DefaultRouter()

# USER #
router.register(r"user", UserViewSet, basename="user")

urlpatterns = [
    *router.urls,
]
