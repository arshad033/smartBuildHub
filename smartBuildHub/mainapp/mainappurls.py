from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),  #  Home page
    path('contact/', views.contact_view, name='contact'),
    path('about/', views.about_view, name='about'),
    path('project/', views.projects_view, name='project'),
    path('services/', views.services_view, name='services'),
    path('login/', views.login_view, name='login'),
    path('logcode/', views.logcode, name='logcode'),
]