from django.core.management import BaseCommand
from django.db import transaction


class Command(BaseCommand):
    help = "Face recognition"

    def handle(self, *args, **options):
        with transaction.atomic():
            self._create_recognition()

    @staticmethod
    def _create_recognition():
        import ipdb
        ipdb.set_trace()
