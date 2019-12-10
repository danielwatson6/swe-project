from flask import Response, request

from db import Mentees
from server import app
from server.utils import check_json_request, check_session


FIELDS = [
    "first_name",
    "last_name",
    "net_id",
    "mentor",
    "major",
    "graduation_date",
    "nationality",
]


@app.route("/mentees/download", methods=["POST"])
@check_session
@check_json_request({"emails": list})
def download_mentees():
    emails = request.get_json()["emails"]

    csv = "email," + ",".join(FIELDS)
    for email in emails:
        mentee = Mentees.get(email)
        csv += "\n"
        csv += f"{email},"
        csv += ",".join(mentee[f] for f in FIELDS)

    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=Mentees.csv"},
    )
