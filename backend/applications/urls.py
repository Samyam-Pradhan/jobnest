from django.urls import path
from .views import ToggleSaveJobView, SavedJobListView

urlpatterns = [
    path('saved-jobs/', SavedJobListView.as_view(), name='saved-job-list'),
    path('saved-jobs/toggle/<int:job_id>/', ToggleSaveJobView.as_view(), name='toggle-save-job'),
]
