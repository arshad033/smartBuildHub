from django.db import models

# Create your models here.
class Enquiry(models.Model):
    name = models.CharField(max_length=100)
    contactno = models.CharField(max_length=15,unique=True)
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    enqdate = models.DateTimeField(auto_now_add=True)

class LoginInfo(models.Model):
    usertype = models.CharField(max_length=20)
    username = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=256)
