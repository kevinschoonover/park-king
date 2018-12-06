from sqlite3 import IntegrityError

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists, iso2epoch, epoch2iso
from backend import database


def parse_row(row):
    result = dict(row)
    result['start_time'] = epoch2iso(result['start_time'])
    result['end_time'] = epoch2iso(result['end_time'])
    return result


class ReservationList(Resource):
    def get(self):
        rows = database.query(
            'SELECT vehicle_id,lot_id,start_time,end_time FROM reservation',
        )
        return [parse_row(row) for row in rows]

    def post(self):
        data = request.get_json()
        validate_exists(data, ['vehicle_id', 'lot_id', 'start_time', 'end_time'])
        # Manual reservation checks:
        try:
            database.query(
                '''INSERT INTO reservation
                    (vehicle_id, lot_id, start_time, end_time)
                    VALUES (?, ?, ?, ?)
                ''',
                [
                    data['vehicle_id'],
                    data['lot_id'],
                    iso2epoch(data['start_time']),
                    iso2epoch(data['end_time'])
                ],
            )
        except IntegrityError as e:
            abort(400, str(e))

        database.commit()
        row = database.query(
            'SELECT * FROM reservation WHERE rowid = last_insert_rowid()',
            single=True,
        )
        return parse_row(row), 201
