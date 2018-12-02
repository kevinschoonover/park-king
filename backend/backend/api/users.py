from sqlite3 import IntegrityError

from flask import abort, make_response, request
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
        try:
            database.query(
                'INSERT INTO user (email, password) VALUES (?, ?)',
                [data['email'], data['password']],
            )
        except IntegrityError as e:
            abort(400, str(e))

        database.commit()
        return None, 201


class UserSingle(Resource):
    def get(self, user_id):
        row = database.query(
            'SELECT * FROM user WHERE id = ?',
            [user_id],
            single=True,
        )
        if row is None:
            abort(404)
        return dict(row)

class UserVehicles(Resource):
    def get(self, user_id):
        rows = database.query(
            'SELECT * FROM vehicle WHERE user_id = ?',
            [user_id],
        )
        return [dict(row) for row in rows]

    def post(self, user_id):
        data = request.get_json()
        validate_exists(data, ['type_id', 'state', 'license', 'make', 'model', 'year'])
        try:
            database.query(
                '''INSERT INTO vehicle 
                    (user_id, type_id, state, license, make, model, year)
                    VALUES (?, ?, ?, ?, ?, ?, ?)''',
                [user_id, data['type_id'], data['state'], data['license'], data['make'], data['model'], data['year']],
            )
        except IntegrityError as e:
            abort(400, str(e))

        database.commit()
        return None, 201
