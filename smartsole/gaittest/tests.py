import pytest
from smartsole.gaittest.models import GaitTest
from smartsole.fixtures.user import user


@pytest.mark.django_db
def test_create_gaittest(user):
    gaittest_data = {
        "user": user,
        "name": "Test Gait Test",
    }
    gaittest = GaitTest.objects.create(**gaittest_data)
    assert gaittest.name == "Test Gait Test"
    assert gaittest.user == user
