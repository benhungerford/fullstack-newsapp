from django.urls import path


from .views import ArticleListView, ArticleDetailView, UserArticleListView, SuperArticleListView




urlpatterns = [
    path('<int:pk>/', ArticleDetailView.as_view()),
    path('', ArticleListView.as_view()),
    path('superuser-view/', SuperArticleListView.as_view()),
    path('user-view/', UserArticleListView.as_view()),
]
