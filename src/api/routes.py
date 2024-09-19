"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, PlantSitter, JobPost, Rating, Message
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask_mail import Message
from api.models import db, User
from flask import current_app as app
from flask import jsonify
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
# from utils import generate_verification_token
from api.send_email import send_email
import os
from api.utils import generate_sitemap, APIException
from datetime import timedelta
from .send_email import send_email
from api.decodetoken import decode_token, decode_reset_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



#---------------------refresh token endpoint

@api.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token}), 200




#---------------------endpoints for Users

@api.route('/signup', methods=['POST'])
# Function to send the verification email
# def send_verification_email(user_email, token):
#     verify_url = f"{app.config['FRONTEND_URL']}/verify/{token}"
#     msg = Message(
#         'Verify Your Email',
#         sender='noreply@example.com',
#         recipients=[user_email]
#     )
#     msg.body = f'Please click the link to verify your email: {verify_url}'
#     mail.send(msg)

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
        # Create new user
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
            is_verified=False,
        )
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        # Set location if zip code is provided
        if zip_code:
            new_user.set_location_by_zip(zip_code)

        # Commit the changes to the database
        db.session.add(new_user)
        db.session.commit()

        # Generate a JWT access token for email verification (expires in 10 minutes)
        access_token = create_access_token(identity=new_user.id, expires_delta=timedelta(minutes=10))

        # Prepare the verification email with the access token
        verification_link = f"{os.getenv('FRONTEND_URL')}/verification?token={access_token}"
        email_body = f"Please verify your account by clicking the link: {verification_link}"
        
        # Send the verification email
        send_email(new_user.email, email_body, "Verification Email for Plant Sitter")

        # Return a successful response
        return jsonify({
            "message": "User registered successfully. Please check your email for verification.",
            "access_token": access_token
        }), 201

    except Exception as e:
        db.session.rollback()  # Rollback the transaction in case of any error
        return jsonify({"error": str(e)}), 400

#reset password feature
@api.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')

    try:
        # Decode the JWT token to get the user ID
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']  # The 'sub' field contains the user identity
    except Exception as e:
        return jsonify({"error": "Invalid or expired token"}), 400

    # Fetch the user using the decoded user ID
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Set the new password and commit the change
    try:
        user.set_password(new_password)
        db.session.commit()
        return jsonify({"message": "Password has been reset successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to reset password: {str(e)}"}), 500


#forgot password feature

@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error": "If your email is associated with an account, you will receive a password reset email."}), 200
    
    # Create a token with an expiration time, e.g., 10 minutes
    token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=10))
    
    reset_link = f"{os.getenv('FRONTEND_URL')}/enternewpassword?token={token}"
    email_body = f"Click here to reset your password: {reset_link}"
    send_email(user.email, email_body, "Password Reset Request")
    
    return jsonify({"message": "If your email is associated with an account, you will receive a password reset email."}), 200

@api.route('/verify', methods=['GET'])
def verify_email():
    token=request.args.get("token")
    print("something",token) 

    try:
        # Decode the token to get the user ID
        decoded_token = decode_token(token)
        user_id = decoded_token['sub']  # The 'sub' field contains the user ID

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if user is already verified
        if user.is_verified:
            return jsonify({"message": "Account is already verified"}), 200

        # Set the user as verified
        user.is_verified = True
        db.session.commit()

        return jsonify({"message": "Your account has been verified successfully."}), 200

    except Exception as e:
        return jsonify({"error": f"Verification failed: {str(e)}"}), 400

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
    user_id = get_jwt_identity()  # Get user ID from the JWT token
    data = request.get_json()  # Get JSON data from the request
    user = User.query.get(user_id)  # Retrieve the user from the database

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update user details (email, phone, first name, last name, etc.)
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

    # Handle password update
    current_password = data.get('current_password')  # Get the current password from the request
    new_password = data.get('new_password')  # Get the new password from the request

    if current_password and new_password:
        # Check if the current password is correct
        if not user.check_password(current_password):
            return jsonify({"error": "Current password is incorrect"}), 400
        # Set the new password
        user.set_password(new_password)

    try:
        db.session.commit()  # Save all changes to the database
        return jsonify({"message": "User updated successfully", "user": user.serialize()}), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
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
    


#----------------------------endpoints for JobPost---------------------------------------

@api.route('/job_posts', methods=['POST'])
@jwt_required()
def create_job_post():
    data = request.form
    user_id = get_jwt_identity()
    
    profile_picture_base64 = data.get('profile_picture')
    profile_picture_url = None
    if profile_picture_base64:
        try:
            upload_result = cloudinary.uploader.upload(profile_picture_base64, folder="job_posts_profiles")
            profile_picture_url = upload_result['secure_url']
        except Exception as e:
            return jsonify({"error": f"Image upload failed: {str(e)}"}), 500

    address_line_1 = data.get('address_line_1')
    address_line_2 = data.get('address_line_2')
    city = data.get('city')
    state = data.get('state')
    country = data.get('country', 'United States')
    zip_code = data.get('zip_code')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    service_preferences = data.get('service_preferences')
    my_plants = data.get('my_plants')
    intro = data.get('intro')
    more_about_plants = data.get('more_about_plants')
    more_about_services = data.get('more_about_services')
    job_duration = data.get('job_duration')

    try:
        new_job_post = JobPost(
            user_id=user_id,
            profile_picture_url=profile_picture_url,
            start_date=start_date,
            end_date=end_date,
            address_line_1=address_line_1,
            address_line_2=address_line_2,
            city=city,
            state=state,
            country=country,
            zip_code=zip_code,
            service_preferences=service_preferences,
            my_plants=my_plants,
            intro=intro,
            more_about_your_plants=more_about_plants,
            more_about_services=more_about_services,
            job_duration=job_duration
        )

        if zip_code:
            new_job_post.set_location_by_zip(zip_code)
        db.session.add(new_job_post)
        db.session.commit()
        return jsonify(new_job_post.serialize()), 201

    except ValueError as geolocation_error:
        return jsonify({"error": f"Geolocation failed: {str(geolocation_error)}"}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
        

@api.route('/job_posts', methods=['GET'])
@jwt_required()
def get_job_posts():
    job_posts = JobPost.query.all()
    return jsonify([post.serialize() for post in job_posts]), 200


@api.route('/job_posts/<int:job_post_id>', methods=['GET'])
@jwt_required()
def get_job_post(job_post_id):
    user_id = get_jwt_identity()
    job_post = JobPost.query.filter_by(id=job_post_id, user_id=user_id).first()
    if not job_post:
        return jsonify({"error": "Job post not found"}), 404
    return jsonify(job_post.serialize()), 200




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


#--------------------------Ratings

@api.route('/plantsitters/<int:plantsitter_id>/ratings', methods=['POST'])
@jwt_required()
def submit_rating(plantsitter_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    score = data.get('score')
    comment = data.get('comment', '')

    if not score or not (1 <= score <= 5):
        return jsonify({'msg': 'Score must be an integer between 1 and 5'}), 400

    # Check if the PlantSitter exists
    plantsitter = User.query.get(plantsitter_id)
    if not plantsitter:
        return jsonify({'msg': 'PlantSitter not found'}), 404

    # Create a new rating
    rating = Rating(
        plantsitter_id=plantsitter_id,
        user_id=user_id,
        score=score,
        comment=comment
    )

    db.session.add(rating)
    db.session.commit()

    return jsonify({'msg': 'Rating submitted successfully'}), 201


@api.route('/plantsitters/<int:plantsitter_id>/ratings', methods=['GET'])
def get_ratings(plantsitter_id):
    ratings = Rating.query.filter_by(plantsitter_id=plantsitter_id).all()
    serialized_ratings = [rating.serialize() for rating in ratings]

    # Calculate average score
    if ratings:
        average_score = sum(r.score for r in ratings) / len(ratings)
    else:
        average_score = None

    return jsonify({
        'ratings': serialized_ratings,
        'average_score': average_score
    }), 200
