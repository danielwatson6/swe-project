from db.base import Collection, db

# Add all submodules of `db` here.
# Use alphabetical order unless to avoid circular imports.
from db.mentees import Mentees
from db.mentors import Mentors
from db.matches import Matches
from db.users import Users
from db.board_members import BoardMembers

# logging
import logging

LOG_FILENAME = "logs/db.log"
logging.basicConfig(
    format="%(asctime)s - %(name)s%.(lineno)s - %(levelname)s - %(message)s",
    filename=LOG_FILENAME,
    filemode="w",
    level=logging.DEBUG,
)
