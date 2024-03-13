from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.users, name="user-list-create"),
    path(
        "get-user-profile/<int:user_id>",
        views.get_user_profile,
        name="get-user-profile",
    ),
    path("users/<int:pk>/", views.user_retrieve_update_destroy, name="user-detail"),
    path("profiles/", views.profiles, name="profile-list-create"),
    path(
        "profiles/<int:pk>/",
        views.profile_retrieve_update_destroy,
        name="profile-detail",
    ),
    path("tests/", views.tests, name="test-list-create"),
    path(
        "get-user-tests/<int:profile_id>", views.get_user_tests, name="get-user-tests"
    ),
    path("tests/<int:pk>/", views.test_retrieve_update_destroy, name="test-detail"),
    path("steps/", views.steps, name="step-list-create"),
    path("steps/<int:pk>/", views.step_retrieve_update_destroy, name="step-detail"),
    path(
        "sensor-readings/",
        views.sensor_readings,
        name="sensor-reading-list-create",
    ),
    path(
        "sensor-readings/<int:pk>/",
        views.sensor_reading_retrieve_update_destroy,
        name="sensor-reading-detail",
    ),
    path(
        "average-steps/",
        views.average_steps,
        name="average-step-list-create",
    ),
    path(
        "average-steps/<int:pk>/",
        views.average_step_retrieve_update_destroy,
        name="average-step-detail",
    ),
    path("admin-users/", views.UserListCreate.as_view(), name="user-list-create"),
    path(
        "admin-users/<int:pk>/",
        views.UserRetrieveUpdateDestroy.as_view(),
        name="user-detail",
    ),
    path(
        "admin-profiles/", views.ProfileListCreate.as_view(), name="profile-list-create"
    ),
    path(
        "admin-profiles/<int:pk>/",
        views.ProfileRetrieveUpdateDestroy.as_view(),
        name="profile-detail",
    ),
    path("admin-tests/", views.TestListCreate.as_view(), name="test-list-create"),
    path(
        "admin-tests/<int:pk>/",
        views.TestRetrieveUpdateDestroy.as_view(),
        name="test-detail",
    ),
    path("admin-steps/", views.StepListCreate.as_view(), name="step-list-create"),
    path(
        "admin-steps/<int:pk>/",
        views.StepRetrieveUpdateDestroy.as_view(),
        name="step-detail",
    ),
    path(
        "admin-sensor-readings/",
        views.SensorReadingListCreate.as_view(),
        name="sensor-reading-list-create",
    ),
    path(
        "admin-sensor-readings/<int:pk>/",
        views.SensorReadingRetrieveUpdateDestroy.as_view(),
        name="sensor-reading-detail",
    ),
    path(
        "admin-average-steps/",
        views.AverageStepListCreate.as_view(),
        name="average-step-list-create",
    ),
    path(
        "admin-average-steps/<int:pk>/",
        views.AverageStepRetrieveUpdateDestroy.as_view(),
        name="average-step-detail",
    ),
]
