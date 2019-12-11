from flask import jsonify

from db import Mentors
from server import app
from server.utils import check_json_request, check_session_soft


@app.route("/mentors", methods=["GET"])
@check_json_request()
def mentors():
    logged_in = check_session_soft()

    mentors = {}
    for i, (email, mentor) in enumerate(Mentors.stream()):
        if logged_in:
            mentors[email] = mentor
        else:
            # TODO: delete other fields we don't want the public to have access to.
            mentors[i] = mentor
    return jsonify(mentors)
