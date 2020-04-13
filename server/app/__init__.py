import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from whitenoise import WhiteNoise

app = Flask(__name__, template_folder="static")
# app = Flask(__name__.split('.')[0], static_folder='../client/build/static', template_folder="../client/build")

app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')

app.config.from_object(os.environ['APP_SETTINGS'])

login = LoginManager(app)
login.login_view = 'login'

db = SQLAlchemy(app)

from app.models import User, Post
from app import routes
