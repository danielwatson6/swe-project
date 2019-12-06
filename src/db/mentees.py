from db import Collection


class Mentees(Collection):
    collection = "mentees"

    @classmethod
    def to_dict(cls, doc):
        d = super().to_dict(doc)
        d["name"] = f'{d["first_name"]} {d["last_name"]}'
        del d["first_name"]
        del d["last_name"]
        return d
