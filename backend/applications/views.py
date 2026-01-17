from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import SavedJob
from jobs.models import Job
from .serializers import SavedJobSerializer

class ToggleSaveJobView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, job_id):
        user = request.user
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        saved_job, created = SavedJob.objects.get_or_create(user=user, job=job)
        if not created:
            # Job already saved, remove it
            saved_job.delete()
            return Response({"saved": False, "message": "Job removed from saved jobs"})
        return Response({"saved": True, "message": "Job saved successfully"})


class SavedJobListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SavedJobSerializer

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user).order_by('-saved_at')
