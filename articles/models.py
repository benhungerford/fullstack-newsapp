from django.db import models




class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    top_story = models.BooleanField(default=False)
    date_published = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
