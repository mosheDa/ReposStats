# Top Starred Repositories API

This API retrieves and manages information about the top starred repositories from GitHub.

## Features

- Retrieve the top starred repositories
- Populate repositories from GitHub API
- Pagination support
- Redis caching for efficient data retrieval
- Observability through Nest Logger
- Error handling

## Prerequisites

Before running this application, ensure you have a Redis instance running. You can install Redis locally or use a cloud-hosted Redis service.

## Endpoints

### Get Top Starred Repositories

GET /top-starred-repos?page={page}&perPage={perPage}


Retrieve a list of top starred repositories.

**Parameters:**
- `page` (optional, default: 1): Page number for pagination
- `perPage` (optional, default: 10): Number of repositories per page

### Populate Repositories

POST /populate-repos


Populate repositories from the GitHub API.


## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Set up environment variables:
    Create a `.env` file based on the provided `.env.example` and provide your GitHub access token.

3. Run the application:
    ```bash
    npm start
    ```

## Environment Variables

- `GITHUB_ACCESS_TOKEN`: Your GitHub access token
- `MIN_REPO_STARS`: Minimum number of stars for repositories (default: 10)
- `EXPECTED_REPOS_COUNT`: Minimum number of repositories to retrieve (default: 20)
- `REDIS_TTL`: Time to live (TTL) for cached data in Redis (default: 360 seconds)
- `REDIS_KEY`: Redis key for cached data (default: top_starred_repos)
- `PORT`: Application port (default: 3000)
- `GITHUB_API_ENDPOINT`: GitHub API endpoint (default: https://api.github.com/search/repositories)

## Observability and Error Handling

This API utilizes Nest Logger for observability, which logs information, warnings, and errors to the console. Error handling is implemented to catch and log errors gracefully.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


