import sys

from flask import Flask

from server import app, routes


PORT = 8888


if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print("Usage: python -m server.server [port]?")
            exit()
    app.run(debug=True, port=PORT, host="0.0.0.0")
