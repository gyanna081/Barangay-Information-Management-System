from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.index, name='index'),
    path('header/', views.header, name='header'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
]