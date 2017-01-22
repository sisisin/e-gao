const Twit = require('twit');
const {TwitOption} = require('../config/local');

module.exports = {
  fetchTweets(sessionUser) {
    const userToken = { access_token: sessionUser.twitter_token, access_token_secret: sessionUser.twitter_token_secret };
    const T = new Twit(Object.assign({}, TwitOption, userToken));

    return new Promise((resolve, reject) => {
      T.get('statuses/user_timeline', { count: 10 }, function (err, data, response) {
        if (err) return reject(err);
        resolve({ data, response });
      });
    });
  }
};
