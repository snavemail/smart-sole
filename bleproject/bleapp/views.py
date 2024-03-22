from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Profile, Test, Step, Sensor, AverageSensorReading
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    TestSerializer,
    UserWithProfileSerializer,
)
from bleapp.helpers.functions import (
    average_step,
    clean_data_positive,
    peak_detection,
    turn_into_df,
    basic_stats,
)
from rest_framework.pagination import PageNumberPagination

CONFIDENCE = 0.95


@api_view(["GET", "POST"])
def receive_sensor_data(request):
    data = request.data["data"]
    data_frame = turn_into_df(data)
    cleanData = clean_data_positive(data_frame, 6)
    steps = peak_detection(cleanData)

    # take average on cleaned up steps
    # avg_step = average_step(cleanData, steps)

    # print(cleanData)
    # print(steps)
    # print("length of steps", len(steps))
    # print("*******************")
    # print(avg_step)
    # clean up steps here
    print("length", len(steps))
    if len(steps) > 10:
        avg_step = average_step(cleanData, steps)
        print(avg_step)
        return Response({"message": "60 data received"}, status=200)
    return Response({"message": "Not 60 yet"}, status=201)


@api_view(["GET", "POST"])
def users_profiles(request):
    if request.method == "GET":
        users = User.objects.all()
        page_size = int(request.query_params.get("page_size", 15))
        paginator = PageNumberPagination()
        paginator.page_size = page_size
        result_page = paginator.paginate_queryset(users, request)
        serializer = UserWithProfileSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == "POST":
        user_serializer = UserSerializer(data=request.data["user"])
        profile_serializer = ProfileSerializer(data=request.data["profile"])
        if user_serializer.is_valid() and profile_serializer.is_valid():
            user = user_serializer.save()
            profile = profile_serializer.save(user_id=user.id)
            response_data = {
                "user": user_serializer.data,
                "profile": profile_serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response({"message": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def user_profile(request, user_id):
    if request.method == "GET":
        try:
            user = User.objects.get(pk=user_id)
            profile = user.profile
            user_serializer = UserSerializer(user)
            profile_serializer = ProfileSerializer(profile)
            response_data = {
                "user": user_serializer.data,
                "profile": profile_serializer.data,
            }
            return Response(response_data)
        except Profile.DoesNotExist:
            return Response({"message": "Profile not found"}, status=404)
    elif request.method == "PUT":
        try:
            user = User.objects.get(pk=user_id)
            profile = user.profile
            user_serializer = UserSerializer(user, data=request.data["user"])
            profile_serializer = ProfileSerializer(
                profile, data=request.data["profile"]
            )
            if user_serializer.is_valid() and profile_serializer.is_valid():
                user_serializer.save()
                profile_serializer.save()
                response_data = {
                    "user": user_serializer.data,
                    "profile": profile_serializer.data,
                }
                return Response(response_data)
            return Response(
                {"message": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        except Profile.DoesNotExist:
            return Response({"message": "Profile not found"}, status=404)
    elif request.method == "DELETE":
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Profile.DoesNotExist:
            return Response({"message": "Profile not found"}, status=404)


@api_view(["GET", "POST"])
def user_tests(request, profile_id):
    if request.method == "GET":
        queryset = Test.objects.filter(profile_id=profile_id).order_by("-date")

        # Get the page size from the query parameters or use a default value
        page_size = int(request.query_params.get("page_size", 15))

        paginator = PageNumberPagination()
        paginator.page_size = page_size
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = TestSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    elif request.method == "POST":
        data = request.data
        data["profile_id"] = profile_id
        serializer = TestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def user_test_detail(request, user_id, test_id):
    try:
        test = Test.objects.get(profile__user_id=user_id, id=test_id)
        serializer = TestSerializer(test)
        return Response(serializer.data)
    except Test.DoesNotExist:
        return Response({"message": "Test not found"}, status=status.HTTP_404_NOT_FOUND)
