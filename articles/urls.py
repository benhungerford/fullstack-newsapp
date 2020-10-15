from django.urls import path


from .views import ArticleListView, ArticleDetailView




urlpatterns = [
    path('<int:pk>/', ArticleDetailView.as_view()),
    path('', ArticleListView.as_view())
]
