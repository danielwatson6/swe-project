import time

from flask import jsonify, request

from db import Users
from server import app
from server.utils import check_json_request, check_session


@check_session
@check_json_request()
@app.route("/logout", methods=["POST"])
def logout():
    username = request.cookies["username"]
    Users.end_session(username)

    response = jsonify()
    # Send cookies with expired time and empty values for the browser to delete them.
    expires_at = time.time() - 1.0
    response.set_cookie("username", value="", expires=expires_at)
    response.set_cookie(
        "login_token", value="", expires=expires_at, secure=True, httponly=True
    )
    return response
