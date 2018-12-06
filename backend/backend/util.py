from datetime import datetime, timezone

import dateutil.parser
from flask import abort

def validate_exists(d, keys):
    missing = [key for key in keys if key not in d]
    if missing:
        abort(400, 'Some keys not provided: {}'.format(missing))


def epoch2iso(t):
    return datetime.fromtimestamp(t, timezone.utc).isoformat()


def iso2epoch(t):
    return int(dateutil.parser.parse(t).timestamp())
