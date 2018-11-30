from flask import Flask

def create_app():
    app = Flask('park-king-backend')

    @app.route('/user/')
    def userAll():
      id = "0"
      email = "example@mst.edu"
      password = "d2@#(djbg2(WOWn("
      userObj = '{"id":' + id  + '",email":' + email  + ',"password":' + password  + '}'
      return userObj

    @app.route('/user/<int:userid>')
    def userSpecific(userid):
      id = "0"
      email = "example@mst.edu"
      password = "d2d"
      userObj = '{"id":'  + id  + ',"email":' + email  + ',"password":' + password  + '}'
      return userObj

    @app.route('/vehicle/')
    def vehicle():
      id = "0"
      user_id = "0"
      type_id = "0"
      state = "TX"
      license = "ZX23YSB"
      make = "Tesla"
      year = "2017"
      vehicleObj = '{"id":' + id  + ',"user_id":' + user_id  + ',"type_id":' + type_id  + ',"state":' + state  + ',"license":' + license  + ',"make":' + make  + ',"year":' + year  + '}'
      return vehicleObj

    @app.route('/reservation/')
    def reservation():
      vehicle_id = "0"
      lot_id = "0"
      start_time = "6:00"
      end_time = "10:00"
      reservationObj = '{' + '"vehicle_id":' + vehicle_id  + ',"lot_id":' + lot_id  + ',"start_time":' + start_time  + ',"end_time":' + end_time  + '}'
      return reservationObj

    @app.route('/lot/')
    def lot():
      lotObj = '{"id":' + '0' + ',"name":' + '"A"' + ',"location":' + '"west"' + '}'
      return lotObj

    @app.route('/vehicleType/')
    def vehicleType():
      vehicleType  = '{"id":' + '0' + ',"name":' + '"sedan"' + '}'
      return vehicleType

    return app
