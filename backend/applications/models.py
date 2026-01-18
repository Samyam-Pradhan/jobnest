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
