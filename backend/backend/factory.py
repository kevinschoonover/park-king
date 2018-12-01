from flask import Flask

from . import database
db = database.get_db()


def create_app():
    app = Flask('park-king-backend')

    database.init_db(app)

    @app.route('/user/',method=['GET','POST'])
    def userAll():
      users = db.execute("SELECT  id,email,password from USER;")
      usersObj = []
      for user in users:
        id = user[0]
        email = user[1]
        password = user[2]
        userObj = '{"id":' + id  + '",email":' + email  + ',"password":' + password  + '}'
        usersObj.append(userObj)
      return usersObj

    @app.route('/user/<int:userid>',method=['GET','POST'])
    def userSpecific(userid):
      user = db.execute("SELECT email,password from USER WHERE USER.id = '$userid';")
      email = "example@mst.edu"
      password = "d2d"
      userObj = '{"id":'  + userid  + ',"email":' + email  + ',"password":' + password  + '}'
      return userObj

    @app.route('/vehicle/<int:vehicleid>',method=['GET','POST'])
    def vehicle(vehicleid):
      id = "0"
      user_id = "0"
      type_id = "0"
      state = "TX"
      license = "ZX23YSB"
      make = "Tesla"
      year = "2017"
      vehicleObj = '{"id":' + id  + ',"user_id":' + user_id  + ',"type_id":' + type_id  + ',"state":' + state  + ',"license":' + license  + ',"make":' + make  + ',"year":' + year  + '}'
      return vehicleObj

    @app.route('/reservation/<int:vehicleid>',method=['GET','POST'])
    def reservation(vehicleid):
      vehicle_id = "0"
      lot_id = "0"
      start_time = "6:00"
      end_time = "10:00"
      reservationObj = '{' + '"vehicle_id":' + vehicle_id  + ',"lot_id":' + lot_id  + ',"start_time":' + start_time  + ',"end_time":' + end_time  + '}'
      return reservationObj

    @app.route('/lot/<int:lotid>',method=['GET','POST'])
    def lot(lotid):
      lotObj = '{"id":' + '0' + ',"name":' + '"A"' + ',"location":' + '"west"' + '}'
      return lotObj

    @app.route('/vehicleType/<int:vehicleid>',method=['GET','POST'])
    def vehicleType(vehicleid):
      vehicleType  = '{"id":' + '0' + ',"name":' + '"sedan"' + '}'
      return vehicleType

    return app
