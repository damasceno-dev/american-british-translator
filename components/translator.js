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
    let dictionary;
    const americanToBritishDictionary = {
      ...americanOnly,
      ...americanToBritishSpelling,
      ...americanToBritishTitles,
    };
    const britishToAmericanSpelling = this.reverseObject(americanToBritishSpelling);
    const britishToAmericanTtiles = this.reverseObject(americanToBritishTitles);
    const britishToAmericanDictionary = {
      ...britishOnly,
      ...britishToAmericanSpelling,
      ...britishToAmericanTtiles,
    }

    if (this.locale === "american-to-british") {
      dictionary = americanToBritishDictionary;
    } else if (this.locale === "british-to-american") {
      dictionary = britishToAmericanDictionary;
    }
    
    let sentence = this.text;
    let translatedSentence = "";

    for (const [key, value] of Object.entries(dictionary)) {
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
        const translated ='<span class="highlight">' + translationCased +'</span>';
        translatedSentence = preText + translated + posText;
        sentence = translatedSentence;
        //break;
      }
    }
    if (translatedSentence === '') {
      translatedSentence = sentence;
    }
    
    let hourToFind;
    let hourToReplaece;
    if (this.locale === "american-to-british") {
      hourToFind = ":";
      hourToReplaece = ".";
    } else if (this.locale === "british-to-american") {
      hourToFind = ".";
      hourToReplaece = ":";
    }

    if (translatedSentence.includes(hourToFind)) {
      //split with spaces and the punctuation mark at the end. E. g: 4.30. gets only 4.30 to check
      const transladedSplit = translatedSentence.split(/(\s|.$)/g)
      //map and check if is surrounded by numbers
      const checkColonArray = transladedSplit.map((word) => {
        if (word.includes(hourToFind) && this.isSurroundedByNumber(word, hourToFind)) {
          //if it is: span the word and replace : for .
          return (
            '<span class="highlight">' +
            word.replace(hourToFind, hourToReplaece) +
            '</span>'
          );
        } else {
          return word;
        }
      });
      translatedSentence = checkColonArray.join("");
    }

    this.translation = translatedSentence;
  }
  
  isSurroundedByNumber(word, hourToFind) {
    const colonIndex = word.indexOf(hourToFind);
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
      let equivalentWord = textToReplicateArray[index];
      if(!equivalentWord) {
        return;
      }
      //verify first letter and second letter for each word
      //First UpperCase and the other LowerCase
      if (
        word.charAt(0).toUpperCase() === word.charAt(0) &&
        word.charAt(1).toLowerCase() === word.charAt(1)
      ) {
        textToReplicateArray[index] =
          equivalentWord.charAt(0).toUpperCase() +
          equivalentWord.slice(1).toLowerCase();
      }
      //First and Second Uppercase
      else if (
        word.charAt(0).toUpperCase() === word.charAt(0) &&
        word.charAt(1).toUpperCase() === word.charAt(1)
      ) {
        textToReplicateArray[index] = equivalentWord.toUpperCase();
      }
      //any other case is all lowercase
      else {
        textToReplicateArray[index] = equivalentWord.toLowerCase();
      }
    });

    return textToReplicateArray.join(" ");
  }

  reverseObject(obj) {
    return Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));
  }
}

module.exports = Translator;
