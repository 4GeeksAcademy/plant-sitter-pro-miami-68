from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderQuotaExceeded
from . import db 

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
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

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class ClientProfiles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    my_plants = db.Column(JSONB, nullable=True)
    service_preferences = db.Column(JSONB, nullable=True)
    zip_code = db.Column(db.String(10), nullable=True)
    location = db.Column(db.String(255), nullable=True)  # Address from geolocation
    latitude = db.Column(db.Float, nullable=True)  # Latitude for geolocation
    longitude = db.Column(db.Float, nullable=True)  # Longitude for geolocation
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = db.relationship('User', backref=db.backref('client_profiles', lazy=True))

    from . import db

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    plant_types = db.Column(db.String(120), nullable=True)
    allow_caretaker = db.Column(db.Boolean, nullable=False, default=False)
    address = db.Column(db.String(200), nullable=False)
    # location = db.Column(db.String(200), nullable=True)  # Optional, for storing coordinates


    def __repr__(self):
        return f'<ClientProfile {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "my_plants": self.my_plants,
            "service_preferences": self.service_preferences,
            "zip_code": self.zip_code,
            "location": self.location,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

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
            # Handle timeout or quota exceeded
            raise ValueError("Error occurred during geocoding request.") from e
        
