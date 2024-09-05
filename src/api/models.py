from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderQuotaExceeded

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    address_line_1 = db.Column(db.String(255), nullable=True)
    address_line_2 = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    country = db.Column(db.String(50), default='United States')
    zip_code = db.Column(db.String(10), nullable=True)
    location = db.Column(db.String(255), nullable=True)  # Address from geolocation
    latitude = db.Column(db.Float, nullable=True)  # Latitude for geolocation
    longitude = db.Column(db.Float, nullable=True)  # Longitude for geolocation
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_token(self):
        return create_access_token(identity=self.id)
    
    def set_location_by_zip(self, zip_code):
        geolocator = Nominatim(user_agent="Plant_Sitter_Pro")
        try:
            location = geolocator.geocode(zip_code, country_codes='US')
            if location:
                self.zip_code = zip_code
                self.location = location.address
                self.latitude = location.latitude
                self.longitude = location.longitude
            else:
                raise ValueError("Could not find location for the provided zip code.")
        except (GeocoderTimedOut, GeocoderQuotaExceeded) as e:
            raise ValueError("Error occurred during geocoding request.") from e

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "address_line_1": self.address_line_1,
            "address_line_2": self.address_line_2,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "country": self.country,
            "location": self.location,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }


class PlantSitter(db.Model):
    __tablename__ = 'plant_sitters'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    profile_picture_url = db.Column(db.String(255), nullable=True)
    professional_experience = db.Column(db.Text, nullable=True)
    preferred_plants = db.Column(JSONB, nullable=True) 
    service_preferences = db.Column(JSONB, nullable=True)
    intro = db.Column(db.Text, nullable=True)
    current_plants = db.Column(db.Text, nullable=True)
    client_info = db.Column(db.Text, nullable=True)
    extra_info = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = db.relationship('User', backref=db.backref('plant_sitters', lazy=True))

    def __repr__(self):
        return f'<PlantSitter {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.user.first_name if self.user else None,
            "last_name": self.user.last_name if self.user else None,
            "profile_picture_url": self.profile_picture_url,
            "professional_experience": self.professional_experience,
            "preferred_plants": self.preferred_plants,
            "service_preferences": self.service_preferences,
            "intro": self.intro,
            "current_plants": self.current_plants,
            "client_info": self.client_info,
            "extra_info": self.extra_info,
            "location": self.user.location if self.user else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
    


class JobPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    details = db.Column(db.String(200), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_preferences = db.Column(JSONB, nullable=True)
    my_plants = db.Column(JSONB, nullable=True)
    status = db.Column(db.String(50), default='open', nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = db.relationship('User', backref=db.backref('job_posts', lazy=True))

    def __repr__(self):
        return f'<JobPost {self.title} by User {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "details": self.details,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "address": self.address,
            "user_id": self.user_id,
            "first_name": self.user.first_name if self.user else None,
            "last_name": self.user.last_name if self.user else None,
            "location": self.user.location if self.user else None,
            "service_preferences": self.service_preferences,
            "my_plants": self.my_plants, 
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
    

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sitter_id = db.Column(db.Integer, db.ForeignKey('plant_sitters.id'), nullable=False)
    rating_value = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    plant_sitter = db.relationship('PlantSitter', backref=db.backref('ratings', lazy=True))

    def __repr__(self):
        return f'<Rating {self.rating_value} for Sitter {self.sitter_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "sitter_id": self.sitter_id,
            "rating_value": self.rating_value,
            "review": self.review,
            "created_at": self.created_at.isoformat()
        }
    
    def set_rating(self, value):
        if 1 <= value <= 5:
            self.rating_value = value
        else:
            raise ValueError("Rating must be an integer between 1 and 5.")    


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message_content = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='unread')  # e.g., unread, read

    def __repr__(self):
        return f'<Message {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "message_content": self.message_content,
            "timestamp": self.timestamp.isoformat(),
            "status": self.status
        }