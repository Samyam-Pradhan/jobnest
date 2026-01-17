from django.urls import path
from .views import EmployerJobCreateView

urlpatterns = [
    path('employer/jobs/', EmployerJobCreateView.as_view(), name='employer-post-job'),
]
