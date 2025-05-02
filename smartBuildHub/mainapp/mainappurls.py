from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),  #  Home page
    path('contact/', views.contact_view, name='contact'),
    path('about/', views.about_view, name='about'),
    path('project/', views.projects_view, name='project'),
    path('services/', views.services_view, name='services'),
    path('auth/', views.login_view, name='login'),
    path('auth/', views.signUp_view, name='signup'),
    path('logcode/', views.logcode, name='logcode'),
    path('signcode/', views.signcode, name='signcode'),
    path('profile/', views.profile_view, name='profile'),
    path('updateProfile/', views.update_profile, name='updateProfile'),
    path('userlogout/', views.userlogout, name='userlogout'),
    
]