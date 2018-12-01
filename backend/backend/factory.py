from flask import Flask

from . import database


def create_app():
    app = Flask('park-king-backend')
    database.init_db(app)

    @app.route('/user/',methods=['GET'])
    def userAll():
      db = database.get_db()
      users = db.query("SELECT id,email,password from USER").row_factory
     # usersObj = []
     # for user in users:
       # id = user[0]
       # email = user[1]
       # password = user[2]
       # userObj = '{"id":' + id  + '",email":' + email  + ',"password":' + password  + '}'
       # usersObj.append(userObj)
      userObj = Flask.json.jsonify(users)
      return usersObj

    @app.route('/user/<int:userid>',methods=['GET'])
    def userSpecific(userid):
      db = database.get_db()
      user = db.query("SELECT email,password from user WHERE user.id = '$userid'").row_factory
      #email = user[0]
      #password = user[1]
      #userObj = '{"id":'  + userid  + ',"email":' + email  + ',"password":' + password  + '}'
      userObj = Flask.json.jsonify(user)
      return userObj

    @app.route('/vehicle/<int:vehicleid>',methods=['GET'])
    def vehicle(vehicleid):
      db = database.get_db()
      vehicle = db.query("SELECT user_id,type_id,state,license,make,model,year from vehicle WHERE vehicle.id = '$vehicleid'").row_factory
      #user_id = vehicle[0]
      #type_id = vehicle[1]
      #state = vehicle[2]
      #license = vehicle[3]
      #make = vehicle[4]
      #year = vehicle[5]
      #vehicleObj = '{"id":' + vehicleid  + ',"user_id":' + user_id  + ',"type_id":' + type_id  + ',"state":' + state  + ',"license":' + license  + ',"make":' + make  + ',"year":' + year  + '}'
      vehicleObj = Flask.json.jsonify(vehicle)
      return vehicleObj

    @app.route('/reservation/<int:vehicleid>',methods=['GET'])
    def reservation(vehicleid):
      db = database.get_db()
      reservation = db.query("SELECT lot_id,start_time,end_time from reservation WHERE reservation.vehicleid = '$vehicle_id'").row_factory
      #lot_id = reservation[0]
      #start_time = reservation[1]
      #end_time = reservation[2]
      #reservationObj = '{' + '"vehicle_id":' + vehicle_id  + ',"lot_id":' + lot_id  + ',"start_time":' + start_time  + ',"end_time":' + end_time  + '}'
      reservationObj = Flask.json.jsonify(reservation)
      return reservationObj

    @app.route('/lot/<int:lotid>',methods=['GET'])
    def lot(lotid):
      db = database.get_db()
      lot = db.query("SELECT name,location from lot WHERE lotid.id = '$lotid'").row_factory
      #name = lot[0]
      #location = lot[1]
      #lotObj = '{"id":' + lotid + ',"name":' + name  + ',"location":' + location  + '}'
      lotObj = Flask.json.jsonify(row_factory)
      return lotObj

    @app.route('/vehicleType/<int:vehicleid>',methods=['GET'])
    def vehicleType(vehicleid):
      db = database.get_db()
      vehicle = db.query("SELECT name from vehicletype WHERE vehicletype.id = '$vehicleid'").row_factory
      #name = vehicle[0]
      #vehicleType  = '{"id":' + vehicleid + ',"name":' + name  + '}'
      vehicletype = Flask.json.jsonify(row_factory)
      return vehicleType

    return app
