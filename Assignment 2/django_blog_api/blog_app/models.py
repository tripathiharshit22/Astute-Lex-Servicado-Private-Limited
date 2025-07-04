# blog_app/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Post(models.Model):
    """
    Blog post model
    - author: Who wrote the post (ForeignKey to User)
    - title: Post title
    - content: Post content
    - created_at: When post was created
    """
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    
    class Meta:
        ordering = ['-created_at']  # Latest posts first
    
    def __str__(self):
        return f"{self.title} by {self.author.username}"
    
    def total_likes(self):
        return self.likes.count()

class Comment(models.Model):
    """
    Comment model
    - post: Which post this comment belongs to
    - user: Who wrote the comment
    - text: Comment content
    - created_at: When comment was created
    """
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']  # Latest comments first
    
    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.title}"