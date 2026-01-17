from rest_framework import generics, permissions
from .models import Job
from .serializers import JobSerializer

class EmployerJobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save the logged-in user as the employer
        serializer.save(employer=self.request.user)

class EmployerJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only jobs posted by the logged-in employer
        return Job.objects.filter(employer=self.request.user).order_by('-created_at')
