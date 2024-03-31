# Repos API

The Repos API is a RESTful service that allows users to manage repositories. It provides endpoints for user registration, authentication, and CRUD operations on repositories.

## Features

- **User Registration**: Users can register an account.
- **User Login**: Registered users can log in to their account.
- **Retrieve Repositories**: Users can retrieve a list of repositories.
- **Add Favorite Repositories**: Users can add repositories to their favorites.
- **Retrieve Favorite Repositories**: Users can retrieve their favorite repositories.
- **Delete Favorite Repositories**: Users can remove repositories from their favorites.
- **Authentication**: Endpoints are protected with JWT authentication.
- **Authorization**: Users can only access and manipulate their own repositories and favorites.
- **Validation**: Input data is validated to ensure consistency and integrity.
- **Error Handling**: Comprehensive error handling for graceful failure responses.
- **Documentation**: Detailed API documentation for easy integration.

## Prerequisites

Before running this application, ensure you have Node.js and npm installed on your system. Additionally, you need a MongoDB instance running. You can install MongoDB locally or use a cloud-hosted MongoDB service.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/repos-api.git
    ```

2. Install dependencies:

    ```bash
    cd repos-api
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file based on the provided `.env.example`.
    - Provide values for the environment variables in the `.env` file.

4. Start the application:

    ```bash
    npm start
    ```

The API server will start running at http://localhost:3000 by default.

## Endpoints

### User Registration

- **URL**: POST /auth/register
- **Description**: Registers a new user account.

### User Login

- **URL**: POST /auth/login
- **Description**: Logs in a registered user and returns a JWT token for authentication.

### Retrieve Repositories

- **URL**: GET /repositories
- **Description**: Retrieves a list of repositories.
- **Authentication**: Required

### Add Favorite Repository

- **URL**: POST /favorites
- **Description**: Adds a repository to the user's favorites.
- **Authentication**: Required

### Retrieve Favorite Repositories

- **URL**: GET /favorites
- **Description**: Retrieves a list of user's favorite repositories.
- **Authentication**: Required

### Delete Favorite Repository

- **URL**: DELETE /favorites/:id
- **Description**: Removes a repository from the user's favorites.
- **Authentication**: Required

## Usage

### Accessing Protected Endpoints

Protected endpoints, such as adding, retrieving, and deleting favorite repositories, require authentication. To access these endpoints, you need to include the JWT token in the `Authorization` header of your requests with the `Bearer` prefix.

Example:

Authorization: Bearer <your_access_token>


### Using JWT Token in Favorites Endpoint

Once you obtain the JWT token after logging in, you can use it to access the favorites endpoint (`/favorites`). Include the token in the `Authorization` header of your request to add, retrieve, or delete favorite repositories associated with your account.

## Environment Variables

- `PORT`: The port number for the API server (default: 3000)
- `JWT_SECRET`: Secret key for JWT token generation
- `MONGO_URI`: MongoDB connection URI
