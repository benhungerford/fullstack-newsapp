from rest_framework import serializers


from .models import Article




class ArticleSerializer(serializers.ModelSerializer):

    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        # depth = 1
        model = Article
        fields = ('id', 'title', 'body', 'username', 'category', 'status', 'top_story', 'date_published',)
