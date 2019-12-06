from flask import jsonify

from db import Mentees
from server import app
from server.utils import check_json_request, check_session


@check_session
@check_json_request()
@app.route("/mentees", methods=["GET"])
def mentees():
    mentees = {}
    for email, mentee in Mentees.stream():
        mentees[email] = mentee
    return jsonify(mentees)
