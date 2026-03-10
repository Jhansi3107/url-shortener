# URL Shortener (Like Bitly)

A fast, robust, and visually appealing URL shortener built with Node.js, Express, MongoDB, and vanilla CSS/JS.

## Features
- **Shorten URLs**: Convert long, unwieldy URLs into clean, manageable links.
- **Redirection**: Fast, reliable redirection to the original destination.
- **Click Tracking**: Tracks how many times a shortened URL has been accessed.
- **Premium UI**: Dark mode, glassmorphism design with sleek animations.

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on default port 27017

### Installation
1. Clone the repository or navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure MongoDB is running.
4. Start the server:
   ```bash
   node server.js
   ```
   Or for development (requires nodemon):
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5000`

## API Endpoints

- `POST /api/url/shorten`: Accepts a JSON payload `{ "longUrl": "..." }` and returns the shortened URL object.
- `GET /:code`: Redirects to the original long URL based on the provided short code.

## License
MIT
