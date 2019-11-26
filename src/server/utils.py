from flask import abort, request


def check_json_request(format_):
    """Handy function to validate and parse incoming JSON requests.

    First this will reject any non-JSON request.

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
        abort(400)

    contents = request.get_json()
    if set(contents.keys()) != set(format_.keys()):
        abort(400)

    for field, type_ in format_.items():
        if type(contents[field]) != type_:
            abort(400)

    return contents
