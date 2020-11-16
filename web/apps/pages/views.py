from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = 'home.html'


class DetectionPageView(TemplateView):
    template_name = 'detection.html'
