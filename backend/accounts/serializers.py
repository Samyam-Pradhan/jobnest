from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import JobSeekerProfile, EmployerProfile

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'role', 'password', 'password2'
        )
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        if attrs['role'] == 'job_seeker' and not attrs.get('first_name'):
            raise serializers.ValidationError({"first_name": "First name is required for job seekers."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')

        email = validated_data.get('email')
        username = email.split('@')[0]

        # Make username unique
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            password=password,
            **validated_data
        )

        # Create EmployerProfile if user is employer
        if user.role == "employer":
            EmployerProfile.objects.create(user=user)

        # Optional: create JobSeekerProfile if role is job_seeker
        elif user.role == "job_seeker":
            JobSeekerProfile.objects.create(user=user)

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class JobSeekerProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = JobSeekerProfile
        fields = ['user','first_name','last_name','email','full_name','address','mobile','gender',
                  'education_level','degree','university','preferred_industry','job_level','cv']
        read_only_fields = ['user','first_name','last_name','email']

class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = ['user','company_name','contact_email','address','website','industry','company_size','description','logo']
        read_only_fields = ['user']
