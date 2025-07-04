# jobs/models.py
from django.db import models
from django.utils import timezone

class Company(models.Model):
    """Model for companies that post jobs"""
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Companies"

class JobPost(models.Model):
    """Model for job postings"""
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=200)
    description = models.TextField()
    salary = models.IntegerField()
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} at {self.company.name}"
    
    class Meta:
        ordering = ['-created_at']  # Most recent first

class Applicant(models.Model):
    """Model for job applicants"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    resume_link = models.URLField()
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='applicants')
    applied_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.job.title}"
    
    class Meta:
        ordering = ['-applied_at']  # Most recent first
        unique_together = ['email', 'job']  # Prevent duplicate applications