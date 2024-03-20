from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Profile, Test, AverageStep, AverageSensorReading
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    TestSerializer,
    AverageStepSerializer,
    AverageSensorReadingSerializer,
)
from bleapp.helpers.functions import (
    average_step,
    clean_data_positive,
    peak_detection,
    turn_into_df,
)


@api_view(["GET", "POST"])
def receive_sensor_data(request):
    data = request.data["data"]
    data_frame = turn_into_df(data)
    cleanData = clean_data_positive(data_frame, 6)
    steps = peak_detection(cleanData)

    # clean up steps here

    # take average on cleaned up steps
    avg_step = average_step(cleanData, steps)

    print(cleanData)
    print(steps)
    print("length of steps", len(steps))
    print("*******************")
    print(avg_step)

    return Response({"message": "Data received"}, status=200)


@api_view(["GET"])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST"])
def users(request):
    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user_profile(request, user_id):
    try:
        profile = Profile.objects.get(user_id=user_id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    except Profile.DoesNotExist:
        return Response({"message": "Profile not found"}, status=404)


@api_view(["GET", "PUT", "DELETE"])
def user_retrieve_update_destroy(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def profiles(request):
    if request.method == "GET":
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def profile_retrieve_update_destroy(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def tests(request):
    if request.method == "GET":
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def test_retrieve_update_destroy(request, pk):
    try:
        test = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TestSerializer(test)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = TestSerializer(test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def user_tests(request, profile_id):
    tests = Test.objects.filter(profile_id=profile_id)
    serializer = TestSerializer(tests, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST"])
def average_sensor_readings(request):
    if request.method == "GET":
        sensor_readings = AverageSensorReading.objects.all()
        serializer = AverageSensorReadingSerializer(sensor_readings, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AverageSensorReadingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def average_sensor_reading_retrieve_update_destroy(request, pk):
    try:
        sensor_reading = AverageSensorReading.objects.get(pk=pk)
    except AverageSensorReading.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = AverageSensorReadingSerializer(sensor_reading)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = AverageSensorReadingSerializer(sensor_reading, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        sensor_reading.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def average_steps(request):
    if request.method == "GET":
        average_steps = AverageStep.objects.all()
        serializer = AverageStepSerializer(average_steps, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = AverageStepSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def average_step_retrieve_update_destroy(request, pk):
    try:
        average_step = AverageStep.objects.get(pk=pk)
    except AverageStep.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = AverageStepSerializer(average_step)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = AverageStepSerializer(average_step, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        average_step.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
