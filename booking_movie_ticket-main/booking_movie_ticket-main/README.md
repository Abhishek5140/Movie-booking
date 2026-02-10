# Movie Booking Application

A frontend-only Movie Booking Application built with ReactJS that simulates a complete movie ticket booking flow. All data is stored and managed using LocalStorage.

## Features

### 1. Authentication Module
- User Registration with validation
- Login with stored credentials
- Protected routes requiring authentication
- Session management using LocalStorage

### 2. Dashboard - Movie Listing
- Fetches movies from OMDB API
- Displays movie cards with poster, title, year, and type
- Filter by City
- Search by Movie Name
- Responsive grid layout

### 3. Cinema Hall Listing
- Shows available cinema halls in selected city
- Displays cinema name, location, and city
- Easy navigation to show times

### 4. Show Date & Time Selection
- Displays current date
- Shows available time slots
- Select show time for booking
- Complete booking summary

### 5. Booking Confirmation
- Success message display
- Complete booking details
- Stores booking in LocalStorage
- Option to book more tickets

## Technologies Used

- React 18
- React Router DOM for navigation
- Vite for build tooling
- LocalStorage for data persistence
- OMDB API for movie data

## Getting Started

The application is already built and ready to use.

## Project Structure

- `/src/pages` - All page components
- `/src/components` - Reusable components
- `/src/context` - Authentication context
- `/src/utils` - Utility functions and mock data
- `/src/assets` - Static assets

## Data Storage

All user data and bookings are stored in browser LocalStorage:
- Users credentials
- Current session
- Booking history

## API Integration

Movies are fetched from OMDB API:
- API URL: `https://www.omdbapi.com/`
- API Key: `d4540622`
