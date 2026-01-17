from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_employer_name', 'location', 'job_level', 'work_type', 'experience', 'created_at')
    list_filter = ('job_level', 'work_type', 'created_at')
    search_fields = ('title', 'description', 'location', 'employer__company_name', 'employer__username')

    def get_employer_name(self, obj):
        return obj.employer.company_name or obj.employer.username
    get_employer_name.short_description = 'Employer'
