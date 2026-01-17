from rest_framework import generics, permissions
from .models import Job
from .serializers import JobSerializer

class EmployerJobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)

    def get_serializer_context(self):
        return {"request": self.request}


class EmployerJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(employer=self.request.user).order_by("-created_at")

    def get_serializer_context(self):
        return {"request": self.request}


class JobSeekerJobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.all().order_by("-created_at")

    def get_serializer_context(self):
        return {"request": self.request}

class JobDetailView(generics.RetrieveAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Job.objects.all()

    def get_serializer_context(self):
        return {"request": self.request}