const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor(text, locale) {
    this.text = text;
    this.locale = locale;
    this.translation = "";
  }

  translate() {
    if (this.locale === "american-to-british") {
      this.americanToBritish();
    } else if (this.locale === "british-to-american") {
      this.britishToAmerican();
    }
  }

  americanToBritish() {
    const hoursAmericanToBritish = {":":"."};
    const americanToBritish = {
      ...americanOnly,
      ...americanToBritishSpelling,
      ...americanToBritishTitles,
    };
    let sentence = this.text;
    let translatedSentence = "";

    for (const [key, value] of Object.entries(americanToBritish)) {
      if (sentence.toLowerCase().includes(key.toLowerCase())) {
        const indexToReplace = sentence.toLowerCase().indexOf(key.toLowerCase());
        const nextCharacther = sentence[indexToReplace + key.length];
        const textToReplace = sentence.substring(indexToReplace,indexToReplace + key.length);
        if (/\w/.test(nextCharacther)) { //e.g: match trash instead of trashcan => if next character is a word, ignore
          continue;
        }
        const preText = sentence.substring(0, indexToReplace);
        const posText = sentence.substring(indexToReplace + key.length,sentence.length);
        const translationCased = this.replicateCase(textToReplace, value);
        const translated ='<span class="highlight">' + translationCased + "</span>";
        translatedSentence = preText + translated + posText;
        sentence = translatedSentence;
        //break;
      }
    }

    if (translatedSentence.includes(':')) {
      //split with spaces
      const transladedSplit = translatedSentence.split(' ');
      //map and check if is surrounded by numbers
      const checkColonArray = transladedSplit.map(word => {
        if (word.includes(':') && this.isSurroundedByNumber(word)) {
          //if it is: span the word and replace : for .
          return '<span class="highlight">' + word.replace(':', '.') + "</span>";
        }
        else {
          return word;
        }
      })
      translatedSentence = checkColonArray.join(' ');
    }
    
    this.translation = translatedSentence;
  }

  isSurroundedByNumber(word) {
    const colonIndex = word.indexOf(':');
    const prevValue = word[colonIndex - 1];
    const nextValue = word[colonIndex + 1];

    if (isNaN(Number(prevValue)) || isNaN(Number(nextValue))) {
      return false;
    } else {
      return true;
    }
  }

  replicateCase(textToCheckCase, textToReplicateCase) {
    const textToCheckArray = textToCheckCase.split(" ");
    const textToReplicateArray = textToReplicateCase.split(" ");

    textToCheckArray.map((word, index) => {
      let equivalentWord = textToReplicateArray[index]
      //verify first letter and second letter for each word
      //First UpperCase and the other LowerCase
      if (word.charAt(0).toUpperCase() === word.charAt(0) && word.charAt(1).toLowerCase() === word.charAt(1)) {
        textToReplicateArray[index] = equivalentWord.charAt(0).toUpperCase() + equivalentWord.slice(1).toLowerCase();
      }
      //First and Second Uppercase 
      else if (word.charAt(0).toUpperCase() === word.charAt(0) && word.charAt(1).toUpperCase() === word.charAt(1)) {
        textToReplicateArray[index] = equivalentWord.toUpperCase();
      }
      //any other case is all lowercase
      else {
        textToReplicateArray[index] = equivalentWord.toLowerCase();
      }
    });

    return textToReplicateArray.join(' ');
  }

  americanToBritishDeprecated() {
    //const sentence = this.text.split(/([^\w\s]|\s)+/g);
    const sentence = this.text.split(" ");
    const translatedWords = sentence.map((word) => {
      //console.log('word:', word, ' americanWord:', americanOnly[word])
      const punctuationSplit = word.split(/([^\w\s])+/g);
      const translatedWithPunctuation = punctuationSplit.map((wp) => {
        if (americanToBritishSpelling[wp] || americanOnly[wp]) {
          const translation = americanToBritishSpelling[wp] || americanOnly[wp];
          return '<span class="highlight">' + translation + "</span>";
        } else {
          return wp;
        }
      });
      return translatedWithPunctuation.join("");
    });
    console.log(translatedWords);

    this.translation = translatedWords.join(" ");
  }

  britishToAmerican() {
    
  }
}

module.exports = Translator;
