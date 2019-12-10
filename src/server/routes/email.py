from flask import jsonify, request

from server import app
from server.utils import check_json_request, check_session


@app.route("/email", methods=["POST"])
@check_session
@check_json_request({"mentees": list, "mentors": list, "subject": str, "body": str})
def email():
    emails = request.get_json()
    return jsonify()
