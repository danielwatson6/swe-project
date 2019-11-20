import os

from flask import Flask


client_path = os.path.join("..", "client")
app = Flask(__name__, static_folder=client_path, template_folder=client_path)
