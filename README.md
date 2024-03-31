# Top Stars Repos System

## Overview
This project consists of two microservices:
1. Repos API: Responsible for handling repository data fetched from the GitHub API and caching it in a Redis sorted list.
2. Users Data API: Responsible for managing user-related operations such as registration, login, and storing user favorite repositories.

These microservices are located under the `/apps` folder.

## Environment Variables
Before running the microservices, you need to set up the required environment variables. Follow the instructions below for each microservice:

### Repos API
1. Navigate to the `/apps/repos-api` directory.
2. Set the following environment variable:
   - `GITHUB_ACCESS_TOKEN`: GitHub access token used to authenticate with the GitHub API.

Refer to the [Repos API README](./apps/repos-api/README.md) for detailed instructions.

### Users Data API
1. Navigate to the `/apps/users-data-api` directory.

Refer to the [Users Data API README](./apps/users-data-api/README.md) for detailed instructions.

Once you've set up the environment variables for the Repos API microservice, you can proceed with building and running the service using Docker Compose as described in the next section.

## Building and Running with Docker Compose
To build and run the Repos API microservice using Docker Compose:

1. Install Docker Compose if you haven't already.
2. Navigate to the root directory of the project.
3. Open a terminal and run the following command:

```bash
docker-compose up --build
```

This command will build the Docker image for the Repos API microservice and start the container.

Accessing the API
Once the service is up and running, you can access the API using the following URL:

Repos API: http://localhost:3000
Users API: http://localhost:4000



