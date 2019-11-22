import base64
import json
import os

import firebase_admin
from firebase_admin import credentials, firestore


def db_client():
    cred = credentials.Certificate(
        json.loads(base64.b64decode(os.environ["FIREBASE_KEY"]))
    )
    firebase_admin.initialize_app(cred)
    return firestore.client()
