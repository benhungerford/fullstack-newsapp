from django.db import models
from django.contrib.auth.models import User




class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    category = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    top_story = models.BooleanField(default=False)
    date_published = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return self.title
