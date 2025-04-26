from django.urls import path, include
from . import views


urlpatterns = [
   path('admindash/',views.admindash,name='admindash')
]