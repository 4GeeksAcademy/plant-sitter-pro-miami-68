from flask import Blueprint, jsonify, request
from .models import db, User, Conversation, Message

dmessaging = Blueprint('messaging', __name__)


@dmessaging.route('/conversations', methods=['GET'])
def get_conversations():
    user_id = request.args.get('user_id') 
    conversations = Conversation.query.filter(
        (Conversation.user1_id == user_id) | (Conversation.user2_id == user_id)
    ).all()

    conversation_data = []
    for conversation in conversations:
        user1 = User.query.get(conversation.user1_id)
        user2 = User.query.get(conversation.user2_id)
        conversation_data.append({
            'id': conversation.id,
            'user1': user1.name,
            'user2': user2.name
        })

    return jsonify(conversation_data)



@dmessaging.route('/messages/<int:conversation_id>', methods=['GET'])
def get_messages(conversation_id):
    messages = Message.query.filter_by(conversation_id=conversation_id).order_by(Message.created_at).all()

    message_data = []
    for message in messages:
        sender = User.query.get(message.sender_id)
        message_data.append({
            'id': message.id,
            'sender': sender.name,
            'text': message.text,
            'created_at': message.created_at
        })

    return jsonify(message_data)


@dmessaging.route('/messages', methods=['POST'])
def send_message():
    data = request.json
    new_message = Message(
        conversation_id=data['conversationId'],
        sender_id=data['senderId'],
        text=data['text']
    )
    db.session.add(new_message)
    db.session.commit()

    return jsonify({
        'id': new_message.id,
        'conversation_id': new_message.conversation_id,
        'sender_id': new_message.sender_id,
        'text': new_message.text,
        'created_at': new_message.created_at
    }), 201
