from db.base import Collection, db

# Add all submodules of `db` here.
# Use alphabetical order unless to avoid circular imports.
from db.mentees import Mentees
from db.mentors import Mentors
from db.matches import Matches
from db.users import Users
from db.board_members import BoardMembers

# logging
import os
import logging

log_filename = "./logs/output.log"
os.makedirs(os.path.dirname(log_filename), exist_ok=True)
logging.basicConfig(filename=log_filename, level=logging.DEBUG)
