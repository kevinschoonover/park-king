import sqlite
from flask import g

#DATABASE = ':memory:'
DATABASE = '/tmp/park-king.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def query(query, parameters=(), single=False):
    cur = get_db().execute(query, parameters)
    if single:
        result = cur.fetchone()
    else:
        result = cur.fetchall()
    cur.close()
    return result
