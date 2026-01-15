from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, JobSeekerProfile, EmployerProfile

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
    list_display = ('user', 'get_user_email', 'full_name', 'mobile', 'education_level', 'job_level')
    search_fields = ('user__username', 'user__email', 'full_name', 'mobile')

    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'


# EmployerProfile admin
@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'company_name', 'contact_email', 'industry', 'company_size')
    search_fields = ('user__username', 'company_name', 'contact_email', 'industry')


# Register custom User
admin.site.register(User, UserAdmin)
