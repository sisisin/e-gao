const dic = new Map(require('./pn-dictionary.json'));

module.exports = {
  pnize(texts) {
    let matched = 0;
    let score = 0;
    texts.forEach(text => {
      if (dic.has(text)) {
        matched++;
        score += dic.get(text);
      }
    });
    return { matched, score };
  }
}