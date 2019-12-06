from flask import jsonify

from db import Mentors
from server import app
from server.utils import check_json_request, check_session


@check_session
@check_json_request()
@app.route("/mentors", methods=["GET"])
def mentors():
    mentors = {}
    for email, mentor in Mentors.stream():
        mentors[email] = mentor
    return jsonify(mentors)
