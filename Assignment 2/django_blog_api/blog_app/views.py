# blog_app/views.py
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from .models import Post, Comment

# Helper function to check if user is authenticated
def is_authenticated(request):
    return request.user.is_authenticated

# Helper function to get JSON data from request
def get_json_data(request):
    try:
        return json.loads(request.body)
    except json.JSONDecodeError:
        return None

@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    """
    User registration endpoint
    POST /api/register/
    Body: {"username": "john", "email": "john@email.com", "password": "123456"}
    """
    data = get_json_data(request)
    if not data:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Validate required fields
    if not username or not email or not password:
        return JsonResponse({
            'error': 'Username, email, and password are required'
        }, status=400)
    
    # Check if username already exists
    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists'}, status=400)
    
    # Check if email already exists
    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already exists'}, status=400)
    
    try:
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        return JsonResponse({
            'message': 'User created successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=201)
        
    except IntegrityError:
        return JsonResponse({'error': 'User creation failed'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """
    User login endpoint
    POST /api/login/
    Body: {"username": "john", "password": "123456"}
    """
    data = get_json_data(request)
    if not data:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return JsonResponse({
            'error': 'Username and password are required'
        }, status=400)
    
    # Authenticate user
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return JsonResponse({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

@csrf_exempt
@require_http_methods(["POST"])
def logout_view(request):
    """
    User logout endpoint
    POST /api/logout/
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'User not authenticated'}, status=401)
    
    logout(request)
    return JsonResponse({'message': 'Logout successful'})

@csrf_exempt
@require_http_methods(["POST"])
def create_post(request):
    """
    Create blog post endpoint (Auth required)
    POST /api/create-post/
    Body: {"title": "My Post", "content": "Post content here"}
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    data = get_json_data(request)
    if not data:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    title = data.get('title')
    content = data.get('content')
    
    if not title or not content:
        return JsonResponse({
            'error': 'Title and content are required'
        }, status=400)
    
    # Create post
    post = Post.objects.create(
        author=request.user,
        title=title,
        content=content
    )
    
    return JsonResponse({
        'message': 'Post created successfully',
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author': post.author.username,
            'created_at': post.created_at.isoformat(),
            'total_likes': post.total_likes()
        }
    }, status=201)

@require_http_methods(["GET"])
def get_posts(request):
    """
    Get all blog posts with pagination
    GET /api/posts/?page=1&limit=10
    """
    # Get pagination parameters
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 10))
    
    # Get all posts
    posts = Post.objects.all()
    
    # Paginate
    paginator = Paginator(posts, limit)
    page_obj = paginator.get_page(page)
    
    # Serialize posts
    posts_data = []
    for post in page_obj:
        posts_data.append({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author': post.author.username,
            'created_at': post.created_at.isoformat(),
            'total_likes': post.total_likes(),
            'total_comments': post.comments.count()
        })
    
    return JsonResponse({
        'posts': posts_data,
        'pagination': {
            'current_page': page,
            'total_pages': paginator.num_pages,
            'total_posts': paginator.count,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous()
        }
    })

@require_http_methods(["GET"])
def get_post_detail(request, post_id):
    """
    Get post detail with comments
    GET /api/post/<id>/
    """
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)
    
    # Get comments for this post
    comments = post.comments.all()
    comments_data = []
    for comment in comments:
        comments_data.append({
            'id': comment.id,
            'text': comment.text,
            'user': comment.user.username,
            'created_at': comment.created_at.isoformat()
        })
    
    post_data = {
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author.username,
        'created_at': post.created_at.isoformat(),
        'total_likes': post.total_likes(),
        'comments': comments_data
    }
    
    return JsonResponse({'post': post_data})

@csrf_exempt
@require_http_methods(["POST"])
def add_comment(request, post_id):
    """
    Add comment to post (Auth required)
    POST /api/post/<id>/comment/
    Body: {"text": "Nice article!"}
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)
    
    data = get_json_data(request)
    if not data:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    text = data.get('text')
    if not text:
        return JsonResponse({'error': 'Comment text is required'}, status=400)
    
    # Create comment
    comment = Comment.objects.create(
        post=post,
        user=request.user,
        text=text
    )
    
    return JsonResponse({
        'message': 'Comment added successfully',
        'comment': {
            'id': comment.id,
            'text': comment.text,
            'user': comment.user.username,
            'created_at': comment.created_at.isoformat()
        }
    }, status=201)

@csrf_exempt
@require_http_methods(["POST"])
def like_post(request, post_id):
    """
    Like/Unlike post (Auth required)
    POST /api/post/<id>/like/
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)
    
    # Toggle like
    if request.user in post.likes.all():
        post.likes.remove(request.user)
        liked = False
        message = 'Post unliked'
    else:
        post.likes.add(request.user)
        liked = True
        message = 'Post liked'
    
    return JsonResponse({
        'message': message,
        'liked': liked,
        'total_likes': post.total_likes()
    })

@csrf_exempt
@require_http_methods(["PUT"])
def edit_post(request, post_id):
    """
    Edit post (Auth required, author only)
    PUT /api/post/<id>/edit/
    Body: {"title": "Updated Title", "content": "Updated content"}
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)
    
    # Check if user is the author
    if post.author != request.user:
        return JsonResponse({'error': 'Permission denied'}, status=403)
    
    data = get_json_data(request)
    if not data:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    title = data.get('title')
    content = data.get('content')
    
    if not title or not content:
        return JsonResponse({
            'error': 'Title and content are required'
        }, status=400)
    
    # Update post
    post.title = title
    post.content = content
    post.save()
    
    return JsonResponse({
        'message': 'Post updated successfully',
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author': post.author.username,
            'created_at': post.created_at.isoformat(),
            'total_likes': post.total_likes()
        }
    })

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_post(request, post_id):
    """
    Delete post (Auth required, author only)
    DELETE /api/post/<id>/delete/
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)
    
    # Check if user is the author
    if post.author != request.user:
        return JsonResponse({'error': 'Permission denied'}, status=403)
    
    post.delete()
    return JsonResponse({'message': 'Post deleted successfully'})

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_comment(request, comment_id):
    """
    Delete comment (Auth required, author only)
    DELETE /api/comment/<id>/delete/
    """
    if not is_authenticated(request):
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'error': 'Comment not found'}, status=404)
    
    # Check if user is the author
    if comment.user != request.user:
        return JsonResponse({'error': 'Permission denied'}, status=403)
    
    comment.delete()
    return JsonResponse({'message': 'Comment deleted successfully'})