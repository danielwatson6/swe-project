from flask import Response, request

from db import Mentors
from server import app
from server.utils import check_json_request, check_session


FIELDS = [
    "first_name",
    "last_name",
    "company/organization",
    "degree",
    "gender",
    "highest_degree",
    "industry",
    "job_title",
    "mentee_qualities",
    "mentees",
    "nationality",
    "phone_number",
    "program_status",
    "university",
    "whatsapp",
]


@check_session
@check_json_request({"emails": list})
@app.route("/mentors/download", methods=["POST"])
def download_mentors():
    emails = request.get_json()["emails"]

    csv = "email," + ",".join(FIELDS)
    for email in emails:
        mentor = Mentors.get(email)
        csv += "\n"
        csv += f"{email},"
        csv += f'"{",".join(mentor["mentees"])}"'
        csv += ",".join(mentor[f] for f in FIELDS if f != "mentees")

    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=Mentors.csv"},
    )
