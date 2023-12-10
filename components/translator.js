const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor(text, locale) {
    this.text = text;
    this.locale = locale;
    this.translation = '';
  }

  translate() {
    if(this.locale === 'american-to-british') {
      this.americanToBritish()
    } else if (this.locale === 'british-to-american') {
      this.britishToAmerican()
    }
  }

  
  americanToBritish() {
    const sentence = this.text.split(' ');
    const translatedWords = sentence.map(word => {
      if (americanToBritishSpelling[word]) {
        return '<span class="highlight">' +  americanToBritishSpelling[word] + '</span>';
      } else {
        return word;
      }
    })

    this.translation = translatedWords.join(' ');
  }

  britishToAmerican() {
    
  }
}

module.exports = Translator;