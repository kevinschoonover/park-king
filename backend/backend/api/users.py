from flask import make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from backend import database


class UserList(Resource):
    def get(self):
        rows = database.query('SELECT * FROM user')
        return [dict(row) for row in rows], 200

    def post(self):
        data = request.get_json()
        validate_exists(data, ['email', 'password'])
        database.query(
            'INSERT INTO user (email, password) VALUES (?, ?)',
            [data['email'], data['password']],
        )
        database.commit()
        return None, 201


class UserSingle(Resource):
    def get(self, user_id):
        row = database.query(
            'SELECT * FROM user WHERE id = ?',
            [user_id],
            single=True,
        )
        return dict(row)
