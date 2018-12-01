from setuptools import setup, find_packages

setup(
    name='park-king-backend',
    packages=[
        'backend'
    ],
    install_requires=[
        'flask',
        'flask-cors',
        'flask_restful',
    ],
)
