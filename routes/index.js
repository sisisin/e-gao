const express = require('express');
const router = express.Router();
const {fetchTweets} = require('../lib/twitter');
const {analyze} = require('../lib/kuromoji');
const {pnize} = require('../lib/pnize');

router.get('/', function (req, res, next) {
  (async () => {
    const {data} = await fetchTweets(req.user);

    let total = 0;
    console.time('total');
    for (const {text} of data) {
      console.time('analyze');
      const tokenized = await analyze(text);
      console.timeEnd('analyze')
      console.time('pnize');
      const {score, matched} = pnize(tokenized.map(t => t.basic_form));
      console.timeEnd('pnize')
      const average = matched === 0 ? score : (score / matched);
      console.log(`text: ${text}, score: ${score}, matched: ${matched}, average: ${average}`);
      total += average;
    }
    console.log(`result: ${total / data.length}`);
    console.timeEnd('total');
    res.render('index', { title: 'Express' });
  })();
});

module.exports = router;
