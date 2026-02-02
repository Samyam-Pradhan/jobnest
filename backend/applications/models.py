from django.db import models
from django.contrib.auth import get_user_model
from jobs.models import Job

User = get_user_model()


class SavedJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")

    def __str__(self):
        return f"{self.user} saved {self.job}"


class Application(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("shortlisted", "Shortlisted"),
        ("rejected", "Rejected"),
    ]

    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="applied"
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("applicant", "job")
        ordering = ["-applied_at"]

    def __str__(self):
        return f"{self.applicant} applied for {self.job}"
