from db.base import Collection, db

# Add all submodules of `db` here.
# Use alphabetical order unless to avoid circular imports.
from db.mentees import Mentees
from db.mentors import Mentors
from db.matches import Matches
from db.users import Users
