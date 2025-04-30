# Travel AI Agent - Smart Travel Assistant

A comprehensive AI-powered travel planning solution that generates personalized itineraries by combining flight search, destination recommendations, and intelligent scheduling.

## 🌟 Overview

Travel AI Agent is a full-stack application built with React frontend and Python backend, integrated with AI models to deliver end-to-end travel planning. It simplifies trip organization by providing intelligent recommendations based on user preferences and optimizing travel routes.

## ✨ Key Features

### Basic Travel Information
- **Departure/Destination Selection**: Support for IATA airport codes or city names
- **Date Configuration**: Flexible travel duration planning with automatic calculations

### Flight Search & Selection
- **Multi-Airline Comparison**: Comprehensive flight options across carriers
- **Detailed Flight Information**: Times, airlines, flight numbers, and durations
- **Connection Management**: Clear layover and transit time details

### Preference-Based Planning
- **Activity Preferences**:
  - Natural landscapes (mountains, beaches, lakes)
  - Indoor attractions (museums, galleries)
  - Historical and cultural sites
  - Shopping destinations
  - Theme parks, zoos, and aquariums
  - Local and flea markets
  - Night views and photography spots
  - Family-friendly locations
- **Customization**: Space for special requirements and expectations

### Intelligent City Planning
- **Daily City Mapping**: Plan different cities for each travel day
- **Smart Recommendations**: AI-powered attraction, restaurant, and hotel suggestions
- **Preference Filtering**: Tailored recommendations based on selected interests
- **Flight Integration**: Schedules coordinated with flight timings

### AI-Powered Route Optimization
- **Smart Sequencing**: Optimized visiting order based on distance, hours, and preferences
- **Time Management**: Appropriate duration allocation for each location
- **Flight-Aware Scheduling**: Itineraries adjusted to accommodate flight times

### Comprehensive Itinerary Management
- **Detailed Daily Plans**: Activities with visit times and durations
- **Integrated Travel Details**: Consolidated flight and accommodation information
- **Visual Timeline**: Clear graphical representation of schedules

### Sharing & Synchronization
- **Image Export**: One-click conversion to shareable image format
- **Email Integration**: Direct sending to specified email addresses
- **Calendar Sync**: Google Calendar integration for reminders and management

## 🔧 Technical Architecture

### Frontend
- React-based interactive user interface
- Responsive design for multiple devices

### Backend
- Flask-based REST API service
- Integration with multiple external services:
  - Azure OpenAI / OpenAI for intelligent planning
  - Amadeus API for flight information
  - Google Maps API for location services
  - Email services for sharing capabilities

### Core Technologies
- **Real-Time Search**: Fast flight and location data retrieval
- **AI Recommendation Engine**: Intelligent preference-based suggestions
- **Maps Integration**: Location data and geographical optimization
- **Calendar Synchronization**: Schedule export and management

## 🚀 Setup & Requirements

### Prerequisites
- Python 3.10+
- Node.js and npm/yarn
- API access credentials:
  - Azure OpenAI / OpenAI
  - Amadeus
  - Google Maps
  - Google App (for email features)

### Environment Configuration
Create a `.env` file with the following variables:

```
# Azure OpenAI settings
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=your_deployment_name
AZURE_OPENAI_ENDPOINT=your_endpoint
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_API_VERSION=your_api_version

# Alternative: Standard OpenAI
OPENAI_KEY=your_openai_key

# Amadeus API settings
AMADEUS_API_KEY=your_amadeus_key
AMADEUS_API_SECRET=your_amadeus_secret

# Google Maps configuration
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Email configuration
GOOGLE_APP_ID=your_google_app_key
GOOGLE_PLANNER_MAIL=your_mail_sender
```

### Installation
1. Clone the repository
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application
- Backend:
  ```bash
  python main.py
  ```
  The API server will start on http://localhost:5000

- Frontend:
  ```bash
  cd frontend
  npm start
  ```
  The development server will start on http://localhost:3000

## 📡 API Endpoints

### Flight Search
- **POST** `/search_flights`
  - Search for available flights
  - Request body:
    ```json
    {
      "departure_city": "string",
      "destination_city": "string",
      "departureDate": "YYYY-MM-DD",
      "returnDate": "YYYY-MM-DD",
      "adults": integer,
      "children": integer,
      "infants": integer,
      "nonStop": "true/false",
      "currencyCode": "string"
    }
    ```

### Travel Planning
- **POST** `/plan_route`
  - Generate optimized travel itinerary
  - Request body: List of attractions with coordinates

### Email Service
- **POST** `/send_mail`
  - Send travel plans via email
  - Parameters:
    - email: Recipient email address
    - image: Base64 encoded image

### Health Check
- **GET** `/health`
  - Check service health status

## 🧭 User Flow

1. Enter basic travel details (departure, destination, dates)
2. Select preferred flights from options
3. Configure activity preferences and special requirements
4. Map out cities for each day of travel
5. Review and adjust AI-generated itinerary
6. Share or export final travel plan

## 🔮 Future Enhancements

- Advanced flight filtering (adults, infants, direct flights)
- Must-visit attraction designation
- Multi-language support
- Budget management and tracking
- Real-time weather integration
- Local transportation recommendations
- Restaurant booking capabilities

## 📁 Project Structure

```
.
├── frontend/               # React application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
│
├── backend/
│   ├── main.py             # Flask application entry point
│   ├── main_agent.py       # Core service implementations
│   ├── plugins/
│   │   ├── amadeus_plugin.py    # Amadeus API integration
│   │   ├── google_map_plugin.py # Google Maps API integration
│   │   └── google_mail_plugin.py # Gmail API integration
│   ├── templates/          # HTML templates
│   └── requirements.txt    # Python dependencies
│
└── README.md               # Project documentation
```

## 📜 License

MIT License

---

Travel AI Agent - Making travel planning smarter, faster, and more personalized.