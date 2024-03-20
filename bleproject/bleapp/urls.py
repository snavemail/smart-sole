from django.urls import path
from . import views

urlpatterns = [
    path("data", views.receive_sensor_data, name="receive_sensor_data"),
    path("users", views.users, name="user-list-create"),
    path(
        "profile/<int:user_id>",
        views.get_user_profile,
        name="profile",
    ),
    path("users/<int:pk>", views.user_retrieve_update_destroy, name="user-detail"),
    path("profiles", views.profiles, name="profile-list-create"),
    path(
        "profiles/<int:pk>",
        views.profile_retrieve_update_destroy,
        name="profile-detail",
    ),
    path("tests", views.tests, name="test-list-create"),
    path("profiles/<int:profile_id>/tests", views.user_tests, name="get-user-tests"),
    path("tests/<int:pk>", views.test_retrieve_update_destroy, name="test-detail"),
    path(
        "average-steps",
        views.average_steps,
        name="average-step-list-create",
    ),
    path(
        "average-steps/<int:pk>",
        views.average_step_retrieve_update_destroy,
        name="average-step-detail",
    ),
    path(
        "average-sensor-readings",
        views.average_sensor_readings,
        name="sensor-reading-list-create",
    ),
    path(
        "average-sensor-readings/<int:pk>",
        views.average_sensor_reading_retrieve_update_destroy,
        name="sensor-reading-detail",
    ),
]
