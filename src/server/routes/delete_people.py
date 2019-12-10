from flask import jsonify, request

from db import Mentees, Mentors
from server import app
from server.utils import check_json_request, check_session


@app.route("/delete", methods=["DELETE"])
@check_session
@check_json_request({"mentees": list, "mentors": list})
def delete_people():
    emails = request.get_json()
    Mentees.delete_batch(emails["mentees"])
    Mentors.delete_batch(emails["mentors"])
    return jsonify()
