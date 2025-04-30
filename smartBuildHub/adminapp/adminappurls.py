from django.urls import path, include
from . import views


urlpatterns = [
   path('admindash/',views.admindash,name='admindash'),
   path('viewenq/',views.viewenq,name='viewenq'),
   path('viewHomeOwners/',views.viewHomeOwners,name='viewHomeOwners'),
   path('viewSuppliers/',views.viewSuppliers,name='viewSuppliers'),
   path('viewArchitecture/', views.viewArchitecture, name='viewArchitecture'),
   path('viewContractor/',views.viewContractor,name='viewContractor'),
   path('view_users/',views.view_users,name='view_users'),
   path('adminlogout/',views.adminlogout,name='adminlogout'),
]