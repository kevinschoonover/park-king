from flask import abort, make_response, request
from flask_restful import Resource

from backend.util import validate_exists
from  backend import database

class lotsForUser(Resource):
  def get(self,id):
    rows = database.query('SELECT * FROM ticket JOIN vehicle WHERE vehicle.user_id = "$id"')
    return [dict(row) for row in rows], 200
