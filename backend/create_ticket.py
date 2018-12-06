#!/usr/bin/env python3

import requests
from datetime import datetime, timezone

vehicles = requests.get('http://localhost/vehicles/').json()
vehicles.sort(key=lambda x: x['id'])
for vehicle in vehicles:
    print('{}: {} {} {} ({})'.format(
        vehicle['id'],
        vehicle['year'],
        vehicle['make'],
        vehicle['model'],
        vehicle['license'],
    ))

vehicle_id = int(input('Vehicle ID: '))

lots = requests.get('http://localhost/lots/').json()
lots.sort(key=lambda x: x['id'])
for lot in lots:
    print('{}: {}'.format(lot['id'], lot['name']))

lot_id = int(input('Lot ID: '))

print(datetime.now())

data = {
    'vehicle_id': vehicle_id,
    'lot_id': lot_id,
    'device_id': 1,
    'time': datetime.now(tz=timezone.utc).isoformat(),
    'auth_token': 'DEADBEEF',
}

r = requests.post('http://localhost/tickets/', json=data)
