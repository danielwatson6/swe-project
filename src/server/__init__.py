from server.app import app

import logging

LOG_FILENAME = "logs/server.log"
logging.basicConfig(
    format="%(asctime)s - %(name)s:%(lineno)s - %(levelname)s - %(message)s",
    filename=LOG_FILENAME,
    filemode="w",
    level=logging.DEBUG,
)
