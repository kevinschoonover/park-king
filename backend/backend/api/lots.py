import itertools
from math import ceil
import time

from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists, iso2epoch, epoch2iso
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


class LotBusyness(Resource):
    def get(self, lot_id):
        start = request.args.get('start', int(time.time()), type=iso2epoch)
        duration = request.args.get('duration', 86400, type=int)
        window = request.args.get('window', 3600, type=int)
        end = start + duration

        rows = database.query('SELECT * FROM reservation''')

        data = [0] * ceil(duration / window)
        for row in rows:
            row_start = row['start_time']
            row_end = row['end_time']
            # Unfortunately this check's WHERE clause equivalent is broken:
            # (WHERE ? BETWEEN start_time AND end_time OR ? BETWEEN start_time AND end_time)
            if not ((row_start >= start and row_start <= end)
                    or (row_end >= start and row_end <= end)):
                continue
            range_start = (max(row_start, start) - start) // window
            range_end = ceil((min(row_end, end) - start) / window)
            for i in range(range_start, range_end):
                data[i] += 1
        
        return data
