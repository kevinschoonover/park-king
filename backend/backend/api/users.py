from sqlite3 import IntegrityError

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists, iso2epoch, epoch2iso
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
        row = database.query(
            'SELECT * FROM user WHERE id = last_insert_rowid()',
            single=True,
        )
        return dict(row), 201


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


class UserAuth(Resource):
    def post(self):
        data = request.get_json()
        validate_exists(data, ['email', 'password'])
        row = database.query(
            'SELECT * FROM user WHERE email = ? AND password = ?',
            [data['email'], data['password']],
            single=True,
        )
        if row is None:
            abort(400, 'Authentication failed')
        return dict(row), 200


class UserVehicles(Resource):
    def get(self, user_id):
        rows = database.query(
            'SELECT * FROM vehicle WHERE user_id = ?',
            [user_id],
        )
        return [dict(row) for row in rows]

    def post(self, user_id):
        data = request.get_json()
        validate_exists(data, ['state', 'license', 'make', 'model', 'year'])
        try:
            database.query(
                '''INSERT INTO vehicle 
                    (user_id, state, license, make, model, year)
                    VALUES (?, ?, ?, ?, ?, ?)''',
                [user_id, data['state'], data['license'], data['make'], data['model'], data['year']],
            )
        except IntegrityError as e:
            abort(400, str(e))

        database.commit()
        row = database.query(
            'SELECT * FROM vehicle WHERE id = last_insert_rowid()',
            single=True,
        )
        return dict(row), 201


def parse_ticket_row(row):
    result = dict(row)
    result['time'] = epoch2iso(result['time'])
    return result


class UserTickets(Resource):
    def get(self,user_id):
        rows = database.query(
            '''SELECT vehicle_id, lot_id, device_id, time
                FROM ticket JOIN vehicle ON ticket.vehicle_id = vehicle.id
                WHERE user_id = ?
            ''',
            [user_id],
        )
        return [parse_ticket_row(row) for row in rows]


def parse_reservation_row(row):
    result = dict(row)
    result['start_time'] = epoch2iso(result['start_time'])
    result['end_time'] = epoch2iso(result['end_time'])
    return result


class UserReservations(Resource):
    def get(self,user_id):
        rows = database.query(
            '''SELECT vehicle_id,lot_id,start_time,end_time
                FROM reservation JOIN vehicle ON reservation.vehicle_id = vehicle.id
                WHERE user_id = ?
            ''',
            [user_id],
        )
        return [parse_reservation_row(row) for row in rows]
