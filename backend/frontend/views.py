from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

def header(request):
    return render(request, 'frontend/components/header.html')