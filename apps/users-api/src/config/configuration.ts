export default () => ({
  MONGO_URI: process.env.MONGODB_URL || 'mongodb://localhost:27017/user-data',
  JWT_SECRET: process.env.JWT_SECRET || 'test_jwt_secret',
  PORT: process.env.PORT || '3000',
});
