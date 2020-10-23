from rest_framework import generics
from rest_framework import permissions
from .models import Article
from .serializers import ArticleSerializer




class ArticleListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class SuperArticleListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class UserArticleListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(user=user)
