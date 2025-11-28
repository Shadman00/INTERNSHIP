// db.config.js
module.exports = {
  url:
    process.env.MONGODB_URI ||
    "mongodb://admin:password123@mongodb:27017/meandb?authSource=admin",
};
