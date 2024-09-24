"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, PlantSitter, JobPost, Rating, Message, JobAssignment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
import cloudinary
import cloudinary.uploader
import cloudinary.api
# from flask_mail import Message
from api.models import db, User
from flask import current_app as app
from flask import jsonify
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from api.send_email import send_email
import os
from api.utils import generate_sitemap, APIException
from datetime import timedelta
from .send_email import send_email
from api.decodetoken import decode_token, decode_reset_token
from geopy.distance import geodesic
import stripe
from datetime import datetime, timezone


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
        return jsonify({"message": "If your email is associated with an account, you will receive a password reset email."}), 200

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


@api.route('/plant_sitter/<int:id>', methods=['GET'])
@jwt_required()
def get_plant_sitter_by_id(id):
    plant_sitter = PlantSitter.query.get(id)

    if not plant_sitter:
        return jsonify({"error": "Plant sitter not found"}), 404

    return jsonify(plant_sitter.serialize()), 200


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
    


@api.route('/search-sitters', methods=['POST'])
def search_sitters():
    data = request.get_json()
    user_zip_code = data.get("zip_code")
    
    if not user_zip_code:
        return jsonify({"success": False, "message": "ZIP code is required"}), 400

    user = User.query.filter_by(zip_code=user_zip_code).first()
    if not user or not user.latitude or not user.longitude:
        return jsonify({"success": False, "message": "Invalid ZIP code"}), 400

    user_location = (user.latitude, user.longitude)
    radius_miles = 15

    sitters_within_radius = []
    sitters = PlantSitter.query.all()

    for sitter in sitters:
        if sitter.user.latitude and sitter.user.longitude:
            sitter_location = (sitter.user.latitude, sitter.user.longitude)
            distance = geodesic(user_location, sitter_location).miles
            if distance <= radius_miles:
                sitters_within_radius.append(sitter)

    return jsonify({"success": True, "data": [sitter.serialize() for sitter in sitters_within_radius]})
    


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



@api.route('/job_posts/<int:job_post_id>', methods=['PUT'])
@jwt_required()
def update_job_post(job_post_id):
    data = request.form
    user_id = get_jwt_identity()

    job_post = JobPost.query.filter_by(id=job_post_id, user_id=user_id).first()
    if not job_post:
        return jsonify({"error": "Job post not found"}), 404

    profile_picture_base64 = data.get('profile_picture')
    if profile_picture_base64:
        try:
            upload_result = cloudinary.uploader.upload(profile_picture_base64, folder="job_posts_profiles")
            job_post.profile_picture_url = upload_result['secure_url']
        except Exception as e:
            return jsonify({"error": f"Image upload failed: {str(e)}"}), 500

    job_post.address_line_1 = data.get('address_line_1', job_post.address_line_1)
    job_post.address_line_2 = data.get('address_line_2', job_post.address_line_2)
    job_post.city = data.get('city', job_post.city)
    job_post.state = data.get('state', job_post.state)
    job_post.country = data.get('country', job_post.country)
    job_post.zip_code = data.get('zip_code', job_post.zip_code)
    job_post.start_date = data.get('start_date', job_post.start_date)
    job_post.end_date = data.get('end_date', job_post.end_date)
    job_post.service_preferences = data.get('service_preferences', job_post.service_preferences)
    job_post.my_plants = data.get('my_plants', job_post.my_plants)
    job_post.intro = data.get('intro', job_post.intro)
    job_post.more_about_your_plants = data.get('more_about_plants', job_post.more_about_your_plants)
    job_post.more_about_services = data.get('more_about_services', job_post.more_about_services)
    job_post.job_duration = data.get('job_duration', job_post.job_duration)

    new_zip_code = data.get('zip_code')
    if new_zip_code and new_zip_code != job_post.zip_code:
        try:
            job_post.set_location_by_zip(new_zip_code)
        except ValueError as geolocation_error:
            return jsonify({"error": f"Geolocation failed: {str(geolocation_error)}"}), 400

    try:
        db.session.commit()
        return jsonify(job_post.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
        


@api.route('/job_posts', methods=['GET'])
@jwt_required()
def get_job_posts():
    job_posts = JobPost.query.all()
    return jsonify([post.serialize() for post in job_posts]), 200


@api.route('/job_posts/user', methods=['GET'])
@jwt_required()
def get_user_job_posts():
    user_id = get_jwt_identity()
    job_posts = JobPost.query.filter_by(user_id=user_id).all()

    if not job_posts:
        return jsonify({"message": "No job posts found"}), 404

    return jsonify([post.serialize() for post in job_posts]), 200


@api.route('/job_posts_with_token/<int:job_post_id>', methods=['GET'])
@jwt_required()
def get_job_post(job_post_id):
    user_id = get_jwt_identity()
    job_post = JobPost.query.filter_by(id=job_post_id, user_id=user_id).first()
    if not job_post:
        return jsonify({"error": "Job post not found"}), 404
    return jsonify(job_post.serialize()), 200


@api.route('/job_posts/<int:job_post_id>', methods=['GET'])
def get_job_post_public(job_post_id):
    job_post = JobPost.query.filter_by(id=job_post_id).first()
    if not job_post:
        return jsonify({"error": "Job post not found"}), 404

    job_post_data = {
        "id": job_post.id,
        "user_id": job_post.user_id,
        "start_date": job_post.start_date.isoformat(),
        "end_date": job_post.end_date.isoformat(),
        "city": job_post.city,
        "state": job_post.state,
        "zip_code": job_post.zip_code,
        "country": job_post.country,
        "location": job_post.location,
        "latitude": job_post.latitude,
        "longitude": job_post.longitude,
        "first_name": job_post.user.first_name if job_post.user else None,
        "last_name": job_post.user.last_name if job_post.user else None,
        "profile_picture_url": job_post.profile_picture_url,
        "service_preferences": job_post.service_preferences,
        "my_plants": job_post.my_plants, 
        "intro": job_post.intro,
        "more_about_your_plants": job_post.more_about_your_plants,
        "more_about_services": job_post.more_about_services,
        "job_duration": job_post.job_duration,
        "status": job_post.status,
    }

    return jsonify(job_post_data), 200


@api.route('/search-job-posts', methods=['POST'])
def search_job_posts():
    data = request.get_json()
    zip_code = data.get("zip_code")
    distance = data.get("distance")
    
    user = User.query.filter_by(zip_code=zip_code).first()
    if not user or not user.latitude or not user.longitude:
        return jsonify({"success": False, "message": "Invalid ZIP code"}), 400

    user_location = (user.latitude, user.longitude)
    radius_miles = float(distance)

    job_posts_within_radius = []
    job_posts = JobPost.query.all()

    for post in job_posts:
        if post.latitude and post.longitude:
            post_location = (post.latitude, post.longitude)
            distance = geodesic(user_location, post_location).miles
            if distance <= radius_miles:
                job_posts_within_radius.append(post)

    return jsonify({"success": True, "data": [post.serialize() for post in job_posts_within_radius]})




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




#---------------------for Stripe payments and payouts

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@api.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.get_json()
        intent = stripe.PaymentIntent.create(
            amount=data['amount'],  # amount in cents
            currency='usd',
            metadata={'integration_check': 'accept_a_payment'},
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

@api.route('/payout', methods=['POST'])
@jwt_required() 
def create_payout():
    try:
        data = request.get_json()

        # Create a transfer to the connected account
        payout = stripe.Payout.create(
            amount=data['amount'],  # amount in cents
            currency='usd',
            stripe_account=data['providerId']  # Stripe Account ID of the provider
        )

        return jsonify({
            'success': True,
            'payoutId': payout.id
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 403

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



#--------------------JobAssaingment endpoints


#apply for a jobpost as a plantsitter
@api.route('/jobs/<int:job_post_id>/accept', methods=['POST'])
@jwt_required()
def accept_job(job_post_id):
    plantsitter_id = get_jwt_identity()

    job_post = JobPost.query.get(job_post_id)
    if not job_post or job_post.status != 'open':
        return jsonify({"error": "Job is either closed or does not exist"}), 404

    # Create a new JobAssignment
    new_assignment = JobAssignment(
        job_post_id=job_post_id,
        plantsitter_id=plantsitter_id,
        status='accepted'
    )

    job_post.status = 'accepted'
    db.session.add(new_assignment)
    db.session.commit()

    return jsonify(new_assignment.serialize()), 200



#Jobs applied (plantsitter)
@api.route('/user/applied-jobs', methods=['GET'])
@jwt_required()
def get_applied_jobs():
    plant_sitter_id = get_jwt_identity()

    job_assignments = JobAssignment.query.filter_by(plantsitter_id=plant_sitter_id, status='accepted').all()

    if not job_assignments:
        return jsonify({"message": "No applied jobs found."}), 404

    return jsonify([job.serialize() for job in job_assignments]), 200


#Check assigment
@api.route('/job_posts/<int:job_post_id>/check_assignment', methods=['GET'])
@jwt_required()
def check_assignment(job_post_id):
    user_id = get_jwt_identity()

    plant_sitter = PlantSitter.query.filter_by(user_id=user_id).first()

    if not plant_sitter:
        return jsonify({"applied": False, "error": "User is not a plant sitter"}), 404

    job_assignment = JobAssignment.query.filter_by(job_post_id=job_post_id, plantsitter_id=plant_sitter.id).first()

    if job_assignment:
        return jsonify({"applied": True, "status": job_assignment.status}), 200
    else:
        return jsonify({"applied": False}), 200
    


# Fetch applicants for a specific job post
@api.route('/jobs/<int:job_post_id>/applicants', methods=['GET'])
@jwt_required()
def get_job_applicants(job_post_id):
    user_id = get_jwt_identity()

    job_post = JobPost.query.filter_by(id=job_post_id, user_id=user_id).first()
    if not job_post:
        return jsonify({"error": "You are not authorized to view applicants for this job."}), 403

    job_assignments = JobAssignment.query.filter_by(job_post_id=job_post_id).all()

    if not job_assignments:
        return jsonify({"message": "No applicants found."}), 404

    return jsonify([assignment.serialize() for assignment in job_assignments]), 200



# Endpoint to update the status of a job assignment
@api.route('/job_posts/<int:assignment_id>/update-status', methods=['POST'])
@jwt_required()
def update_assignment_status(assignment_id):
    user_id = get_jwt_identity()
    
    assignment = JobAssignment.query.get(assignment_id)
    
    if assignment.job_post.user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.get_json()
    new_status = data.get("status")

    if new_status not in ['accepted', 'rejected']:
        return jsonify({"error": "Invalid status"}), 400
    
    assignment.status = new_status
    db.session.commit()

    return jsonify({"message": f"Assignment {new_status} successfully"}), 200
    






#--------------- JOB COMPLETED USER(CLIENT)

@api.route('/user/completed-jobs', methods=['GET'])
@jwt_required()
def get_user_completed_jobs():
    user_id = get_jwt_identity()

    # Get all jobs posted by the user that are completed
    completed_jobs = JobAssignment.query.join(JobPost).filter(
        JobPost.user_id == user_id,
        JobAssignment.status == 'completed'
    ).all()

    if not completed_jobs:
        return jsonify({"message": "No completed jobs found"}), 404

    # Serialize the completed jobs to return to the user
    return jsonify([job.serialize() for job in completed_jobs]), 200


#--------------- JOB IN PROGRESS USER(CLIENT)
@api.route('/user/jobs-in-progress', methods=['GET'])
@jwt_required()
def get_user_jobs_in_progress():
    user_id = get_jwt_identity()

    # Get all jobs posted by the user that are accepted or in progress
    job_assignments = JobAssignment.query.join(JobPost).filter(
        JobPost.user_id == user_id,
        JobAssignment.status.in_(['accepted', 'in progress'])
    ).all()

    if not job_assignments:
        return jsonify({"message": "No jobs in progress"}), 404

    # Serialize the results to return to the user
    return jsonify([assignment.serialize() for assignment in job_assignments]), 200


#----------------------Job in Progress route PLANT SITTER
@api.route('/jobs/<int:job_post_id>/start', methods=['POST'])
@jwt_required()
def start_job(job_post_id):
    plantsitter_id = get_jwt_identity()

    assignment = JobAssignment.query.filter_by(job_post_id=job_post_id, plantsitter_id=plantsitter_id).first()
    if not assignment:
        return jsonify({"error": "No job found for the current Plant Sitter"}), 404

    assignment.status = 'in progress'
    db.session.commit()

    return jsonify(assignment.serialize()), 200


#--------------------- Completed Jobs PLANT SITTER
@api.route('/jobs/<int:job_post_id>/complete', methods=['POST'])
@jwt_required()
def complete_job(job_post_id):
    plantsitter_id = get_jwt_identity()

    assignment = JobAssignment.query.filter_by(job_post_id=job_post_id, plantsitter_id=plantsitter_id).first()
    if not assignment:
        return jsonify({"error": "No job found for the current Plant Sitter"}), 404

    assignment.status = 'completed'
    assignment.completed_at = datetime.now(timezone.utc)
    db.session.commit()

    # Notify the User via email that the job is completed
    job_post = assignment.job_post
    user = job_post.user
    send_email(user.email, f"The job for {job_post.intro} has been completed.", "Job Completed")

    return jsonify(assignment.serialize()), 200