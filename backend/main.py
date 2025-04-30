from flask import Flask, request, jsonify, render_template, send_file
import asyncio
from main_agent import FlightSearchService,TravelService,MailService
from datetime import datetime
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import base64
from io import BytesIO
from datetime import datetime
from PIL import Image

app = Flask(__name__)
CORS(app)  # Add this line after creating the Flask app
flight_service = FlightSearchService()
travel_service = TravelService()

# Initialize services
mail_service = MailService()



# Set the storage location for uploaded files.
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists.
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/mail')
def mail_page():
    return render_template('mail_service.html')

@app.route('/send_mail', methods=['POST'])
def send_mail():
    try:
        image_base64 = request.form.get("image")
        email = request.form.get("email")

        if not image_base64 or not email:
            return jsonify({
                'success': False,
                'error': 'Missing image or email in request'
            }), 400

        # Decode base64 image
        image_data = base64.b64decode(image_base64.split(',')[1])
        image = Image.open(BytesIO(image_data))

        # Save image with timestamp filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"image_{timestamp}.png"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        image.save(filepath)

        # Call mail service
        result = asyncio.run(mail_service.send_mail(email, filename))

        # Clean up
        os.remove(filepath)

        return jsonify(result)

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/')
def index():
    return render_template('test_search_flight.html')

@app.route('/travel')
def travel():
    return render_template('travel_service.html')

@app.route('/plan_route', methods=['POST'])
def plan_route():
    try:
        attractions = request.get_json()
        if not attractions:
            return jsonify({'error': 'No attractions provided'}), 400
        print(f"API POST {attractions}")
        # Use asyncio to run the async function
        if 'data' not in attractions or not attractions['data']:
            return jsonify({'error': 'Empty attractions data array'}), 400
        result = asyncio.run(travel_service.plan_route_attraction(attractions))
        
        return jsonify(result)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/search_flights', methods=['POST', 'GET'])
def search_flights():
    try:
        data = request.get_json()
        
        # Validate the request data.
        required_fields = ['departure_city', 'destination_city', 'departureDate', 'adults']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        print(f"API POST {data}")
        # Use asyncio to run asynchronous functions.
        if 'returnDate' in data and str(data['returnDate']).lower() != 'none':
            result = asyncio.run(flight_service.search_flights(
                departure=data['departure_city'],
                destination=data['destination_city'],
                departureDate=data['departureDate'],
                returnDate=data.get('returnDate', None),
                adults=data['adults'],
                children=data.get('children', 0),
                infants=data.get('infants', 0),
                nonStop=data.get('nonStop', 'false'),
                currencyCode=data.get('currencyCode', 'USD')
            ))
        else:
            result = asyncio.run(flight_service.search_flights(
                departure=data['departure_city'],
                destination=data['destination_city'],
                departureDate=data['departureDate'],
                returnDate=None,
                adults=data['adults'],
                children=data.get('children', 0),
                infants=data.get('infants', 0),
                nonStop=data.get('nonStop', 'false'),
                currencyCode=data.get('currencyCode', 'USD')
            ))  
        print(f"{result}\n\n\n\n\n")
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500




if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)