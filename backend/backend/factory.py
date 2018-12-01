from flask import Flask

from . import database

from flask import json

def create_app():
    app = Flask('park-king-backend')
    database.init_db(app)

    @app.route('/user/',methods=['GET'])
    def userAll():
      users = database.query("SELECT id,email,password from USER")
     # usersObj = []
     # for user in users:
       # id = user[0]
       # email = user[1]
       # password = user[2]
       # userObj = '{"id":' + id  + '",email":' + email  + ',"password":' + password  + '}'
       # usersObj.append(userObj)
      usersObj = json.jsonify(users)
      return usersObj

    @app.route('/user/<int:userid>',methods=['GET'])
    def userSpecific(userid):
      user = database.query(
          "SELECT email,password from user WHERE user.id = ?",
          [userid],
          single=True,
      )
      #email = user[0]
      #password = user[1]
      #userObj = '{"id":'  + userid  + ',"email":' + email  + ',"password":' + password  + '}'
      userObj = json.jsonify(user)
      return userObj

  def user_vehicles():
      pass

  def user_tickets():
      pass

  def user_reservations():
      pass

    @app.route('/vehicle/<int:vehicleid>',methods=['GET'])
    def vehicle(vehicleid):
      vehicle = database.query(
          "SELECT user_id,type_id,state,license,make,model,year from vehicle WHERE vehicle.id = ?",
          [vehicleid],
          single=True,
      )
      #user_id = vehicle[0]
      #type_id = vehicle[1]
      #state = vehicle[2]
      #license = vehicle[3]
      #make = vehicle[4]
      #year = vehicle[5]
      #vehicleObj = '{"id":' + vehicleid  + ',"user_id":' + user_id  + ',"type_id":' + type_id  + ',"state":' + state  + ',"license":' + license  + ',"make":' + make  + ',"year":' + year  + '}'
      vehicleObj = json.jsonify(vehicle)
      return vehicleObj

    @app.route('/reservation/<int:vehicleid>',methods=['GET'])
    def reservation(vehicleid):
      reservation = database.query(
          "SELECT lot_id,start_time,end_time from reservation WHERE reservation.vehicle_id = ?",
          [vehicleid],
      )
      #lot_id = reservation[0]
      #start_time = reservation[1]
      #end_time = reservation[2]
      #reservationObj = '{' + '"vehicle_id":' + vehicle_id  + ',"lot_id":' + lot_id  + ',"start_time":' + start_time  + ',"end_time":' + end_time  + '}'
      reservationObj = json.jsonify(reservation)
      return reservationObj

  def lots():
      pass

    @app.route('/lot/<int:lotid>',methods=['GET'])
    def lot(lotid):
      lot = database.query(
          "SELECT name from lot WHERE id = ?",
          [lotid],
          single=True,
      )
      #name = lot[0]
      #location = lot[1]
      #lotObj = '{"id":' + lotid + ',"name":' + name  + ',"location":' + location  + '}'
      lotObj = json.jsonify(lot)
      return lotObj

  def lot_spaces():

    @app.route('/vehicletype/<int:vehicleid>',methods=['GET'])
    def vehicleType(vehicleid):
      vehicle = database.query(
          "SELECT name from vehicle_type WHERE id = ?",
          [vehicleid],
          single=True,
      )
      #name = vehicle[0]
      #vehicleType  = '{"id":' + vehicleid + ',"name":' + name  + '}'
      vehicletype = json.jsonify(vehicle)
      return vehicleType

    return app

    def tickets():
        pass

    def ticket():
        pass
