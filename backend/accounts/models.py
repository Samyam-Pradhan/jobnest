from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom User model
class User(AbstractUser):
    ROLE_CHOICES = (
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Only used if role = employer
    company_name = models.CharField(max_length=255, blank=True, null=True)

    # Make names optional (important for employer)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        if self.role == 'employer' and self.company_name:
            return f"{self.company_name} (Employer)"
        return f"{self.username} ({self.role})"


# JobSeeker profile model
class JobSeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)  # optional, can sync with User.email
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
