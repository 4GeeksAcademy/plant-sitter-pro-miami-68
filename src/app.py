"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
# from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template
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
# CORS(app, resources={r"/*": {"origins": "https://congenial-space-enigma-5gvj4px9wpg5c4949-3002.app.github.dev/"}})
# socketio = SocketIO(app, cors_allowed_origins="https://congenial-space-enigma-5gvj4px9wpg5c4949-3002.app.github.dev")
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

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

# socketio = SocketIO(app, cors_allowed_origins=os.getenv('FRONTEND_URL'), async_mode='threading')

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

@app.route('/')
def index():
    return "Chat Server is running!"

@socketio.on('connect')
def handle_connect():
    print('A user connected')

@socketio.on('send_message')
def handle_message(message):
    print('Received message:', message)
    
    # Default welcome message (for the first interaction)
    if message.lower() == 'hello' or message.lower() == 'hi':
        welcome_message = "Hello, my name is Leafy. How can I help you today?"
        socketio.emit('receive_message', welcome_message)
        return

    # Process the message to respond accordingly
    response = ""

    if 'provider' in message.lower():
        response = ("You can find a provider in your area by visiting the Providers page: "
                    "<a href='https://congenial-space-enigma-5gvj4px9wpg5c4949-3000.app.github.dev/client-map' target='_blank'>Providers page</a>. "
                    "Is there anything else I can help you with?")

    elif 'caretaker' in message.lower() or 'caregiver' in message.lower():
        response = ("Are you a plant caretaker looking to share your skills? You can sign up here: "
                    "<a href='https://congenial-space-enigma-5gvj4px9wpg5c4949-3000.app.github.dev/provider-map' target='_blank'>Sign up here</a>. "
                    "Is there anything else I can help you with?")

    elif 'about' in message.lower() or 'website' in message.lower():
        response = ("You can learn more about PlantSitter Pro by visiting the About page: "
                    "<a href='https://congenial-space-enigma-5gvj4px9wpg5c4949-3000.app.github.dev/how-it-works' target='_blank'>About page</a>. "
                    "Is there anything else I can help you with?")

    else:
        # If the message isn't recognized, offer some helpful options
        response = ("I'm sorry, I don't quite understand. Do you mean one of these:\n"
                    "1. Do you want to find a provider in your area?\n"
                    "2. Are you a plant caretaker looking to share your skills?\n"
                    "3. Do you want to read more about the PlantSitter Pro website?")
    
    # Send the response back to the user
    socketio.emit('receive_message', response)


@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected')
    
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
        PORT = int(os.getenv('PORT', 3002))
        socketio.run(app, host='0.0.0.0', port=PORT, debug=os.getenv('FLASK_DEBUG') == '1')