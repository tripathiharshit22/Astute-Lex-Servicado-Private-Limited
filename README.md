# 🧩 Django APIs – Job Portal & Blog System (No DRF)

This repository contains two Django backend projects (without Django REST Framework):

- ✅ **Task 1:** Job Portal API (Companies post jobs, users apply)
- ✅ **Task 2:** Blog + Comment System (Users register/login, post blogs, comment)

Both use **function-based views**, **JsonResponse**, and Django’s built-in features only.

---

## 🔧 Tech Stack

- Python 3.10+
- Django (No DRF)
- SQLite DB
- JsonResponse API responses
- Django Auth System (Task 2)

---

## 🚀 Setup (Same for Both)

```bash
git clone https://github.com/your-username/django-api-projects.git
cd django-api-projects

python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
