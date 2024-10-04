from rest_framework import serializers
from .models import CustomUser, Resident, Household

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ResidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resident
        fields = '__all__'

class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = '__all__'
