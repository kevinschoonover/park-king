from flask import Flask


def create_app():
    app = Flask('park-king-backend')

    from backend import database
    database.init_db(app)

    return app
