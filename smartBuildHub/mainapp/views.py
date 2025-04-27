from django.shortcuts import render,redirect
from .models import Enquiry,LoginInfo
from django.contrib import messages
def home(request):
    return render(request, 'website/index.html')

def contact_view(request):
    if request.method == "POST":
        name = request.POST.get('name')
        contactno = request.POST.get('contactno')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        Enquiry.objects.create(name=name,
                               contactno=contactno,
                               email=email,
                               subject=subject,
                               message=message)
        messages.success(request,"Your enquiry has been submitted")
        return redirect('contact')
    return render(request, 'website/contact.html')

def services_view(request):
    return render(request, 'website/services.html')

def about_view(request):
    return render(request, 'website/about.html')

def projects_view(request):
    return render(request, 'website/project.html')\
    
def login_view(request):
    return render(request,'website/auth.html')

def logcode(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = LoginInfo.objects.get(username=username,password=password)
            if user is not None:
                if user.usertype == "admin":
                    request.session['adminid'] = user.username
                    return redirect('admindash')
        except LoginInfo.DoesNotExist:
            messages.error(request,'Invalid Credentials')
            return redirect('login')
    else:
        return redirect('login')

def signcode(request):
    if request.method == "POST":
        firstName = request.POST.get('firstName')
        LastName = request.POST.get('lastName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        userType = request.POST.get('userType')
        
        LoginInfo.objects.create(firstName=firstName,
                               LastName=LastName,
                               email=email,
                               password=password,)
        messages.success(request," User Register Success")
        return redirect('login')
    else:
        return redirect('signup')