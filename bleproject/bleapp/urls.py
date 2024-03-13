from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.UserListCreate.as_view(), name="user-list-create"),
    path(
        "users/<int:pk>/", views.UserRetrieveUpdateDestroy.as_view(), name="user-detail"
    ),
    path("profiles/", views.ProfileListCreate.as_view(), name="profile-list-create"),
    path(
        "profiles/<int:pk>/",
        views.ProfileRetrieveUpdateDestroy.as_view(),
        name="profile-detail",
    ),
    path("tests/", views.TestListCreate.as_view(), name="test-list-create"),
    path(
        "tests/<int:pk>/", views.TestRetrieveUpdateDestroy.as_view(), name="test-detail"
    ),
    path("steps/", views.StepListCreate.as_view(), name="step-list-create"),
    path(
        "steps/<int:pk>/", views.StepRetrieveUpdateDestroy.as_view(), name="step-detail"
    ),
    path(
        "sensor-readings/",
        views.SensorReadingListCreate.as_view(),
        name="sensor-reading-list-create",
    ),
    path(
        "sensor-readings/<int:pk>/",
        views.SensorReadingRetrieveUpdateDestroy.as_view(),
        name="sensor-reading-detail",
    ),
    path(
        "average-steps/",
        views.AverageStepListCreate.as_view(),
        name="average-step-list-create",
    ),
    path(
        "average-steps/<int:pk>/",
        views.AverageStepRetrieveUpdateDestroy.as_view(),
        name="average-step-detail",
    ),
]
