# job_portal/urls.py
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include
from jobs.views import api_welcome
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
]



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
    path('', api_welcome, name='api_welcome'),  # Add this line

]