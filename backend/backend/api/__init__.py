from flask_restful import Api
from . import lots, space_types, users, vehicle_types, vehicles

api = Api()
api.add_resource(lots.LotList, '/lots/')
api.add_resource(lots.LotSingle, '/lots/<int:lot_id>/')
api.add_resource(lots.LotLocation, '/lots/<int:lot_id>/location/')
api.add_resource(lots.LotCapacity, '/lots/<int:lot_id>/capacity/')
api.add_resource(space_types.SpaceTypeList, '/space_types/')
api.add_resource(users.UserList, '/users/')
api.add_resource(users.UserSingle, '/users/<int:user_id>/')
api.add_resource(users.UserAuth, '/users/auth/')
api.add_resource(users.UserVehicles, '/users/<int:user_id>/vehicles/')
api.add_resource(users.UserTickets, '/users/<int:user_id>/tickets/')
api.add_resource(users.UserReservations, '/users/<int:user_id>/reservations/')
api.add_resource(vehicle_types.VehicleTypeList, '/vehicle_types/')
api.add_resource(vehicles.VehicleList, '/vehicles/')
api.add_resource(vehicles.VehicleSingle, '/vehicles/<int:vehicle_id>/')

def init_app(app):
    api.init_app(app)
