import itertools

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from backend import database


class VehicleList(Resource):
    def get(self):
        rows = database.query('SELECT * FROM vehicle')
        return [dict(row) for row in rows], 200


class VehicleSingle(Resource):
    def get(self, vehicle_id):
        row = database.query(
            'SELECT * FROM vehicle WHERE id = ?',
            [vehicle_id],
            single=True,
        )
        if row is None:
            abort(404)
        return dict(row)
