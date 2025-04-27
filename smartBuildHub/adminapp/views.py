from django.shortcuts import render,redirect
from mainapp.models import Enquiry
from django.contrib import  messages

# Create your views here.
def admindash(request):
    if 'adminid' in request.session:
        adminid = request.session.get('adminid')
        context = {
            'adminid':adminid
        }
        return render(request,'admindash.html',context)
    else:
        messages.error(request,'Login first')
        return redirect('login')
    
def adminlogout(request):
    if 'adminid' in request.session:
        del request.session['adminid']
        return redirect('login')
    else:
        messages.error(request,'Login first')
        return redirect('login')

def viewenq(request):
    if 'adminid' in request.session:
        adminid = request.session.get('adminid')
        enq = Enquiry.objects.all()
        context = {
            'enq':enq,
            'adminid':adminid
        }
        return render(request,'viewenquiries.html',context)
    else:
        messages.error(request,'Login first')
        return redirect('login')
    
    