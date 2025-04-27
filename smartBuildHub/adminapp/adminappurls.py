from django.urls import path, include
from . import views


urlpatterns = [
   path('admindash/',views.admindash,name='admindash'),
   path('viewenq/',views.viewenq,name='viewenq'),
   path('adminlogout/',views.adminlogout,name='adminlogout'),
]