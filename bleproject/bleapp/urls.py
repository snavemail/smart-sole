from django.urls import path
from . import views

urlpatterns = [
    path("data", views.receive_sensor_data, name="receive_sensor_data"),
    path("users", views.users_profiles, name="users-profiles"),
    path(
        "users/<int:user_id>",
        views.user_profile,
        name="profile",
    ),
    path("users/<int:user_id>/tests", views.user_tests, name="get-user-tests"),
    path(
        "users/<int:user_id>/tests/<int:test_id>",
        views.user_test_detail,
        name="get-user-test-detail",
    ),
]
