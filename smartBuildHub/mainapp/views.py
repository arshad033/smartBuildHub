from django.db import IntegrityError
from django.shortcuts import render,redirect
from .models import Enquiry,LoginInfo ,User
from django.contrib import messages
from django.contrib.auth.hashers import check_password, make_password

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

def signUp_view(request):
    return render(request,'website/auth.html')

def profile_view(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = LoginInfo.objects.get(id=user_id)
    return render(request, 'website/profile.html', {'user': user})


def logcode(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            # Get the user from the database
            user = LoginInfo.objects.get(username=username)

            # Check if the password matches the hashed password stored in the database
            if check_password(password, user.password):
                # Password is correct, authenticate the user
                request.session['user_id'] = user.id  # Store user ID in session
                # Example: checking usertype
                if user.usertype == "supplier":
                    request.session['supplier'] = user.username
                    return redirect('index')
                elif user.usertype == "homeowner":
                    request.session['homeowner'] = user.username
                    return redirect('index')
                elif user.usertype == "contractor":
                    request.session['contractor'] = user.username
                    return redirect('index')
                elif user.usertype == "architecture":
                    request.session['architecture'] = user.username
                    return redirect('index')
                else:
                    messages.error(request, 'Invalid user type.')
            else:
                messages.error(request, 'Invalid Credentials')
        except LoginInfo.DoesNotExist:
            messages.error(request, 'Invalid Credentials')
        
        return redirect('login')
    else:
        return redirect('login')  

    
def signcode(request):
    if request.method == "POST":
        firstName = request.POST.get('firstName')
        lastName = request.POST.get('lastName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        userType = request.POST.get('userType')
        
        try:
            # Hash the password before storing it in the database
            hashed_password = make_password(password)

            # Creating LoginInfo and User objects with the hashed password
            LoginInfo.objects.create(
                usertype=userType,
                username=email,
                password=hashed_password,
            )
            
            User.objects.create(
                usertype=userType,
                firstName=firstName,
                lastName=lastName,
                email=email,
                password=hashed_password,  # Store the hashed password here as well
            )
            
            messages.success(request, "User Register Success")
            return redirect('login')

        except IntegrityError as e:
            # Catching database integrity errors (e.g., unique constraint violations)
            messages.error(request, "A user with this email already exists.")
            return redirect('signup')
        except Exception as e:
            # Catching other unexpected errors
            messages.error(request, f"An error occurred: {str(e)}")
            return redirect('signup')
    else:
        return redirect('signup')
    
def userlogout(request):
    if 'homeowner' in request.session:
        del request.session['homeowner']
        return redirect('index')
    else:
        messages.error(request,'Login first')
        return redirect('login')
