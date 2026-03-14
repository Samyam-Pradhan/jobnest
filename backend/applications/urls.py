from django.urls import path
from .views import SavedJobListView, ToggleSaveJobView, ApplyJobView, JobApplicantsView, EmployerApplicationsView

urlpatterns = [
    path("saved-jobs/", SavedJobListView.as_view()),
    path("saved-jobs/toggle/<int:job_id>/", ToggleSaveJobView.as_view()),
    path("jobs/<int:job_id>/apply/", ApplyJobView.as_view()),
    path("jobs/<int:job_id>/applicants/", JobApplicantsView.as_view()),
    path("employer/applications/", EmployerApplicationsView.as_view()),
]