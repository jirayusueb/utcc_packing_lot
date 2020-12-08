from django.urls import path

from .views import HomePageView, DetectPageView, TestPageView
from ..parking.views import ParkingExportView

app_name = 'page'

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('detect/', DetectPageView.as_view(), name='detect'),
    path('test/', TestPageView.as_view(), name='test'),
    path('export/', ParkingExportView.as_view(), name='export'),
]
