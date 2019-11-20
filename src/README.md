# One-time setup

To set up the backend environment, make sure to have [python 3.8.0](https://www.python.org/downloads/release/python-380/) and `virtualenv` (`pip install virtualenv`) and ping [@danielwatson6](https://github.com/danielwatson6) for an `env.sh` file.

Within the `src` directory, run the following:
```bash
virtualenv env
source env.sh
pip install -r requirements.txt
```

To set up the frontend environment, make sure to have [node 10.4.0](https://nodejs.org/en/) and `npm` installed.

Within the `src/client` directory, run the following:
```bash
npm i
```

# Start-up

To start the server, make sure to have activated the virtualenv (via `source env.sh`) and run `python -m server.server` within the `src` directory.

To start the client, run `npm run watch` within the `src/client` directory.

# Workflow

All developers should follow the workflow guidelines outlined here.

## Server workflow

### Code style

Install the [black](https://github.com/psf/black) python autoformatter and keep all the default settings.

### Package management

**Make sure to always work within the virtualenv** (via `source env.sh`). After installing a new python package, update the dependencies in the `requirements.txt` file by running `pip freeze > requirements.txt`.

## Client workflow

### Code style

Install [https://eslint.org/](ESLint) and keep all the defaults. Autoformat code with the `--fix` flag.
