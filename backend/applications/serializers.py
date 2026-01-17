from rest_framework import serializers
from .models import SavedJob

class SavedJobSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.SerializerMethodField()
    logo = serializers.SerializerMethodField()

    class Meta:
        model = SavedJob
        fields = ['id', 'job', 'job_title', 'company_name', 'logo', 'saved_at']
        read_only_fields = ['id', 'job_title', 'company_name', 'logo', 'saved_at']

    def get_company_name(self, obj):
        return getattr(getattr(obj.job.employer, 'employerprofile', None), 'company_name', obj.job.employer.username)

    def get_logo(self, obj):
        return getattr(getattr(obj.job.employer, 'employerprofile', None), 'logo', None)
