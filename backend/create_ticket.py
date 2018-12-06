#!/usr/bin/env python3

import json
import requests
from datetime import datetime


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)


vehicle_id = int(input('Vehicle ID: '))
lot_id = int(input('Lot ID: '))
print(datetime.now())
data = {
    'vehicle_id': vehicle_id,
    'lot_id': lot_id,
    'device_id': 1,
    'time': datetime.utcnow(),
    'auth_token': 'DEADBEEF',
}

r = requests.post(
    'http://localhost/tickets/',
    data=json.dumps(data, cls=DateTimeEncoder),
    headers={'Content-type': 'application/json'}
)
