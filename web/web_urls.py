from django.urls import path, include

urlpatterns = [
    path('user_profile/', include('web.apps.user_profile.urls'))
]