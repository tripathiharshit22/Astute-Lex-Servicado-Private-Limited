# jobs/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from .models import Company, JobPost, Applicant

@csrf_exempt
@require_http_methods(["POST"])
def create_company(request):
    """Create a new company"""
    try:
        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'location', 'description']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return JsonResponse({
                    'error': f'{field} is required'
                }, status=400)
        
        # Create company
        company = Company.objects.create(
            name=data['name'].strip(),
            location=data['location'].strip(),
            description=data['description'].strip()
        )
        
        # Return success response
        return JsonResponse({
            'message': 'Company created successfully',
            'company': {
                'id': company.id,
                'name': company.name,
                'location': company.location,
                'description': company.description,
                'created_at': company.created_at.isoformat()
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def post_job(request):
    """Post a new job"""
    try:
        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['company_id', 'title', 'description', 'salary', 'location']
        for field in required_fields:
            if field not in data:
                return JsonResponse({
                    'error': f'{field} is required'
                }, status=400)
        
        # Validate company exists
        try:
            company = Company.objects.get(id=data['company_id'])
        except Company.DoesNotExist:
            return JsonResponse({
                'error': 'Company not found'
            }, status=404)
        
        # Validate salary is positive
        if data['salary'] <= 0:
            return JsonResponse({
                'error': 'Salary must be positive'
            }, status=400)
        
        # Create job post
        job = JobPost.objects.create(
            company=company,
            title=data['title'].strip(),
            description=data['description'].strip(),
            salary=data['salary'],
            location=data['location'].strip()
        )
        
        # Return success response
        return JsonResponse({
            'message': 'Job posted successfully',
            'job': {
                'id': job.id,
                'company': job.company.name,
                'title': job.title,
                'description': job.description,
                'salary': job.salary,
                'location': job.location,
                'created_at': job.created_at.isoformat()
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)

@require_http_methods(["GET"])
def get_jobs(request):
    """Get all job posts"""
    try:
        jobs = JobPost.objects.select_related('company').all()
        
        jobs_data = []
        for job in jobs:
            jobs_data.append({
                'id': job.id,
                'title': job.title,
                'description': job.description,
                'salary': job.salary,
                'location': job.location,
                'company': {
                    'id': job.company.id,
                    'name': job.company.name,
                    'location': job.company.location
                },
                'created_at': job.created_at.isoformat()
            })
        
        return JsonResponse({
            'jobs': jobs_data,
            'total': len(jobs_data)
        }, status=200)
        
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def apply_job(request):
    """Apply for a job"""
    try:
        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'email', 'resume_link', 'job_id']
        for field in required_fields:
            if field not in data or not str(data[field]).strip():
                return JsonResponse({
                    'error': f'{field} is required'
                }, status=400)
        
        # Validate job exists
        try:
            job = JobPost.objects.get(id=data['job_id'])
        except JobPost.DoesNotExist:
            return JsonResponse({
                'error': 'Job not found'
            }, status=404)
        
        # Create applicant
        try:
            applicant = Applicant.objects.create(
                name=data['name'].strip(),
                email=data['email'].strip(),
                resume_link=data['resume_link'].strip(),
                job=job
            )
        except IntegrityError:
            return JsonResponse({
                'error': 'You have already applied for this job'
            }, status=400)
        
        # Return success response
        return JsonResponse({
            'message': 'Application submitted successfully',
            'application': {
                'id': applicant.id,
                'name': applicant.name,
                'email': applicant.email,
                'resume_link': applicant.resume_link,
                'job': {
                    'id': job.id,
                    'title': job.title,
                    'company': job.company.name
                },
                'applied_at': applicant.applied_at.isoformat()
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)

@require_http_methods(["GET"])
def get_applicants(request, job_id):
    """Get all applicants for a specific job"""
    try:
        # Validate job exists
        job = get_object_or_404(JobPost, id=job_id)
        
        # Get all applicants for this job
        applicants = Applicant.objects.filter(job=job).select_related('job__company')
        
        applicants_data = []
        for applicant in applicants:
            applicants_data.append({
                'id': applicant.id,
                'name': applicant.name,
                'email': applicant.email,
                'resume_link': applicant.resume_link,
                'applied_at': applicant.applied_at.isoformat()
            })
        
        return JsonResponse({
            'job': {
                'id': job.id,
                'title': job.title,
                'company': job.company.name
            },
            'applicants': applicants_data,
            'total_applicants': len(applicants_data)
        }, status=200)
        
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)



def api_welcome(request):
    """Welcome page for the API"""
    return JsonResponse({
        'message': 'Welcome to Job Portal API',
        'version': '1.0',
        'endpoints': {
            'create_company': '/api/create-company/ (POST)',
            'post_job': '/api/post-job/ (POST)',
            'get_jobs': '/api/jobs/ (GET)',
            'apply_job': '/api/apply/ (POST)',
            'get_applicants': '/api/applicants/<job_id>/ (GET)'
        },
        'docs': 'Send POST requests with JSON data, GET requests need no body'
    })