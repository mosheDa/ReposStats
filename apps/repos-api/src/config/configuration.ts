export default () => ({
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  MIN_REPO_STARS: process.env.MIN_REPO_STARS || '10',
  EXPECTED_REPOS_COUNT: process.env.EXPECTED_REPOS_COUNT || '20',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  REDIS_TTL: process.env.REDIS_TTL || '360',
  REDIS_KEY: process.env.REDIS_KEY || 'top_starred_repos',
  PORT: process.env.PORT || '3000',
  GITHUB_API_ENDPOINT:
    process.env.GITHUB_API_ENDPOINT ||
    'https://api.github.com/search/repositories',
});
