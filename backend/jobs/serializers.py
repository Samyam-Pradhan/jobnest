from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    company_logo = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "description",
            "responsibilities",
            "location",
            "job_level",
            "experience",
            "work_type",
            "created_at",
            "company_name",
            "company_logo",
        ]
        read_only_fields = ["id", "created_at", "company_name", "company_logo"]

    def get_company_name(self, obj):
        profile = getattr(obj.employer, "employerprofile", None)
        return profile.company_name if profile and profile.company_name else obj.employer.username

    def get_company_logo(self, obj):
        request = self.context.get("request")
        profile = getattr(obj.employer, "employerprofile", None)

        # Return full URL if logo exists
        if profile and profile.logo:
            return request.build_absolute_uri(profile.logo.url)

        # Return None if no logo
        return None
