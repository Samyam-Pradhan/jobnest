from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, JobSeekerProfile, EmployerProfile

class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role',)}),
    )
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')

@admin.register(JobSeekerProfile)
class JobSeekerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_user_email', 'full_name', 'mobile', 'education_level', 'job_level')
    search_fields = ('user__username', 'user__email', 'full_name', 'mobile')
    readonly_fields = ('user',)

    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'

@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'company_name', 'contact_email', 'industry', 'company_size')
    search_fields = ('user__username', 'company_name', 'contact_email', 'industry')
    readonly_fields = ('user',)

admin.site.register(User, UserAdmin)
