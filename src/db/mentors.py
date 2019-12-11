from contextlib import suppress

from db import Collection


class Mentors(Collection):
    collection = "mentors"

    @classmethod
    def get_by_names(cls, first_name, last_name):
        it = iter(
            cls.get_collection()
            .where("first_name", "==", first_name)
            .where("last_name", "==", last_name)
            .stream()
        )
        with suppress(StopIteration):
            doc = next(it)
            return doc.id, cls.to_dict(doc)
