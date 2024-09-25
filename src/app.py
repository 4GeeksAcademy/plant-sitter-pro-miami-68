"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
# from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
# from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy 
# from api.routes import api
import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask_socketio import SocketIO





# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
# CORS(app)

# Allow CORS for all routes and origins
# CORS(app)
CORS(app, resources={r"/*": {"origins": "https://congenial-space-enigma-5gvj4px9wpg5c4949-3000.app.github.dev"}})
socketio = SocketIO(app, cors_allowed_origins="https://congenial-space-enigma-5gvj4px9wpg5c4949-3000.app.github.dev")

# Cloudinary Configuration
cloudinary.config( 
  cloud_name = "djak0ztdw", 
  api_key = "833786291381811", 
  api_secret = "-pyQkI-AMOQ9DogF6hkTdp3lUrs", 
  secure = True
)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
from api.routes import api 
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints

# db = SQLAlchemy(app)

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@socketio.on('connect')
def handle_connect():
    print('A user connected')

@socketio.on('send_message')
def handle_message(data):
    print(f"Message received: {data}")
    socketio.emit('receive_message', data)

@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected')


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
 with app.app_context():
    PORT = int(os.environ.get('PORT', 3001))
    socketio.run(host='0.0.0.0', port=PORT, debug=True)