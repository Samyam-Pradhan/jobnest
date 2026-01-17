from django.db import models
from django.conf import settings

class Job(models.Model):
    JOB_LEVEL_CHOICES = (
        ("intern", "Intern"),
        ("entry", "Entry Level"),
        ("mid", "Mid Level"),
        ("senior", "Senior Level"),
    )

    WORK_TYPE_CHOICES = (
        ("onsite", "Onsite"),
        ("remote", "Remote"),
        ("hybrid", "Hybrid"),
    )

    employer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="jobs"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    responsibilities = models.TextField()
    location = models.CharField(max_length=255)
    job_level = models.CharField(max_length=50, choices=JOB_LEVEL_CHOICES)
    experience = models.CharField(max_length=100)
    work_type = models.CharField(max_length=50, choices=WORK_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        profile = getattr(self.employer, "employerprofile", None)
        company = profile.company_name if profile else self.employer.username
        return f"{self.title} - {company}"
