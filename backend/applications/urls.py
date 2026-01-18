from django.urls import path
from .views import SavedJobListView, ToggleSaveJobView

urlpatterns = [
    path("saved-jobs/", SavedJobListView.as_view()),
    path("saved-jobs/toggle/<int:job_id>/", ToggleSaveJobView.as_view()),
]
