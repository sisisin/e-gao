const kuromoji = require('kuromoji');
const builder = kuromoji.builder({ dicPath: `${process.cwd()}/node_modules/kuromoji/dict` });

module.exports = {
  analyze(text) {
    return new Promise((resolve, reject) => {
      builder.build(function (err, tokenizer) {
        if (err) return reject(err);
        resolve(tokenizer.tokenize(text));
      });
    });
  }
};
