from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

def header(request):
    return render(request, 'frontend/components/header.html')

def login(request):
    return render(request, 'frontend/pages/login.html')

def register(request):
    return render(request, 'frontend/pages/register.html')

