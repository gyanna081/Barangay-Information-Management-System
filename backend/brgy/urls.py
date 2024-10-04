from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, ResidentViewSet, HouseholdViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'residents', ResidentViewSet)
router.register(r'households', HouseholdViewSet)

urlpatterns = [
    path('', include(router.urls)),  # This includes all the routes for users, residents, and households
]
