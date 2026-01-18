from rest_framework import serializers
from .models import SavedJob
from jobs.serializers import JobSerializer  # import your existing JobSerializer

class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True, context={'request': serializers.CurrentUserDefault()})

    class Meta:
        model = SavedJob
        fields = ["id", "job", "saved_at"]
        read_only_fields = ["id", "job", "saved_at"]
