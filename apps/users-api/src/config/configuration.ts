export default () => ({
  MONGO_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'test_jwt_secret',
  PORT: process.env.PORT || '3000',
});
