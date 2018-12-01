from flask import Flask

from . import api, database

def create_app():
    app = Flask('backend')
    api.init_app(app)
    database.init_app(app)

    return app
