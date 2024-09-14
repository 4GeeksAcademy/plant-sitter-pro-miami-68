# decode_token.py
from flask_jwt_extended import decode_token
from flask import jsonify

   
def decode_reset_token(token):
    """
    Decodes the JWT token to retrieve the user identity (user id).

    :param token: The JWT token to decode.
    :return: Returns the user ID if the token is valid, else returns an error message.
    """
    try:
        # Decode the JWT token
        decoded_token = decode_token(token)
        # Extract the user identity ('sub' field contains the user ID)
        user_id = decoded_token.get('sub')
        
        if not user_id:
            raise ValueError("Token does not contain a valid user identity")

        return user_id
    except Exception as e:
        # Handle invalid or expired token
        return jsonify({"error": f"Invalid or expired token: {str(e)}"}), 400