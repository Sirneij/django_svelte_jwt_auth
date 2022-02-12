from typing import Any, Optional

from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import parsers, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .renderers import UserJSONRenderer
from .serializers import (
    LoginSerializer,
    LogoutSerializer,
    RegistrationSerializer,
    UserSerializer,
)


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request: Request) -> Response:
        """Return user response after a successful registration."""
        user_request = request.data.get('user', {})
        serializer = self.serializer_class(data=user_request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request: Request) -> Response:
        """Return user after login."""
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'
    parser_classes = [
        parsers.JSONParser,
        parsers.FormParser,
        parsers.MultiPartParser,
    ]

    def get(self, request: Request, *args: tuple[Any], **kwargs: dict[str, Any]) -> Response:
        """Get request."""
        serializer = self.serializer_class(request.user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, *args: tuple[Any], **kwargs: dict[str, Any]) -> Response:
        """Patch method."""
        serializer_data = request.data.get('user', {})

        serializer = UserSerializer(request.user, data=serializer_data, partial=True)

        if serializer.is_valid():

            user = serializer.save()

            return Response(UserSerializer(user).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    serializer_class = LogoutSerializer

    permission_classes = (IsAuthenticated,)

    def post(self, request: Request) -> Response:
        """Validate token and save."""
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
