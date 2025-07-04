# 🧑‍💼 Job Portal API (Core Django - No DRF)

This is a backend API for a Job Portal system built using **Core Django** (without Django REST Framework). It allows companies to post jobs and applicants to apply via clean JSON APIs.

---

## 🚀 Features

- Companies can create job postings
- Applicants can apply for jobs
- View all job listings
- View applicants per job
- Built using **function-based views** and `JsonResponse`
- ✅ No DRF or serializers used

---

## 🛠️ Tech Stack

- Python 3.10+
- Django (without DRF)
- SQLite (default database)
- JSON APIs using `JsonResponse`

---

## ⚙️ Setup Instructions

### 1. Clone the Repository


git clone https://github.com/your-username/job-portal-api.git
cd job-portal-api



2. Create Virtual Environment
bash
Copy
Edit
python -m venv venv
# Activate:
# On Windows
venv\Scripts\activate
# On Mac/Linux
source venv/bin/activate
3. Install Dependencies
bash
Copy
Edit
pip install -r requirements.txt
4. Run Migrations
bash
Copy
Edit
python manage.py migrate
5. Run Development Server
bash
Copy
Edit
python manage.py runserver
📂 API Endpoints
✅ POST /api/create-company/
Request Body:

json
Copy
Edit
{
  "name": "Google",
  "location": "Bangalore",
  "description": "Tech company"
}
✅ POST /api/post-job/
Request Body:

json
Copy
Edit
{
  "company_id": 1,
  "title": "Backend Developer",
  "description": "Experience with Django",
  "salary": 60000,
  "location": "Remote"
}
✅ GET /api/jobs/
Returns a list of all job posts along with company names.

✅ POST /api/apply/
Request Body:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@doe.com",
  "resume_link": "https://example.com/resume.pdf",
  "job_id": 3
}
✅ GET /api/applicants/<job_id>/
Returns the list of applicants for a specific job.

⚠️ Constraints
❌ No Django REST Framework

✅ Only function-based views used

✅ JSON responses using JsonResponse

✅ Basic error handling implemented

✅ SQLite used as default database


