import uuid
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.http import Http404
from smartsole.abstract.models import AbstractModel, AbstractManager


class UserManager(BaseUserManager, AbstractManager):

    def create_user(self, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone
        number, and password."""
        if email is None:
            raise TypeError("Users must have an email address.")
        if password is None:
            raise TypeError("Users must have a password.")
        user = self.model(email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_super_user(self, email, password, **kwargs):
        """
        Create and return a `User` with superuser (admin)
        permissions.
        """
        if email is None:
            raise TypeError("Superusers must have an email address.")
        if password is None:
            raise TypeError("Superusers must have a password.")
        user = self.create_user(email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin, AbstractModel):
    public_id = models.UUIDField(
        db_index=True, unique=True, default=uuid.uuid4, editable=False
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)

    avatar = models.ImageField(null=True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=255, null=True)
    weight = models.FloatField(null=True)
    height = models.FloatField(null=True)
    shoe_size = models.FloatField(null=True)

    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
