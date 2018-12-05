from sqlite3 import IntegrityError

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from backend import database


class ReservationList(Resource):
    def get(self):
        rows = database.query(
            'SELECT vehicle_id,lot_id,start_time,end_time FROM reservation',
        )
        return [dict(row) for row in rows]

    def post(self):
        data = request.get_json()
        validate_exists(data, ['vehicle_id', 'lot_id', 'start_time', 'end_time'])
        try:
            database.query(
                '''INSERT INTO reservation
                    (vehicle_id, lot_id, start_time, end_time)
                    VALUES (?, ?, ?, ?)
                ''',
                [data['vehicle_id'], data['lot_id'], data['start_time'], data['end_time']],
            )
        except IntegrityError as e:
            abort(400, str(e))

        database.commit()
        row = database.query(
            'SELECT * FROM reservation WHERE rowid = last_insert_rowid()',
            single=True,
        )
        return dict(row), 201
