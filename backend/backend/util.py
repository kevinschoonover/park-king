from flask import abort

def validate_exists(d, keys):
    missing = [key for key in keys if key not in d]
    if missing:
        abort(400, 'Some keys not provided: {}'.format(missing))
