import base64
import json
import os

import firebase_admin
from firebase_admin import credentials, firestore


def _db_client():
    """Initialize the Firebase SDK client."""
    cred = credentials.Certificate(
        json.loads(base64.b64decode(os.environ["FIREBASE_KEY"]))
    )
    firebase_admin.initialize_app(cred)
    return firestore.client()


db = _db_client()


class Collection:
    """Abstract Firebase Collection class."""

    # Set this static variable in each subclass to the string identifying the collection.
    collection = None

    @classmethod
    def get_collection(cls):
        if cls.collection is None:
            raise AttributeError(
                f"`{cls.__name__}` does not refer directly to a collection."
            )
        return db.collection(cls.collection)

    @classmethod
    def get(cls, index):
        """Get an item in the collection via its index."""
        return cls.get_collection().document(index).get().to_dict()

    @classmethod
    def add(cls, index, doc):
        """Add a new document to the collection with the specified index."""
        cls.get_collection().document(index).set(doc)

    @classmethod
    def add_batch(cls, items_dict):
        """Add multiple new documents from a dict with index keys and doc values."""
        batch = db.batch()
        for index, doc in items_dict.items():
            doc_ref = cls.get_collection().document(index)
            batch.set(doc_ref, doc)
        batch.commit()

    @classmethod
    def update(cls, index, fields):
        """Update desired fields from a specified document."""
        cls.get_collection().document(index).update(fields)

    @classmethod
    def delete(cls, index):
        """Delete the specified document from the collection."""
        cls.get_collection().document(index).delete()

    @classmethod
    def wipe(cls):
        """Remove all documents in the collection."""
        for doc in cls.get_collection().stream():
            cls.delete(doc.id)
