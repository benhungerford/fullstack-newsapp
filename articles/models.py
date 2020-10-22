from django.db import models
from django.contrib.auth.models import User




class Article(models.Model):
    CATEGORY_CHOICES = [
        ('DEF', ''),
        ('ET', 'Entertainment'),
        ('TR', 'Travel'),
        ('FD', 'Food'),
    ]
    STATUS_CHOICES = [
        ('DEF', ''),
        ('DFT', 'Draft'),
        ('SUB', 'Submitted'),
        ('DEC', 'Declined'),
        ('PUB', 'Published'),
    ]

    title = models.CharField(max_length=255)
    body = models.TextField()
    category = models.CharField(
        max_length=255,
        choices=CATEGORY_CHOICES,
        default='DEF',
    )
    status = models.CharField(
        max_length=255,
        choices=STATUS_CHOICES,
        default='DEF',
    )
    top_story = models.BooleanField(default=False)
    date_published = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)


    def __str__(self):
        return self.title
