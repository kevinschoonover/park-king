"""
Implementation of the connection to the application database.
"""

import sqlite3
from flask import g

#DATABASE = ':memory:'
DATABASE = '/tmp/park-king.db'

def init_app(app):
    """
    Initializes the database and runs the ``schema.sql`` script
    to set up tables.
    """
    app.teardown_appcontext(close_connection)

    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


def get_db():
    """
    Gets or creates a connection to the database.
    """
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def close_connection(exception):
    """
    Disconnects from the current database.
    """
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def query(query, parameters=(), single=False):
    """
    Sends a formatted query to the database. Can return a list of rows or
    a single value depending on the ``single`` argument.
    """
    cur = get_db().execute(query, parameters)
    cur.row_factory = dict_factory
    #cur = cur.cursor()
    if single:
        result = cur.fetchone()
    else:
        result = cur.fetchall()
    cur.close()
    return result

def commit():
    """
    Commits any changes made to the database so other connections can see it.
    """
    get_db().commit()

def dict_factory(cursor,row):
    d = {}
    for idx,col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
