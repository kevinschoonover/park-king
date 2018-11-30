from flask import Flask



def create_app():
    app = Flask('park-king-backend')

    return app

    @app.route('/user')
    def user():
      userObj = '{"id":0,"email":"example@mst.edu","password":"d2#2df@1ffkjb@"}'
      return userObj

    @app.route('/vehicle')
    def vehicle():
      vehicleObj = '{"id":0,"user_id":0,"type_id":0,"state":"TX","license":"ZX23YSB","make":"Tesla","year":"2017}'
      return vehicleObj

    @app.route('/reservation')
    def reservation():
      reservationObj = '{"vehicle_id":0,"lot_id":0,"start_time":"6:00","end_time":"10:00"}'
      return reservationObj

    @app.route('/lot')
    def lot():
      lotObj = '{"id":0,"name":"A","location":"west"}'
      return lotObj

    @app.route('/vehicleType')
    def vehicleType():
      vehicleType  = '{"id":0,"name":"sedan"}'
      return vehicleType
