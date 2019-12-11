from functools import wraps

from flask import abort, render_template, request

from db import Users
import logging


logger = logging.getLogger(__name__)


def _check_json_request(format_):
    """Handy function to validate and parse incoming JSON requests.

    First this will handle any non-JSON request to just return the HTML template.

    Then, this will check that the keys in `s` are exactly the keys in `format_`, and
    that the values in `s` have the types associated to the keys in `format_`. E.g.,

    >>> _check_json_request({"foo": 1, "bar", "baz"}, {"foo": int, "bar": str})
    True

    >>> _check_json_request({"foo": 1}, {"foo": int, "bar": str})
    False

    >>> _check_json_request({"foo": 1, "bar", "baz"}, {"foo": int})
    False

    If all checks pass, the request's parsed JSON contents will be returned.

    """
    if not request.is_json and request.method == "GET":
        return render_template("index.html")

    try:
        contents = request.get_json()
    except Exception as e:
        if not len(format_.keys()):
            return
        raise

    if set(contents.keys()) != set(format_.keys()):
        abort(400)

    for field, type_ in format_.items():
        if type(contents[field]) != type_:
            abort(400)


def check_json_request(format_={}):
    """Create a route decorator that executes `_check_json_request`."""

    def decorator(f):
        @wraps(f)
        def route(*args, **kwargs):
            res = _check_json_request(format_)
            if res is not None:
                return res
            return f(*args, **kwargs)

        return route

    return decorator


def check_session_soft():
    """Determine whether the user is logged in."""
    if "username" not in request.cookies:
        return False
    if "login_token" not in request.cookies:
        return False

    username = request.cookies["username"]
    login_token = request.cookies["login_token"]
    return Users.verify_session(username, login_token)


def _check_session():
    """Verify that the user is logged in to allow a request."""
    if "username" not in request.cookies:
        abort(400)
    if "login_token" not in request.cookies:
        abort(400)

    username = request.cookies["username"]
    login_token = request.cookies["login_token"]
    if not Users.verify_session(username, login_token):
        logger.warning(f"User likely attempted to forge login token: {username}")
        abort(403)


def check_session(f):
    """Route decorator that executes `_check_session`."""

    @wraps(f)
    def route(*args, **kwargs):
        _check_session()
        return f(*args, **kwargs)

    return route
