from django.db import models
from smartsole.abstract.models import AbstractModel, AbstractManager


class GaitTestManager(AbstractManager):
    pass


class GaitTest(AbstractModel):
    user = models.ForeignKey("smartsole_user.User", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    end_time = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    objects = GaitTestManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "gait_test"
