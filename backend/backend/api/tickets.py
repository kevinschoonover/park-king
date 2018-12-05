from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from backend import database


class listTickets(Resource):
    def get(self):
        rows = database.query('SELECT * FROM ticket')
        return [dict(row) for row in rows],200

class ticketByVehicle(Resource):
    def get(self, vehicle_id):
        row = database.query(
            'SELECT * FROM tickets WHERE id = ?',
            [vehicle_id],
            single=True,
        )
        if row is None:
            abort(404)
        return dict(row)
    def post(self,vehicle_id):
        data = request.get_json()
        validate_exists(data,[device_id,lot_id,time])
        try:
            database.query(
                'INSERT INTO ticket (device_id,vehicle_id,lot_id,time) VALUES (?,?,?,?)',
                [data['device'],vehicle_id,data['lot'],data['timeOfTicket']],
            )
            except IntegrityError as e:
                abort(400,str(e))

        row = database.query(
            'SELECT * FROM ticket WHERE id = last_insert_rowid()',
            single=True
        )
        return dict(row), 201
