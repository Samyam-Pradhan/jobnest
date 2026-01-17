from django.urls import path
from .views import EmployerJobCreateView, EmployerJobListView, JobSeekerJobListView,  JobDetailView

urlpatterns = [
    path('employer/jobs/', EmployerJobCreateView.as_view(), name='employer-post-job'),
    path('employer/jobs/list/', EmployerJobListView.as_view(), name='employer-job-list'),
    path('jobs/', JobSeekerJobListView.as_view(), name='jobseeker-job-list'),
    path("jobs/<int:pk>/", JobDetailView.as_view()),
]
