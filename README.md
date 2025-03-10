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

### Running with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/bettersg/FluentHands.git
   cd FluentHands
   ```

2. Start the application in development mode:
   ```bash
   docker-compose up
   ```

3. Access the application:
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

4. To stop the application:
   ```bash
   docker-compose down
   ```

## Development Setup

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