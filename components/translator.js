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
    const americanToBritish = {
      ...americanOnly,
      ...americanToBritishSpelling,
      ...americanToBritishTitles
    }
    const sentence = this.text;
    let translatedSentence = '';
    
    for (const [key, value] of Object.entries(americanToBritish)) {
      if(sentence.toLowerCase().includes(key.toLowerCase())) {
        const indexToReplace = sentence.toLowerCase().indexOf(key.toLowerCase())
        const preText = sentence.substring(0,indexToReplace);
        const posText = sentence.substring(indexToReplace + key.length, sentence.length);  
        const textToReplace = sentence.substring(indexToReplace, indexToReplace + key.length)
        const value = this.replicateCase(textToReplace, value);
        const translated = '<span class="highlight">' +  value + '</span>';
        translatedSentence = preText + translated + posText;
        break;
      }
    }
    this.translation = translatedSentence;
  }

  replicateCase(textToCheckCase, textToReplicateCase) {
    const textToCheckArray = textToCheckCase.split(' ');
    const textToReplicateArray = textToReplicateCase.split(' ');
    let returnedCamelCaseText = [];
      textToCheckArray.map((word, index) => {
      //verify first letter and second letter for each word
      //first letter of each word
      if (word.charAt(0).toUpperCase() === word.charAt(0)) {
        returnedCamelCaseText = textToReplicateArray.map((w, i) => {
          if (index === i) {
            return w.charAt(0).toUpperCase() + w.slice(1)
          }
        })
      } else {
        returnedCamelCaseText = textToReplicateArray.map((w, i) => {
          if (index === i) {
            return w.charAt(0).toLowerCase() + w.slice(1)
          }
        })
      }

      //second letter of each word
      if (word.charAt(1).toUpperCase() === word.charAt(1)) {
        returnedCamelCaseText = textToReplicateArray.map((w, i) => {
          if (index === i) {
            return w.charAt(0) + w.slice(1).toUpperCase();
          }
        })
      } else {
        returnedCamelCaseText = textToReplicateArray.map((w, i) => {
          if (index === i) {
            return w.charAt(0) + w.slice(1).toLowerCase();
          }
        })
      }

      return returnedCamelCaseText;
      
    })
  }
  
  americanToBritishDeprecated() {
    //const sentence = this.text.split(/([^\w\s]|\s)+/g);
    const sentence = this.text.split(' ');
    const translatedWords = sentence.map(word => {
      //console.log('word:', word, ' americanWord:', americanOnly[word])
      const punctuationSplit = word.split(/([^\w\s])+/g);
      const translatedWithPunctuation = punctuationSplit.map( wp => {       
        if (americanToBritishSpelling[wp] || americanOnly[wp]) {         
          const translation = americanToBritishSpelling[wp] || americanOnly[wp];
          return '<span class="highlight">' +  translation + '</span>';
        } else {
          return wp;
        }
      })
      return translatedWithPunctuation.join('');
    })
    console.log(translatedWords)

    this.translation = translatedWords.join(' ');
  }

  britishToAmerican() {
    
  }
}

module.exports = Translator;