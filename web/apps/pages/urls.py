from django.urls import path
from .views import HomePageView, DetectPageView, TestPageView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('detect/', DetectPageView.as_view(), name='detect'),
    path('testpage/', TestPageView.as_view(), name='testpage'),
]
