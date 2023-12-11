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
    //const sentence = this.text.split(/([^\w\s]|\s)+/g);
    const sentence = this.text.split(' ');
    const translatedWords = sentence.map(word => {
      //console.log('word:', word, ' americanWord:', americanOnly[word])
      const punctuationSplit = word.split(/([^\w\s])+/g);
      console.log(punctuationSplit)
      const translatedWithPunctuation = punctuationSplit.map( wp => {       
        if (americanToBritishSpelling[wp] || americanOnly[wp]) {         
          const translation = americanToBritishSpelling[wp] || americanOnly[wp];
          return '<span class="highlight">' +  translation + '</span>';
        } else {
          return wp;
        }
      })
      console.log(translatedWithPunctuation)
      return translatedWithPunctuation.join('');
    })
    console.log(translatedWords)

    this.translation = translatedWords.join(' ');
  }

  britishToAmerican() {
    
  }
}

module.exports = Translator;