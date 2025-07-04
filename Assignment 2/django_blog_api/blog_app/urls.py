# blog_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Authentication endpoints
    path('api/register/', views.register, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    
    # Post endpoints
    path('api/create-post/', views.create_post, name='create_post'),
    path('api/posts/', views.get_posts, name='get_posts'),
    path('api/post/<int:post_id>/', views.get_post_detail, name='get_post_detail'),
    path('api/post/<int:post_id>/comment/', views.add_comment, name='add_comment'),
    path('api/post/<int:post_id>/like/', views.like_post, name='like_post'),
    path('api/post/<int:post_id>/edit/', views.edit_post, name='edit_post'),
    path('api/post/<int:post_id>/delete/', views.delete_post, name='delete_post'),
    
    # Comment endpoints
    path('api/comment/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
]