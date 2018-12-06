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
        vehicle_id = data['vehicle_id']
        lot_id = data['lot_id']
        start_time = iso2epoch(data['start_time'])
        end_time = iso2epoch(data['end_time'])

        # Manual reservation checks:
        # (Unfortunately too complicated to be a CHECK constraint)
        lot = database.query(
            'SELECT * FROM lot WHERE id = ?',
            [lot_id],
            single=True,
        )
        if lot is None:
            abort(400, 'No such lot')
        capacity = lot['capacity']

        overlaps = database.query(
            '''SELECT * FROM reservation
                WHERE lot_id = ?
                AND ? <= end_time
                AND start_time <= ?
            ''',
            [lot_id, start_time, end_time],
        )

        duration = end_time - start_time
        if duration <= 0:
            abort(400, 'Start time must come before end time')

        secs = [0] * duration
        for reservation in overlaps:
            if reservation['vehicle_id'] == vehicle_id:
                abort(400, 'Vehicle already reserved during this time')

            for i in range(reservation['start_time'], reservation['end_time'] + 1):
                secs[i - start_time] += 1

        for sec in secs:
            if sec >= capacity:
                abort(400, 'Lot is already at full capacity during this time')
        
        # Checks passed:
        try:
            database.query(
                '''INSERT INTO reservation
                    (vehicle_id, lot_id, start_time, end_time)
                    VALUES (?, ?, ?, ?)
                ''',
                [
                    vehicle_id,
                    lot_id,
                    start_time,
                    end_time,
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
