"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, ClientProfiles
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#---------------------endpoints for Users

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    try:
        new_user = User(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = user.generate_token()
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


#---------------------endpoints for ClientProfiles--------------------

@api.route('/client_profiles', methods=['POST'])
@jwt_required()
def create_client_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    zip_code = data.get('zip_code')
    if not zip_code:
        return jsonify({"error": "Zip code is required"}), 400

    try:
        new_profile = ClientProfiles(user_id=user_id, **data)
        new_profile.set_location_by_zip(zip_code)
        db.session.add(new_profile)
        db.session.commit()
        
        return jsonify(new_profile.serialize()), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@api.route('/client_profiles/<int:id>', methods=['PUT'])
@jwt_required()
def update_client_profile(id):
    user_id = get_jwt_identity()
    profile = ClientProfiles.query.filter_by(id=id, user_id=user_id).first()

    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    data = request.get_json()
    zip_code = data.get('zip_code')
    my_plants = data.get('my_plants')
    service_preferences = data.get('service_preferences')

    try:
        if zip_code:
            profile.set_location_by_zip(zip_code)
        if my_plants is not None:
            profile.my_plants = my_plants
        if service_preferences:
            profile.service_preferences = service_preferences

        db.session.commit()
        return jsonify({"message": "Profile updated successfully", "profile": profile.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

@api.route('/client_profiles/<int:id>', methods=['GET'])
@jwt_required()
def get_client_profile(id):
    user_id = get_jwt_identity()
    profile = ClientProfiles.query.filter_by(id=id, user_id=user_id).first()
    if not profile:
        return jsonify({"error": "Profile not found"}), 404
    return jsonify(profile.serialize()), 200


@api.route('/client_profiles/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_client_profile(id):
    user_id = get_jwt_identity()
    profile = ClientProfiles.query.filter_by(id=id, user_id=user_id).first()
    if not profile:
        return jsonify({"error": "Profile not found"}), 404
    try:
        db.session.delete(profile)
        db.session.commit()
        return jsonify({"message": "Profile deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
