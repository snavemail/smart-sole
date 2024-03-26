import pytest
from smartsole.gaittest.models import GaitTest
from smartsole.fixtures.user import user


@pytest.fixture
def gaittest(db, user):
    return GaitTest.objects.create(user=user, name="Test Gait Name")
