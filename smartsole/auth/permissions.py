from rest_framework.permissions import BasePermission, SAFE_METHODS


class UserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            print("aaa")
            return bool(request.user and request.user.is_authenticated)

        if view.basename in ["gaittest"]:
            print("bbb")
            return bool(request.user and request.user.is_superuser)
        print("ccc")
        return False

    def has_permission(self, request, view):
        if view.basename in ["gaittest", "gaittest-sensor"]:
            if request.method in SAFE_METHODS:
                return bool(request.user and request.user.is_authenticated)

            return bool(request.user and request.user.is_authenticated)
        return False
