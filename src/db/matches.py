from db import Collection, Mentors, Mentees


class Matches(Collection):
    @classmethod
    def add(cls, mentor_email, mentee_email):
        mentor = Mentors.get(mentor_email)
        mentee = Mentors.get(mentee_email)
        if mentor is None or mentee is None:
            raise ValueError("Mentor or mentee not found.")

        mentor_mentees = mentor["mentees"]
        mentor_mentees.append(mentee_email)
        Mentors.update(mentor_email, {"mentees": mentor_mentees})
        Mentees.update(mentee_email, {"mentor": mentor_email})
