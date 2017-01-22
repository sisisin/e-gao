const isPrd = process.env.NODE_ENV === 'production';

const RedisOption = isPrd
  ? {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    pass: process.env.REDIS_PW,
    ttl: 259200 // sec. 3day expire  
  } : {
    port: 6379,
    host: 'localhost',
    ttl: 86400, // sec. 1day expire  
  };

const PassportOption = isPrd
  ? {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'https://e-gao.herokuapp.com/login/callback',
  }
  : require('./local').PassportOption;

const TwitOption = isPrd
  ? {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  } : require('./local').TwitOption;

module.exports = {
  PassportOption,
  RedisOption,
  TwitOption,
};
