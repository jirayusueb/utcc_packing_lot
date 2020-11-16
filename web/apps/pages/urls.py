from django.urls import path
from .views import HomePageView, DetectionPageView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('detection/', DetectionPageView.as_view(), name='detection'),
]
