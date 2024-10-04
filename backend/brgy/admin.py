from django.contrib import admin
from .models import CustomUser, Resident, Household

admin.site.register(CustomUser)
admin.site.register(Resident)
admin.site.register(Household)

# Register your models here.
