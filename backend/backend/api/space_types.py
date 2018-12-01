from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from backend import database


class SpaceTypeList(Resource):
    def get(self):
        rows = database.query('SELECT * FROM space_type')
        return [dict(row) for row in rows], 200
