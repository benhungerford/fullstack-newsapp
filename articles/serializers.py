from rest_framework import serializers


from .models import Article




class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'body', 'user', 'category', 'status', 'top_story', 'date_published',)
