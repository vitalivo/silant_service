from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComplaintViewSet

app_name = 'complaints'

router = DefaultRouter()
router.register(r'complaints', ComplaintViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
