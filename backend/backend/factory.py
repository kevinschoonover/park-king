from flask import Flask
from flask_cors import CORS

from . import api, database

def create_app():
    app = Flask('backend')
    api.init_app(app)
    database.init_app(app)
    cors = CORS(app, resources={r'*': {'origins': r'*'}})

    return app
