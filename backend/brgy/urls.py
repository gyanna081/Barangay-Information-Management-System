from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, ResidentViewSet, HouseholdViewSet, LoginAPIView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'residents', ResidentViewSet)
router.register(r'households', HouseholdViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginAPIView, name='login'),
]
