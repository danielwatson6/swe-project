# One-time setup

To set up the backend environment, make sure to have [python 3.8.0](https://www.python.org/downloads/release/python-380/) and `virtualenv` (`pip install virtualenv`) and ping [@danielwatson6](https://github.com/danielwatson6) for an `env.sh` file.

(Optional) for access to the original CSV data, ping [@danielwatson6](https://github.com/danielwatson6). With the data, by calling `python -m scripts.firebase_upload`, the database will be wiped out and freshly recreated.

(Optional) to add a new user, run `python -m scripts.add_user`.

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

Sort imports by built-in libraries, third party libraries, and in-project modules, separating each of the three by an additional newline and sorting each category alphabetically.

### Directory structure

Keep each route in its own file as a submodule of `routes`, making sure to import it on `routes/__init__.py`.

Keep scripts that are never imported by the server as submodules of `scripts`, each in their own executable file.

### Package management

**Make sure to always work within the virtualenv** (i.e., run `source env.sh` in every new shell). After installing a new python package, update the dependencies in the `requirements.txt` file by running `pip freeze > requirements.txt`.

## Client workflow

### Code style

Install [https://eslint.org/](ESLint) and keep all the defaults. Autoformat code with the `--fix` flag.

Sort imports by third party libraries, components and other in-project imports, separating each of the three by an additional newline and sorting each category alphabetically.

### Directory structure

Each React component should live in its own file but be imported (via `index.js`) by a relative import to its parent directory, whose name is identical. Name both the directory and the file in `CamelCase` (resembling a class). Subcomponents only used by a parent component should live in subdirectories (e.g., `App` is the parent-most component, so all other components are in subdirectories of `App`).
