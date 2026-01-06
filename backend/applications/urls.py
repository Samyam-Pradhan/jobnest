# applications/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('signup/<str:role>/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),   # <--- updated
    path('logout/', views.logout_view, name='logout'),
    path('jobseeker/dashboard/', views.jobseeker_dashboard, name='jobseeker_dashboard'),
    path('employer/dashboard/', views.employer_dashboard, name='employer_dashboard'),
    path('jobseeker/profile/', views.jobseeker_profile, name='jobseeker_profile'),
    path('employer/profile/', views.employer_profile, name='employer_profile'),
]
