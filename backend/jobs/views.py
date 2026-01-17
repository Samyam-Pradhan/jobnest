from rest_framework import generics, permissions
from .models import Job
from .serializers import JobSerializer

class EmployerJobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # The logged-in user is the employer
        serializer.save(employer=self.request.user)
