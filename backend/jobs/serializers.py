from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'responsibilities', 'location',
            'job_level', 'experience', 'work_type', 'created_at', 'company_name'
        ]
        read_only_fields = ['id', 'employer', 'created_at', 'company_name']

    def get_company_name(self, obj):
        # Fetch company name from EmployerProfile
        return getattr(getattr(obj.employer, 'employerprofile', None), 'company_name', obj.employer.username)
