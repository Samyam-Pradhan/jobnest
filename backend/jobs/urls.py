from django.urls import path
from .views import EmployerJobCreateView, EmployerJobListView

urlpatterns = [
    path('employer/jobs/', EmployerJobCreateView.as_view(), name='employer-post-job'),
    path('employer/jobs/list/', EmployerJobListView.as_view(), name='employer-job-list'),
]
