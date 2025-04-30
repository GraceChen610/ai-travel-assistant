# Travel AI Agent – Smart Travel Assistant

This is an intelligent assistant application that provides travel planning and itinerary management, leveraging artificial intelligence to help users quickly generate personalized travel plans.

## Project Overview

Travel AI Agent is a web application built with React, backed by a Python backend and AI models. It aims to simplify the travel planning process by integrating flight search, destination recommendations, itinerary scheduling, and travel management into a complete end-to-end travel solution.

## Key Features

### 1. Basic Information Input

- **Departure and Destination Selection**: Supports IATA airport codes (e.g., LAX for Los Angeles International Airport) or city names
- **Travel Date Configuration**: Allows users to select single or multiple travel days; the system will automatically calculate total trip duration

### 2. Flight Search and Selection

- **Compare Multiple Airlines**: Search and display flight options from various airlines
- **Detailed Flight Information**: Includes departure/arrival times, airline, flight number, and duration
- **Supports Connecting Flights**: Displays layover information and transit time details

### 3. Travel Preferences

- **Activity Preferences**: Users can choose from a variety of preferences, including:
  - Natural landscapes (mountains, lakes, beaches)
  - Indoor attractions (museums, art galleries, exhibitions)
  - Historical and cultural sites (monuments, temples)
  - Shopping (department stores, outlets, shopping streets)
  - Theme parks / Zoos / Aquariums
  - Local markets / Flea markets
  - Night views / Night photography spots
  - Family-friendly attractions
- **Additional Notes**: Users may add special needs or expectations that the AI will consider in planning

### 4. Mapping and City Planning

- **Daily City Planning**: Input different cities for each day of the trip
- **Search and Recommendations**: Search and recommend attractions, restaurants, and hotels in each city
- **Preference-Based Filtering**: Filter recommendations based on selected preferences
- **Flight Integration**: Incorporate flight arrival and departure times into daily plans

### 5. AI Route Planning

- **Smart Sorting**: AI arranges the visiting order by considering distance, opening hours, and user preferences
- **Time Optimization**: AI sets appropriate durations for each stop to avoid overly tight or loose schedules
- **Flight-Based Adjustments**: Itineraries are optimized according to flight arrival and departure times

### 6. Itinerary Generation and Management

- **Full Itinerary Display**: Includes daily activities, visit times, and duration; click addresses to navigate directly
- **Flight and Accommodation Integration**: Shows relevant flight and lodging details in the itinerary
- **Visual Timeline**: Uses a visual timeline to clearly present daily schedules

### 7. Sharing and Syncing Features

- **Download Itinerary as Image**: Convert itinerary to an image file with one click
- **Send via Email**: Send itineraries to a designated email address
- **Google Calendar Sync**: Sync travel plans directly to Google Calendar for easier reminders and management  
  (\*As this is a development project, email sending requires account authorization. Please contact us with your email to receive access.)

## Technical Highlights

- **Real-Time Search**: Fast access to flight and place information
- **AI Recommendation Algorithm**: Intelligent itinerary suggestions based on user preferences and trip duration
- **Google Maps Integration**: Retrieves location and geographic data via Google Maps API
- **Google Calendar Sync**: Allows itinerary synchronization with user calendars

## User Flow

1. Enter basic travel details (departure, destination, date)
2. Select preferred flights
3. Set preferences and activity types
4. Input cities for each day and generate recommended routes
5. Review AI-generated itinerary
6. Download or share the plan via email or Google Calendar

## Future Plans

- Expand flight options to include number of adults, infants, and direct flight preferences
- Allow specifying must-visit attractions
- Add multi-language support
- Integrate budget management features
- Include real-time weather forecasts
- Suggest local transportation methods
- Enhance restaurant recommendations and booking features

---

With Travel AI Agent, travel planning becomes smarter and more efficient, delivering a fully personalized travel experience.
