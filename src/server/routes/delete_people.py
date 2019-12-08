from flask import jsonify, request

from db import Mentees, Mentors
from server import app
from server.utils import check_json_request, check_session


@check_session
@check_json_request({"mentees": list, "mentors": list})
@app.route("/delete", methods=["DELETE"])
def delete_people():
    emails = request.get_json()
    Mentees.delete_batch(emails["mentees"])
    Mentors.delete_batch(emails["mentors"])
    return jsonify()
