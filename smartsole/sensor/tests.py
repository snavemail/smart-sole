import pytest
from smartsole.fixtures.gaittest import gaittest
from smartsole.sensor.models import Sensor


@pytest.mark.django_db
def test_create_sensor(gaittest):
    sensor = Sensor.objects.create(
        gaittest=gaittest,
        sensor_id=1,
        force=1.0,
        timestamp="2021-01-01T00:00:00Z",
        step_number=2,
    )
    assert sensor.gaittest == gaittest
    # assert sensor.gaittest == gaittest
    # assert sensor.sensor_id == 1
    # assert sensor.force == 1.0
    # assert sensor.timestamp == "2021-01-01T00:00:00Z"
    # assert sensor.step_number == 2
    # assert sensor.created
    # assert sensor.updated
    # assert sensor.created == sensor.updated
    # assert sensor.__str__() == "Step: 2 - Id: 1"
