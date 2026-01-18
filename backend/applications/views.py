from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SavedJob
from .serializers import SavedJobSerializer
from jobs.models import Job

class SavedJobListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        saved_jobs = SavedJob.objects.filter(user=request.user).order_by('-saved_at')
        serializer = SavedJobSerializer(saved_jobs, many=True, context={'request': request})
        return Response(serializer.data)


class ToggleSaveJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        saved_job, created = SavedJob.objects.get_or_create(user=request.user, job=job)

        if not created:
            saved_job.delete()
            return Response({"saved": False}, status=status.HTTP_200_OK)

        return Response({"saved": True}, status=status.HTTP_201_CREATED)
