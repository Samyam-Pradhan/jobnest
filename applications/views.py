from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import JobSeekerProfile, EmployerProfile

# Welcome page
def welcome(request):
    if request.method == 'POST':
        role = request.POST.get('role')
        if role == 'jobseeker':
            return redirect('signup', role='jobseeker')
        elif role == 'employer':
            return redirect('signup', role='employer')
    return render(request, 'applications/welcome.html')


# Signup page
def signup(request, role):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username=email).exists():
            messages.error(request, 'User with this email already exists.')
            return redirect('signup', role=role)

        user = User.objects.create_user(username=email, email=email, password=password)

        # Create role-based profile
        if role == 'jobseeker':
            JobSeekerProfile.objects.create(user=user)
        elif role == 'employer':
            EmployerProfile.objects.create(user=user)

        messages.success(request, 'Account created! Please login.')
        return redirect('login')

    return render(request, 'applications/signup.html', {'role': role})


# Login page
def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            # Redirect based on profile
            if hasattr(user, 'jobseekerprofile'):
                return redirect('jobseeker_dashboard')
            elif hasattr(user, 'employerprofile'):
                return redirect('employer_dashboard')
        else:
            messages.error(request, 'Invalid credentials')
            return redirect('login')

    return render(request, 'applications/login.html')


# Logout
def logout_view(request):
    logout(request)
    return redirect('welcome')


# Job Seeker Dashboard
def jobseeker_dashboard(request):
    return render(request, 'applications/jobseeker_dashboard.html')


# Employer Dashboard
def employer_dashboard(request):
    return render(request, 'applications/employer_dashboard.html')


# Job Seeker Profile
def jobseeker_profile(request):
    profile = request.user.jobseekerprofile
    if request.method == 'POST':
        profile.full_name = request.POST.get('full_name')
        profile.position = request.POST.get('position')
        if request.FILES.get('cv'):
            profile.cv = request.FILES.get('cv')
        profile.profile_complete = True
        profile.save()
        return redirect('jobseeker_dashboard')

    return render(request, 'applications/jobseeker_profile.html', {'profile': profile})


# Employer Profile
def employer_profile(request):
    profile = request.user.employerprofile
    if request.method == 'POST':
        profile.company_name = request.POST.get('company_name')
        profile.profile_complete = True
        profile.save()
        return redirect('employer_dashboard')

    return render(request, 'applications/employer_profile.html', {'profile': profile})
