from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Add a test route to verify the server is working
@app.route('/', methods=['GET'])
def home():
    return "Server is running!"

@app.route('/api/verify-phone', methods=['POST'])
def verify_phone():
    try:
        data = request.json
        print("Received data:", data)  # Debug print
        phone_number = data.get('phone_number')
        verification_id = data.get('verification_id')

        return jsonify({
            'success': True,
            'user': {
                'phone_number': phone_number,
                'user_id': 'generated_user_id',
            },
            'token': 'your_auth_token'
        })

    except Exception as e:
        print("Error:", str(e))  # Debug print
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    # Make the server accessible from other devices on the network
    app.run(host='0.0.0.0', port=5000, debug=True) 