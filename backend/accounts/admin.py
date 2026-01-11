from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, JobSeekerProfile

# Custom User admin
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role', 'company_name')}),
    )
    list_display = ('username', 'email', 'role', 'company_name', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')

# JobSeekerProfile admin
@admin.register(JobSeekerProfile)
class JobSeekerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'email', 'mobile', 'education_level', 'job_level')
    search_fields = ('user__username', 'full_name', 'email', 'mobile')

# Register custom User
admin.site.register(User, UserAdmin)
