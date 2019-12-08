from db import Collection, Mentors, Mentees
import logging

logger = logging.getLogger(__name__)


class Matches(Collection):
    @classmethod
    def add(cls, mentor_email, mentee_email):
        mentor = Mentors.get(mentor_email)
        mentee = Mentees.get(mentee_email)
        if mentor is None or mentee is None:
            raise ValueError("Mentor or mentee not found.")
            logger.error(
                "Mentor or mentee not found - %s, %s", mentor_email, mentee_email
            )
        # mentor_mentees = mentor["mentees"]
        # mentor_mentees.append(mentee_email)
        Mentors.update(mentor_email, {"mentee": mentee_email})
        Mentees.update(mentee_email, {"mentor": mentor_email})
