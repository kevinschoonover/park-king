from sqlite3 import IntegrityError

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists, iso2epoch, epoch2iso
from backend import database


def parse_row(row):
    result = dict(row)
    result['time'] = epoch2iso(result['time'])
    return result


class TicketList(Resource):
    def get(self):
        rows = database.query('SELECT * FROM ticket')

        return [parse_row(row) for row in rows], 200

    def post(self):
        data = request.get_json()
        validate_exists(data, ['vehicle_id', 'lot_id', 'device_id', 'time', 'auth_token'])
        device = database.query(
            'SELECT auth_token FROM ticket_device WHERE id = ?',
            [data['device_id']],
            single=True,
        )
        if device['auth_token'] != data['auth_token']:
            abort(401, 'Invalid ticket device authorization')

        try:
            database.query(
                '''INSERT INTO ticket (vehicle_id, lot_id, device_id, time)
                    VALUES (?, ?, ?, ?)
                ''',
                [
                    data['vehicle_id'],
                    data['lot_id'],
                    data['device_id'],
                    iso2epoch(data['time']),
                ],
            )
        except IntegrityError as e:
            abort(400, str(e))

        database.commit()
        row = database.query(
            'SELECT * FROM ticket WHERE rowid = last_insert_rowid()',
            single=True,
        )
        return parse_row(row), 201
