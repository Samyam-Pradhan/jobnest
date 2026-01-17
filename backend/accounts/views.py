from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, JobSeekerProfileSerializer, EmployerProfileSerializer
from .models import JobSeekerProfile, EmployerProfile

User = get_user_model()

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
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

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
                    },
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                })
        except User.DoesNotExist:
            pass
        return Response({"detail":"Invalid credentials"}, status=401)

class JobSeekerProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = JobSeekerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = JobSeekerProfile.objects.get_or_create(user=self.request.user)
        return profile

    def get(self, request, *args, **kwargs):
        if request.user.role != "job_seeker":
            return Response({"detail":"Only job seekers can access."}, status=403)
        return super().get(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if request.user.role != "job_seeker":
            return Response({"detail":"Only job seekers can update."}, status=403)
        return super().patch(request, *args, **kwargs)

class EmployerProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = EmployerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = EmployerProfile.objects.get_or_create(user=self.request.user)
        return profile
