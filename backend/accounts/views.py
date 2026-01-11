from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import RegisterSerializer, LoginSerializer, JobSeekerProfileSerializer
from .models import JobSeekerProfile
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


# --- Registration View ---
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "company_name": user.company_name,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


# --- Login View ---
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            if user.check_password(serializer.validated_data['password']):
                refresh = RefreshToken.for_user(user)
                return Response({
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "role": user.role,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "company_name": user.company_name,
                    },
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                })
        except User.DoesNotExist:
            pass

        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# --- JobSeeker Profile View ---
class JobSeekerProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = JobSeekerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        # Get or create the profile for the logged-in user
        profile, _ = JobSeekerProfile.objects.get_or_create(user=self.request.user)
        return profile

    def _check_role(self, user):
        if user.role != 'job_seeker':
            return Response({"detail": "Only job seekers can access this."}, status=status.HTTP_403_FORBIDDEN)
        return None

    def get(self, request, *args, **kwargs):
        role_error = self._check_role(request.user)
        if role_error:
            return role_error
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        role_error = self._check_role(request.user)
        if role_error:
            return role_error
        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        role_error = self._check_role(request.user)
        if role_error:
            return role_error
        return super().patch(request, *args, **kwargs)
