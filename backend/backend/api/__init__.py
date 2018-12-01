from flask_restful import Api
from . import users

api = Api()
api.add_resource(users.UserList, '/users/')
api.add_resource(users.UserSingle, '/users/<int:user_id>/')

def init_app(app):
    api.init_app(app)
