import argparse
import csv
import os
import logging
import re

from db import BoardMembers, Matches, Mentees, Mentors

logger = logging.getLogger(__name__)


def snake_case(s):
    s = s.lower().strip()
    return re.sub(r"\s+", r"_", s)


def read_csv(path):
    """Yield CSV rows as dicts with snake_case keys."""
    with open(path, newline="") as f:
        fields = None
        for i, row in enumerate(csv.reader(f)):
            # CSV header.
            if i == 0:
                fields = list(map(snake_case, row))
            else:
                yield {k: row[i].strip() for i, k in enumerate(fields) if k}


def handle_mentors(overwrite, path):
    if overwrite:
        Mentors.wipe()

    mentors = {}
    for row in read_csv(os.path.join("data", path)):
        try:
            row["mentees"] = []
            email = row["email"].lower()
            del row["email"]
            mentors[email] = row
        except KeyError as e:
            logger.warning("Warning: row with missing email key: {}", e)

    Mentors.add_batch(mentors)


def handle_mentees(overwrite, path):
    if overwrite:
        Mentees.wipe()

    mentees = {}
    for row in read_csv(os.path.join("data", path)):
        try:
            row["mentor"] = ""
            email = row["email"].lower()
            del row["email"]
            row["net_id"] = row["net_id"].lower()
            mentees[email] = row
        except KeyError as e:
            logger.warning("Warning: row with missing email key: {}", e)
    Mentees.add_batch(mentees)


def handle_board_members(overwrite, path):
    if overwrite:
        BoardMembers.wipe()

    board_members = {}
    for row in read_csv(os.path.join("data", path)):
        try:
            email = row["email"].lower()
            del row["email"]
            row["net_id"] = row["net_id"].lower()
            board_members[email] = row
        except KeyError as e:
            print("Warning: row with missing email key: ", e)

    BoardMembers.add_batch(board_members)


def handle_matches(path_="Matches.csv"):

    for row in read_csv(os.path.join("data", path_)):
        try:
            mentor_email = row["mentor_email"].lower()
            mentee_email = row["mentee_email"].lower()
        except KeyError as e:
            print("Warning: row with missing mentor or mentee email key: ", e)
        try:
            Matches.add(mentor_email, mentee_email)
        except ValueError as e:
            print("Warning: mentor or mentee not found.", e)


def str2bool(s):
    """Sanitize strings for argparse.

    Taken from:
    https://stackoverflow.com/questions/15008758/parsing-boolean-values-with-argparse

    """
    if isinstance(s, bool):
        return s
    if s.lower() in ("yes", "true", "t", "y", "1"):
        return True
    if s.lower() in ("no", "false", "f", "n", "0"):
        return False
    raise argparse.ArgumentTypeError("Boolean value expected.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--wipe_mentors", type=str2bool, nargs="?", default=True)
    parser.add_argument("--wipe_mentees", type=str2bool, nargs="?", default=True)
    parser.add_argument("--wipe_board_members", type=str2bool, nargs="?", default=True)
    parser.add_argument("--mentors_csv", type=str, default="Mentors.csv")
    parser.add_argument("--mentees_csv", type=str, default="Mentees.csv")
    parser.add_argument("--matches_csv", type=str, default="Matches.csv")
    parser.add_argument(
        "--board_members_csv", type=str, default="BoardMembers.csv",
    )
    FLAGS = parser.parse_args()

    handle_mentors(FLAGS.wipe_mentors, FLAGS.mentors_csv)
    handle_mentees(FLAGS.wipe_mentees, FLAGS.mentees_csv)
    handle_matches(FLAGS.matches_csv)
    handle_board_members(FLAGS.wipe_board_members, FLAGS.board_members_csv)
