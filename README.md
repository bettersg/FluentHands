# FluentHands - Interactive Sign Language Learning App

FluentHands is a web application designed to help users learn sign language through interactive exercises and games. The application uses webcam input and machine learning to detect hand gestures and provide real-time feedback.

## Features

- Real-time sign language recognition
- Interactive learning exercises
- Quiz mode to test your knowledge
- Games to practice spelling words in sign language
- Visual feedback with hand landmark detection

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- Webcam (built-in or external)

### Running the App

Clone the repository:
   ```bash
   git clone https://github.com/bettersg/FluentHands.git
   cd FluentHands
   ```

The application can be run in either development or production mode using Docker.

#### Development Mode
Use this mode during development. Changes to your code will be immediately reflected without restarting Docker:

```bash
# Build and start the development server
docker compose -f docker-compose.dev.yml up --build

# To run in background
docker compose -f docker-compose.dev.yml up -d --build

# To stop 
docker compose -f docker-compose.dev.yml down
```

Access the application at [http://localhost:5173](http://localhost:5173)

#### Production Mode
Use this mode to build a production version of the website and test it as a static server:

```bash
# Build and start the production server
docker compose up --build

# To run in background
docker compose up -d --build

# To stop
docker compose down
```

Access the application at [http://localhost:5173](http://localhost:5173)

>**Note:** When running in production mode, the compiled build files will be available in the `build/` directory. Any changes made to your code will require re-running the Docker command to see the updates.

### Troubleshooting Docker Setup

If you experience issues with the Docker setup:

- Make sure ports 5173 isn't already in use on your machine
- The production setup copies the build files to your local machine, making them available in the `build/` directory
- In development mode, your local files are mounted into the container, allowing for hot-reloading

## Development Setup (without Docker)

If you prefer to run the application without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Access the application at [http://localhost:5173](http://localhost:5173)

## Technology Stack

- React
- Vite
- MediaPipe for hand landmark detection
- ONNX Runtime for machine learning model inference 
- Docker for containerization

## Webcam Access

The application requires webcam access to function properly. When prompted by your browser, please allow camera permissions.