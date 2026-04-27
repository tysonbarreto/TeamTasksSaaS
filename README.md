# Team Tasks Backend

A backend service for a SaaS team task management application. This project provides RESTful APIs for managing teams, users, and tasks with authentication and authorization.

## Overview

This is the backend MVP for a team task management SaaS. The frontend will be developed in the following week after completing the backend.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **Logging**: Pino
- **API Documentation**: Swagger/OpenAPI
- **Development Tools**: Nodemon, TypeScript, Prettier

## Features

- User authentication and authorization
- Team management
- Task creation, assignment, and tracking
- RESTful API endpoints
- CORS support
- Cookie-based sessions
- Comprehensive logging

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd team-tasks-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if available) or create a `.env` file
   - Configure the following variables:
     - `PORT`: Server port (default: 3000)
     - `MONGODB_URI`: MongoDB connection string
     - `JWT_SECRET`: Secret key for JWT tokens
     - Other environment-specific settings

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Development**: `npm run dev` (uses nodemon for auto-restart)
- **Build**: `npm run build` (compiles TypeScript to JavaScript)
- **Production**: `npm start` (runs the built application)

## API Documentation

API documentation is available via Swagger UI at `http://localhost:3000/api-docs` when the server is running.

## Project Structure

- `src/app.ts`: Main Express application setup
- `src/server.ts`: Server entry point
- `src/config/`: Configuration files
- `src/infrastructure/`: Database and external service connections
- `src/middleware/`: Express middleware
- `src/modules/`: Feature modules (e.g., auth, tasks, teams)
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (if available)
5. Submit a pull request

## License

ISC