from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Optional names
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.username


class JobSeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    mobile = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    education_level = models.CharField(max_length=50, blank=True)
    degree = models.CharField(max_length=100, blank=True)
    university = models.CharField(max_length=150, blank=True)
    preferred_industry = models.CharField(max_length=100, blank=True)
    job_level = models.CharField(max_length=50, blank=True)
    cv = models.FileField(upload_to="cvs/", blank=True)

    def __str__(self):
        return self.user.username


class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255)
    contact_email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    company_size = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="logos/", blank=True)

    def __str__(self):
        return self.company_name
