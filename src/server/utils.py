from flask import abort, redirect, request

from db import Users


def _check_json_request(format_):
    """Handy function to validate and parse incoming JSON requests.

    First this will handle any non-JSON request to just return the HTML template.

    Then, this will check that the keys in `s` are exactly the keys in `format_`, and
    that the values in `s` have the types associated to the keys in `format_`. E.g.,

    >>> check({"foo": 1, "bar", "baz"}, {"foo": int, "bar": str})
    True

    >>> check({"foo": 1}, {"foo": int, "bar": str})
    False

    >>> check({"foo": 1, "bar", "baz"}, {"foo": int})
    False

    If all checks pass, the request's parsed JSON contents will be returned.

    """
    if not request.is_json:
        redirect("/", code=302)

    contents = request.get_json()
    if set(contents.keys()) != set(format_.keys()):
        abort(400)

    for field, type_ in format_.items():
        if type(contents[field]) != type_:
            abort(400)


def check_json_request(format_={}):
    """Create a route decorator that executes `_check_json_request`."""

    def decorator(f):
        def route(*args, **kwargs):
            _check_json_request(format_)
            return f(*args, **kwargs)

        return route

    return decorator


def _check_session():
    """Verify that the user is logged in."""
    if "username" not in request.cookies:
        abort(400)
    if "login_token" not in request.cookies:
        abort(400)

    username = request.cookies["username"]
    login_token = request.cookies["login_token"]
    if not Users.verify_session(username, login_token):
        abort(403)


def check_session(f):
    """Route decorator that executes `_check_session`."""

    def route(*args, **kwargs):
        _check_session()
        return f(*args, **kwargs)

    return route
