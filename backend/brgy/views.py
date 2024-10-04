from rest_framework import viewsets
from .models import CustomUser, Resident, Household
from .serializers import CustomUserSerializer, ResidentSerializer, HouseholdSerializer

# ViewSet for CustomUser
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# ViewSet for Resident
class ResidentViewSet(viewsets.ModelViewSet):
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer

# ViewSet for Household
class HouseholdViewSet(viewsets.ModelViewSet):
    queryset = Household.objects.all()
    serializer_class = HouseholdSerializer
