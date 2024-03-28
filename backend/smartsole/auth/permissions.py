from rest_framework.permissions import BasePermission, SAFE_METHODS


# Used for gaittest and gaittest-sensor endpoints
class UserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_superuser:
            return True
        if view.basename in ["gaittest"]:
            if request.method in SAFE_METHODS:
                return bool(
                    request.user
                    and request.user.is_authenticated
                    and obj.user == request.user
                )
        if view.basename in ["gaittest-sensor"]:
            if request.method in ["DELETE"]:
                return bool(
                    request.user
                    and request.user.is_authenticated
                    and obj.gaittest.user == request.user
                )
            elif request.method in SAFE_METHODS:
                return bool(
                    request.user
                    and request.user.is_authenticated
                    and obj.gaittest.user == request.user
                )

        return False

    def has_permission(self, request, view):
        if request.user and request.user.is_superuser:
            return True
        if view.basename in ["gaittest"]:
            if request.method in SAFE_METHODS:
                queryset = view.get_queryset()
                if request.user and request.user.is_authenticated:
                    user_gaittests = request.user.gaittest_set.all()
                    filtered_queryset = queryset.filter(
                        pk__in=[gaittest.pk for gaittest in user_gaittests]
                    )
                    return filtered_queryset.exists()
        if view.basename in ["gaittest-sensor"]:
            if request.method in SAFE_METHODS:
                queryset = view.get_queryset()
                if request.user and request.user.is_authenticated:
                    user_gaittests = request.user.gaittest_set.all()
                    return queryset.filter(gaittest__in=user_gaittests).exists()

        return False
