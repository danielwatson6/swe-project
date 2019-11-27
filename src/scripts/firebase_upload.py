import csv
import os
import re

from db import db


def snake_case(s):
    s = s.lower().strip()
    return re.sub(r"\s+", r"_", s)


def wipe_collection(collection):
    """Deletes all documents inside a Firebase collection."""
    for doc in collection.stream():
        collection.document(doc.id).delete()


def read_csv(path):
    """Yield CSV rows as dicts with snake_case keys."""
    with open(path, newline="") as f:
        fields = None
        for i, row in enumerate(csv.reader(f)):
            # CSV header.
            if i == 0:
                fields = list(map(snake_case, row))
            else:
                yield {k: row[i] for i, k in enumerate(fields) if k}


def handle_mentors():
    wipe_collection(db.collection("mentors"))

    for row in read_csv(os.path.join("data", "Mentors.csv")):
        try:
            row["mentees"] = []
            row["email"] = row["email_address"]
            del row["email_address"]
            db.collection("mentors").add(row)
        except KeyError:
            print("Warning: row with missing keys:", row)


def handle_mentees():
    wipe_collection(db.collection("mentees"))

    for row in read_csv(os.path.join("data", "Mentees.csv")):
        row["mentor"] = ""
        del row["full_name"]
        row["email"] = row["nyu_email"]
        del row["nyu_email"]
        db.collection("mentees").add(row)


def handle_matches():
    wipe_collection(db.collection("matches"))

    for row in read_csv(os.path.join("data", "Matches.csv")):
        mentor_email = row["mentor_email"]
        mentee_email = row["mentee_email"]
        try:
            mentor = next(
                db.collection("mentors").where("email", "==", mentor_email).stream()
            )
            mentee = next(
                db.collection("mentees").where("email", "==", mentee_email).stream()
            )
            mentor_mentees = mentor.to_dict()["mentees"]
            mentor_mentees.append(mentee.id)
            mentor.reference.update({"mentees": mentor_mentees})
            mentee.reference.update({"mentor": mentor.id})
        except StopIteration:
            print("Warning: someone with one of these two emails doesn't exist:")
            print(mentor_email)
            print(mentee_email)


if __name__ == "__main__":
    handle_mentors()
    handle_mentees()
    handle_matches()
