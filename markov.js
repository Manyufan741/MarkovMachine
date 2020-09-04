/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();
    for (let i = 0; i < this.words.length - 1; i++) {
      let key = this.words[i] + " " + this.words[i + 1];
      let value = null;
      if (this.words[i + 2]) {
        value = this.words[i + 2];
      } else {
        value = null;
      }

      if (chains.get(key)) {
        chains.get(key).push(value);
      } else {
        chains.set(key, [value]);
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */
  pickAkey() {
    let keys = [];
    for (let key of this.chains.keys()) {
      keys.push(key);
    }
    let len = keys.length;
    let randIdx = Math.floor(Math.random() * len);
    return keys[randIdx];
  }

  chooseOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    // TODO
    let count = 0;
    let key = this.pickAkey();
    let result = '';
    while (count < numWords && !key.includes('null')) {
      let [r1, r2] = key.split(" ");
      result = result + r1 + " ";
      key = r2 + " " + this.chooseOne(this.chains.get(key));
      if (key.includes('null')) {
        result += r2;
      }
      count += 1;
    }
    console.log(result);
    return result;
  }
}

module.exports = { MarkovMachine };

// let mm = new MarkovMachine("the cat in the hat");
// // console.log(mm.chains);
// mm.makeText();
// mm.makeText(numWords = 50);