module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com'],
  },
  serverRuntimeConfig: {
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  env: {
    API_URI: process.env.API_URI,
    FILE_SERVICE_API_URI: process.env.FILE_SERVICE_API_URI,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB
  }
}
