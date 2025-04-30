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

class User(models.Model):
    USER_TYPES = (
        ('supplier', 'Supplier'),
        ('contractor', 'Contractor'),
        ('homeowner', 'homeowner'),
        ('admin', 'Admin'),
        ('architecture', 'Architecture'),  
        # Add more types if needed
    )

    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Normally hashed, so 128 is safe
    usertype = models.CharField(max_length=20, choices=USER_TYPES)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.user_type})"