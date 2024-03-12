from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Test, SensorReadings
from .serializers import UserSerializer, TestSerializer, SensorReadingsSerializer
from django.contrib.auth.hashers import make_password


@api_view(["GET"])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def create_user(request):
    data = request.data.copy()
    password = data.get("password")
    if password:
        data["password"] = make_password(password)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# Controller for the /tests endpoint
@api_view(["GET", "POST", "PUT", "DELETE"])
def tests(request, test_id=None, user_id=None):
    if request.method == "GET":
        if test_id:
            try:
                test = Test.objects.get(id=test_id)
                serializer = TestSerializer(test)
                return Response(serializer.data)
            except Test.DoesNotExist:
                return Response(
                    {"error": "Test not found"}, status=status.HTTP_404_NOT_FOUND
                )
        elif user_id:
            try:
                tests = Test.objects.filter(user_id=user_id)
                serializer = TestSerializer(tests, many=True)
                return Response(serializer.data)
            except Test.DoesNotExist:
                return Response(
                    {"error": "No tests found for the user"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        try:
            test = Test.objects.get(id=test_id)
            serializer = TestSerializer(test, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Test.DoesNotExist:
            return Response(
                {"error": "Test not found"}, status=status.HTTP_404_NOT_FOUND
            )

    elif request.method == "DELETE":
        try:
            test = Test.objects.get(id=test_id)
            test.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Test.DoesNotExist:
            return Response(
                {"error": "Test not found"}, status=status.HTTP_404_NOT_FOUND
            )


@api_view(["GET", "POST", "PUT", "DELETE"])
def sensor_readings(request, sensor_reading_id=None, test_id=None):
    if request.method == "GET":
        if sensor_reading_id:
            try:
                sensor_reading = SensorReadings.objects.get(id=sensor_reading_id)
                serializer = SensorReadingsSerializer(sensor_reading)
                return Response(serializer.data)
            except SensorReadings.DoesNotExist:
                return Response(
                    {"error": "Sensor reading not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        elif test_id:
            try:
                sensor_readings = SensorReadings.objects.filter(test_id=test_id)
                serializer = SensorReadingsSerializer(sensor_readings, many=True)
                return Response(serializer.data)
            except SensorReadings.DoesNotExist:
                return Response(
                    {"error": "No sensor readings found for the test"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        sensor_readings = SensorReadings.objects.all()
        serializer = SensorReadingsSerializer(sensor_readings, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SensorReadingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        try:
            sensor_reading = SensorReadings.objects.get(id=sensor_reading_id)
            serializer = SensorReadingsSerializer(sensor_reading, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SensorReadings.DoesNotExist:
            return Response(
                {"error": "Sensor reading not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    elif request.method == "DELETE":
        try:
            sensor_reading = SensorReadings.objects.get(id=sensor_reading_id)
            sensor_reading.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except SensorReadings.DoesNotExist:
            return Response(
                {"error": "Sensor reading not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
