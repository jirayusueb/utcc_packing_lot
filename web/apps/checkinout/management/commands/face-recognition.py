import numpy as np
from django.core.management import BaseCommand
from django.db import transaction

from web.apps.user_profile.models import UserProfile
import face_recognition


class Command(BaseCommand):
    help = "Face recognition"
    face_image = "image.jpg"

    def handle(self, *args, **options):
        with transaction.atomic():
            self._create_recognition(face_image)

    @staticmethod
    def _create_recognition(image):
        import ipdb
        ipdb.set_trace()
        userprofiles = UserProfile.objects.all()

        known_face_names = []
        known_face_encodings = []

        for userprofile in userprofiles:
            known_face_encodings.append(
                face_recognition.face_encodings(face_recognition.load_image_file(userprofile.image.url),
                                                model="cnn")[0])
            known_face_names.append(userprofile.family_name)

        unknown_image = face_recognition.load_image_file(image)
        face_locations = face_recognition.face_locations(unknown_image)
        face_encodings = face_recognition.face_encodings(unknown_image, face_locations)

        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
        return name
