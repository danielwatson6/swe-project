import csv
import os
import re
import logging

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


def handle_mentors(overwrite_=True, path_="Mentors.csv"):
    mentors_ref = db.collection("mentors")
    if overwrite_:
        wipe_collection(mentors_ref)

    batch = db.batch()

    for row in read_csv(os.path.join("data", path_)):
        try:
            row["mentees"] = []
            id = row["email"]  # use emails as unique id
            batch.set(mentors_ref.document(id), row)
        except KeyError as e:
            print("Warning: row with missing email key: ", e)

    batch.commit()


def handle_mentees(overwrite_=True, path_="Mentees.csv"):
    mentees_ref = db.collection("mentees")
    if overwrite_:
        wipe_collection(mentees_ref)

    batch = db.batch()

    for row in read_csv(os.path.join("data", path_)):
        try:
            row["mentor"] = ""
            id = row["email"]  # use emails as unique id
            batch.set(mentees_ref.document(id), row)
        except KeyError as e:
            print("Warning: row with missing email key: ", e)

    batch.commit()


def handle_board_members(overwrite_=True, path_="Board_Members.csv"):
    bm_ref = db.collection("board_members")
    if overwrite_:
        wipe_collection(bm_ref)

    batch = db.batch()

    for row in read_csv(os.path.join("data", path_)):
        try:
            id = row["email"]  # use emails as unique id
            batch.set(bm_ref.document(id), row)
        except KeyError as e:
            print("Warning: row with missing email key: ", e)

    batch.commit()


def handle_matches(overwrite_=True, path_="Matches.csv"):
    mentors_ref = db.collection("mentors")
    mentees_ref = db.collection("mentees")
    matches_ref = db.collection("matches")

    if overwrite_:
        wipe_collection(matches_ref)

    batch = db.batch()

    for row in read_csv(os.path.join("data", path_)):
        try:
            mentor_email = row["mentor_email"]
            mentee_email = row["mentee_email"]
            try:
                mentor_ref = mentors_ref.document(mentor_email)
                mentee_ref = mentees_ref.document(mentee_email)
                mentor = mentor_ref.get()
                mentee = mentee_ref.get()
                if mentor.exists and mentee.exists:
                    mentor_mentees = mentor.to_dict()["mentees"]
                    mentor_mentees.append(mentee.id)
                    id = mentor.id + mentee.id  # use
                    batch.set(matches_ref.document(id), row)
                    batch.update(mentor_ref, {"mentees": mentor_mentees})
                    batch.update(mentee_ref, {"mentor": mentor.id})
                else:
                    raise StopIteration
            except StopIteration:
                print("Warning: someone with one of these two emails doesn't exist:")
                print(mentor_email)
                print(mentee_email)
        except KeyError as e:
            print("Warning: row with missing mentor or mentee email key: ", e)

    batch.commit()


if __name__ == "__main__":
    handle_mentors()
    handle_mentors(False, "New_Mentors.csv")
    handle_mentees()
    handle_board_members()
    handle_matches()
