from django.db import models
from django.contrib.auth.models import User

# Job Seeker Profile
class JobSeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100, blank=True)
    cv = models.FileField(upload_to='cvs/', blank=True)
    profile_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

# Employer Profile
class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=100, blank=True)
    profile_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
