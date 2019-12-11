from db import Collection


class MatchRequests(Collection):
    collection = "match_requests"

    @classmethod
    def add(cls, doc):
        """Add a new document to the collection with no specified index."""
        cls.get_collection().add(doc)
