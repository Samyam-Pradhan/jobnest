from django.urls import path
from .views import RegisterView, LoginView, JobSeekerProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/profile/', JobSeekerProfileView.as_view(), name='jobseeker-profile'),

]
