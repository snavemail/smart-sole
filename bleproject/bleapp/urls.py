# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("users", views.get_users),
    path("user/<str:user_id>", views.get_user),
    path("update_user/<str:user_id>", views.update_user),
    path("delete_user/<str:user_id>", views.delete_user),
]
