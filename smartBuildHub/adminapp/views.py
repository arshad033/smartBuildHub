from django.shortcuts import render,redirect
from mainapp.models import Enquiry , User
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
    
def viewHomeOwners(request):
        if 'adminid' in request.session:
            adminid = request.session.get('adminid')
            return render(request,'viewHomeOwners.html')
        else:
            messages.error(request,'Login first')
            return redirect('login')
    
def viewContractor(request):
    if 'adminid' in request.session:
        adminid = request.session.get('adminid')
        contractors = User.objects.filter(usertype='contractor')
        context = {
            'contractors': contractors,
            'adminid': adminid
        }
        return render(request, 'viewContractor.html', context)
    else:
        messages.error(request, 'Login first')
        return redirect('login')


def viewSuppliers(request):
    if 'adminid' in request.session:
        adminid = request.session.get('adminid')
        suppliers = User.objects.filter(usertype='supplier')
        context = {
            'suppliers': suppliers,
            'adminid': adminid
        }
        return render(request, 'viewSuppliers.html', context)
    else:
        messages.error(request, 'Login first')
        return redirect('login')
    
def viewArchitecture(request):
    if 'adminid' in request.session:
        adminid = request.session.get('adminid')
        architectures = User.objects.filter(usertype='architecture')
        context = {
            'architectures': architectures,
            'adminid': adminid
        }
        return render(request, 'viewarchitecture.html', context)
    else:
        messages.error(request, 'Login first')
        return redirect('login')
