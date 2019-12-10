from flask import jsonify

from db import Mentors
from server import app
from server.utils import check_json_request, check_session


@app.route("/mentors", methods=["GET"])
@check_session
@check_json_request()
def mentors():
    mentors = {}
    for email, mentor in Mentors.stream():
        mentors[email] = mentor
    return jsonify(mentors)
