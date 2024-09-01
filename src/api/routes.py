"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, ClientProfiles, PlantSitter, JobPost, Rating, Message
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
import cloudinary
import cloudinary.uploader
import cloudinary.api

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
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    address_line_1 = data.get('address_line_1')
    address_line_2 = data.get('address_line_2')
    city = data.get('city')
    state = data.get('state')
    country = data.get('country', 'United States')
    zip_code = data.get('zip_code')

    if not email or not password or not phone or not first_name or not last_name:
        return jsonify({"error": "Email, password, phone, first name, and last name are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    if User.query.filter_by(phone=phone).first():
        return jsonify({"error": "Phone number already registered"}), 400

    try:
        new_user = User(
            email=email,
            phone=phone,
            first_name=first_name,
            last_name=last_name,
            address_line_1=address_line_1,
            address_line_2=address_line_2,
            city=city,
            state=state,
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
   

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200


@api.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    data = request.get_json()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.address_line_1 = data.get('address_line_1', user.address_line_1)
    user.address_line_2 = data.get('address_line_2', user.address_line_2)
    user.city = data.get('city', user.city)
    user.state = data.get('state', user.state)
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
    

@api.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
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
    
    profile_picture_base64 = data.get('profile_picture')
    profile_picture_url = None
    if profile_picture_base64:
        try:
            upload_result = cloudinary.uploader.upload(profile_picture_base64, folder="plant_sitter_profiles")
            profile_picture_url = upload_result['secure_url']
        except Exception as e:
            return jsonify({"error": f"Image upload failed: {str(e)}"}), 500

    professional_experience = data.get('professional_experience')
    preferred_plants = data.get('preferred_plants')
    service_preferences = data.get('service_preferences')
    intro = data.get('intro')
    current_plants = data.get('current_plants')
    client_info = data.get('client_info')
    extra_info = data.get('extra_info')

    try:
        new_sitter = PlantSitter(
            user_id=user_id,
            profile_picture_url=profile_picture_url,
            professional_experience=professional_experience,
            preferred_plants=preferred_plants,
            service_preferences=service_preferences,
            intro=intro,
            current_plants=current_plants,
            client_info=client_info,
            extra_info=extra_info
        )
        db.session.add(new_sitter)
        db.session.commit()
        return jsonify(new_sitter.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

@api.route('/plant_sitter', methods=['PUT'])
@jwt_required()
def update_plant_sitter():
    user_id = get_jwt_identity()
    data = request.get_json()

    plant_sitter = PlantSitter.query.filter_by(user_id=user_id).first()

    if not plant_sitter:
        return jsonify({"error": "Plant sitter not found"}), 404

    plant_sitter.professional_experience = data.get('professional_experience', plant_sitter.professional_experience)
    plant_sitter.preferred_plants = data.get('preferred_plants', plant_sitter.preferred_plants)
    plant_sitter.service_preferences = data.get('service_preferences', plant_sitter.service_preferences)
    plant_sitter.intro = data.get('intro', plant_sitter.intro)
    plant_sitter.current_plants = data.get('current_plants', plant_sitter.current_plants)
    plant_sitter.client_info = data.get('client_info', plant_sitter.client_info)
    plant_sitter.extra_info = data.get('extra_info', plant_sitter.extra_info)

    profile_picture_base64 = data.get('profile_picture')
    if profile_picture_base64:
        try:
            upload_result = cloudinary.uploader.upload(profile_picture_base64, folder="plant_sitter_profiles")
            plant_sitter.profile_picture_url = upload_result['secure_url']
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    try:
        db.session.commit()
        return jsonify({"message": "Plant sitter updated successfully", "plant_sitter": plant_sitter.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/plant_sitter', methods=['GET'])
@jwt_required()
def get_plant_sitter_by_user():
    user_id = get_jwt_identity()
    plant_sitter = PlantSitter.query.filter_by(user_id=user_id).first()
    if not plant_sitter:
        return jsonify({"error": "Plant sitter not found"}), 404
    return jsonify(plant_sitter.serialize()), 200


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





# ---------------------------endpoints for messeages--------------------------------------

@api.route('/messages/send', methods=['POST'])
@jwt_required()
def send_message():
    data = request.get_json()
    if not data or 'receiver_id' not in data or 'message_content' not in data:
        return jsonify({'message': 'Missing data'}), 400

    try:
        user_id = get_jwt_identity()
        new_message = Message(
            sender_id=user_id,
            receiver_id=data['receiver_id'],
            message_content=data['message_content']
        )
        db.session.add(new_message)
        db.session.commit()
        return jsonify(new_message.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error sending message', 'error': str(e)}), 500

@api.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    try:
        user_id = get_jwt_identity()
        client_id = request.args.get('client_id')

        if client_id:
            messages = Message.query.filter_by(sender_id=user_id, receiver_id=client_id).all()
        else:
            messages = Message.query.filter(
                (Message.sender_id == user_id) | (Message.receiver_id == user_id)
            ).all()

        return jsonify([message.serialize() for message in messages]), 200
    except Exception as e:
        return jsonify({'message': 'Error retrieving messages', 'error': str(e)}), 500

@api.route('/messages/send', methods=['POST'])
def handle_message():
    data = request.json
    user_message = data.get('message', '').lower()
    if 'hello' in user_message:
        return jsonify({'message': 'Hello! How can I assist you today?'})
    return jsonify({'message': 'Sorry, I did not understand that.'})