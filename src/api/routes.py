"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, ClientProfiles, PlantSitter, JobPost, Rating
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
    phone = data.get('phone')
    address_line_1 = data.get('address_line_1')
    address_line_2 = data.get('address_line_2')
    city = data.get('city')
    country = data.get('country', 'United States')
    zip_code = data.get('zip_code')

    if not email or not password or not phone:
        return jsonify({"error": "Email, password, and phone are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    if User.query.filter_by(phone=phone).first():
        return jsonify({"error": "Phone number already registered"}), 400

    try:
        new_user = User(
            email=email,
            phone=phone,
            address_line_1=address_line_1,
            address_line_2=address_line_2,
            city=city,
            country=country,
            zip_code=zip_code,
        )
        new_user.set_password(password)

        if zip_code:
            new_user.set_location_by_zip(zip_code)

        db.session.add(new_user)
        db.session.commit()
        access_token = new_user.generate_token()
        return jsonify({
            "message": "User registered successfully",
            "access_token": access_token
        }), 201
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
    

@api.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.address_line_1 = data.get('address_line_1', user.address_line_1)
    user.address_line_2 = data.get('address_line_2', user.address_line_2)
    user.city = data.get('city', user.city)
    user.zip_code = data.get('zip_code', user.zip_code)
    user.country = data.get('country', user.country)

    if 'password' in data:
        user.set_password(data['password'])

    try:
        db.session.commit()
        return jsonify({"message": "User updated successfully", "user": user.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@api.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400






    

#---------------------endpoints for Plantsitter--------------------


@api.route('/plant_sitters', methods=['POST'])
@jwt_required()
def create_plant_sitter():
    data = request.get_json()
    user_id = get_jwt_identity()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    profile_picture_url = data.get('profile_picture_url')
    bio = data.get('bio')
    professional_experience = data.get('professional_experience')
    additional_info = data.get('additional_info')
    preferred_plants = data.get('preferred_plants')
    service_preferences = data.get('service_preferences')

    if not all([first_name, last_name]):
        return jsonify({"error": "First name and last name are required"}), 400

    try:
        new_sitter = PlantSitter(
            user_id=user_id,
            first_name=first_name,
            last_name=last_name,
            profile_picture_url=profile_picture_url,
            bio=bio,
            professional_experience=professional_experience,
            additional_info=additional_info,
            preferred_plants=preferred_plants,
            service_preferences=service_preferences
        )
        db.session.add(new_sitter)
        db.session.commit()
        return jsonify(new_sitter.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@api.route('/plant_sitter/<int:id>', methods=['PUT'])
@jwt_required()
def update_plant_sitter(id):
    data = request.get_json()
    plant_sitter = PlantSitter.query.get(id)

    if not plant_sitter:
        return jsonify({"error": "Plant sitter not found"}), 404

    plant_sitter.first_name = data.get('first_name', plant_sitter.first_name)
    plant_sitter.last_name = data.get('last_name', plant_sitter.last_name)
    plant_sitter.profile_picture_url = data.get('profile_picture_url', plant_sitter.profile_picture_url)
    plant_sitter.bio = data.get('bio', plant_sitter.bio)
    plant_sitter.professional_experience = data.get('professional_experience', plant_sitter.professional_experience)
    plant_sitter.additional_info = data.get('additional_info', plant_sitter.additional_info)
    plant_sitter.preferred_plants = data.get('preferred_plants', plant_sitter.preferred_plants)
    plant_sitter.service_preferences = data.get('service_preferences', plant_sitter.service_preferences)

    try:
        db.session.commit()
        return jsonify({"message": "Plant sitter updated successfully", "plant_sitter": plant_sitter.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

    
@api.route('/plant_sitter/<int:id>', methods=['GET'])
@jwt_required()
def get_plant_sitter(id):
    plant_sitter = PlantSitter.query.get(id)

    if not plant_sitter:
        return jsonify({"error": "Plant sitter not found"}), 404

    return jsonify({"plant_sitter": plant_sitter.serialize()}), 200


@api.route('/plant_sitters', methods=['GET'])
@jwt_required()
def get_all_plant_sitters():
    plant_sitters = PlantSitter.query.all()
    return jsonify({"plant_sitters": [s.serialize() for s in plant_sitters]}), 200


@api.route('/plant_sitter/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_plant_sitter(id):
    plant_sitter = PlantSitter.query.get(id)

    if not plant_sitter:
        return jsonify({"error": "Plant sitter not found"}), 404

    try:
        db.session.delete(plant_sitter)
        db.session.commit()
        return jsonify({"message": "Plant sitter deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    







# #---------------------endpoints for ClientProfiles--------------------

# @api.route('/client_profiles', methods=['POST'])
# @jwt_required()
# def create_client_profile():
#     user_id = get_jwt_identity()
#     data = request.get_json()
    
#     zip_code = data.get('zip_code')
#     if not zip_code:
#         return jsonify({"error": "Zip code is required"}), 400

#     try:
#         new_profile = ClientProfiles(user_id=user_id, **data)
#         new_profile.set_location_by_zip(zip_code)
#         db.session.add(new_profile)
#         db.session.commit()
        
#         return jsonify(new_profile.serialize()), 201
#     except ValueError as ve:
#         return jsonify({"error": str(ve)}), 400
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400


# @api.route('/client_profiles/<int:id>', methods=['PUT'])
# @jwt_required()
# def update_client_profile(id):
#     user_id = get_jwt_identity()
#     profile = ClientProfiles.query.filter_by(id=id, user_id=user_id).first()

#     if not profile:
#         return jsonify({"error": "Profile not found"}), 404

#     data = request.get_json()
#     zip_code = data.get('zip_code')
#     my_plants = data.get('my_plants')
#     service_preferences = data.get('service_preferences')

#     try:
#         if zip_code:
#             profile.set_location_by_zip(zip_code)
#         if my_plants is not None:
#             profile.my_plants = my_plants
#         if service_preferences:
#             profile.service_preferences = service_preferences

#         db.session.commit()
#         return jsonify({"message": "Profile updated successfully", "profile": profile.serialize()}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400
    

# @api.route('/client_profiles/<int:id>', methods=['GET'])
# @jwt_required()
# def get_client_profile(id):
#     user_id = get_jwt_identity()
#     profile = ClientProfiles.query.filter_by(id=id, user_id=user_id).first()
#     if not profile:
#         return jsonify({"error": "Profile not found"}), 404
#     return jsonify(profile.serialize()), 200


# @api.route('/client_profiles/<int:id>', methods=['DELETE'])
# @jwt_required()
# def delete_client_profile(id):
#     user_id = get_jwt_identity()
#     profile = ClientProfiles.query.filter_by(id=id, user_id=user_id).first()
#     if not profile:
#         return jsonify({"error": "Profile not found"}), 404
#     try:
#         db.session.delete(profile)
#         db.session.commit()
#         return jsonify({"message": "Profile deleted"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400
    








# --------endpoints for jobposts--------------

# @api.route('/job_posts', methods=['POST'])
# @jwt_required()
# def create_job_post():
#     user_id = get_jwt_identity()
#     data = request.get_json()
#     try:
#         new_job = JobPost(user_id=user_id, **data)
#         db.session.add(new_job)
#         db.session.commit()
        
#         return jsonify(new_job.serialize()), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400


# @api.route('/job_posts/<int:id>', methods=['PUT'])
# @jwt_required()
# def update_job_post(id):
#     user_id = get_jwt_identity()
#     job_post = JobPost.query.filter_by(id=id, user_id=user_id).first()

#     if not job_post:
#         return jsonify({"error": "Job post not found"}), 404

#     data = request.get_json()

#     try:
#         job_post.title = data.get('title', job_post.title)
#         job_post.details = data.get('details', job_post.details)
#         job_post.start_date = data.get('start_date', job_post.start_date)
#         job_post.end_date = data.get('end_date', job_post.end_date)
#         job_post.rate = data.get('rate', job_post.rate)
#         job_post.address = data.get('address', job_post.address)
#         job_post.status = data.get('status', job_post.status)

#         db.session.commit()
#         return jsonify({"message": "Job post updated successfully", "job_post": job_post.serialize()}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400


# @api.route('/job_posts/<int:id>', methods=['GET'])
# @jwt_required()
# def get_job_post(id):
#     job_post = JobPost.query.get_or_404(id)
#     return jsonify(job_post.serialize()), 200


# @api.route('/job_posts/<int:id>', methods=['DELETE'])
# @jwt_required()
# def delete_job_post(id):
#     job_post = JobPost.query.get_or_404(id)
#     try:
#         db.session.delete(job_post)
#         db.session.commit()
#         return jsonify({"message": "Job post deleted"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400