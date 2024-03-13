from rest_framework import status, generics
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from .models import User, Profile, Test, Step, SensorReading
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    TestSerializer,
    StepSerializer,
    SensorReadingSerializer,
)
from rest_framework.renderers import JSONRenderer


@api_view(["GET"])
@renderer_classes([JSONRenderer])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST"])
@renderer_classes([JSONRenderer])
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


@api_view(["GET", "POST"])
def steps(request):
    if request.method == "GET":
        steps = Step.objects.all()
        serializer = StepSerializer(steps, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StepSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def step_retrieve_update_destroy(request, pk):
    try:
        step = Step.objects.get(pk=pk)
    except Step.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = StepSerializer(step)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = StepSerializer(step, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        step.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def sensor_readings(request):
    if request.method == "GET":
        sensor_readings = SensorReading.objects.all()
        serializer = SensorReadingSerializer(sensor_readings, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = SensorReadingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def sensor_reading_retrieve_update_destroy(request, pk):
    try:
        sensor_reading = SensorReading.objects.get(pk=pk)
    except SensorReading.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = SensorReadingSerializer(sensor_reading)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = SensorReadingSerializer(sensor_reading, data=request.data)
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
        average_steps = Step.objects.all()
        serializer = StepSerializer(average_steps, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = StepSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def average_step_retrieve_update_destroy(request, pk):
    try:
        average_step = Step.objects.get(pk=pk)
    except Step.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = StepSerializer(average_step)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = StepSerializer(average_step, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        average_step.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class TestListCreate(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class TestRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class StepListCreate(generics.ListCreateAPIView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer


class StepRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer


class SensorReadingListCreate(generics.ListCreateAPIView):
    queryset = SensorReading.objects.all()
    serializer_class = SensorReadingSerializer


class SensorReadingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = SensorReading.objects.all()
    serializer_class = SensorReadingSerializer


class AverageStepListCreate(generics.ListCreateAPIView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer


class AverageStepRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
