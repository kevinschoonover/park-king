#!/usr/bin/env python3

import time
import requests

vehicle_id = int(input('Vehicle ID: '))
lot_id = int(input('Lot ID: '))

requests.post(
    'http://localhost:5000/tickets/',
    json={
        'vehicle_id': vehicle_id,
        'lot_id': lot_id,
        'device_id': 1,
        'time': int(time.time()),
        'auth_token': 'DEADBEEF',
    },
)
