import itertools

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from backend import database


class LotList(Resource):
    def get(self):
        rows = database.query('SELECT * FROM lot')
        return [dict(row) for row in rows], 200


class LotSingle(Resource):
    def get(self, lot_id):
        row = database.query(
            'SELECT * FROM lot WHERE id = ?',
            [lot_id],
            single=True,
        )
        if row is None:
            abort(404)
        return dict(row)

class LotLocation(Resource):
    def get(self, lot_id):
        rows = database.query(
            'SELECT * FROM lot_location WHERE lot_id = ?',
            [lot_id],
        )

        # Pre-parsing into a lookup table:
        polygons = {}
        for row in rows:
            poly = polygons.setdefault(row['polygon_id'], {})
            poly[row['vertex_id']] = [row['latitude'], row['longitude']]

        # Build into lists
        result = []
        for poly in polygons.values():
            poly_list = []
            for i in itertools.count(start=1):
                if i not in poly:
                    break
                poly_list.append(poly[i])
            result.append(poly_list)

        return result

