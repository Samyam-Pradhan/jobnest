from rest_framework import serializers
from .models import SavedJob, Application
from jobs.serializers import JobSerializer


class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)

    class Meta:
        model = SavedJob
        fields = ["id", "job", "saved_at"]
        read_only_fields = ["id", "job", "saved_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request:
            representation['job'] = JobSerializer(
                instance.job, context={'request': request}
            ).data
        return representation


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.SerializerMethodField()
    applicant_email = serializers.SerializerMethodField()
    cv = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = ['id', 'job', 'applicant_name', 'applicant_email', 'cv', 'status', 'applied_at']
        read_only_fields = ['applicant', 'status', 'applied_at']

    def get_applicant_name(self, obj):
        profile = getattr(obj.applicant, 'jobseekerprofile', None)
        return profile.full_name if profile else obj.applicant.username

    def get_applicant_email(self, obj):
        profile = getattr(obj.applicant, 'jobseekerprofile', None)
        return profile.email if profile else obj.applicant.email

    def get_cv(self, obj):
        request = self.context.get('request')
        profile = getattr(obj.applicant, 'jobseekerprofile', None)
        if profile and profile.cv and request:
            return request.build_absolute_uri(profile.cv.url)
        return None