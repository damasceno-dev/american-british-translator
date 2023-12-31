

translate() {
  if (this.locale === "american-to-british") {
    this.americanToBritish();
  } else if (this.locale === "british-to-american") {
    this.britishToAmerican();
  }
}

translateV2() {
  const invertedBritish = this.reverseObject(britishOnly);
  const americanToBritish = {
    ...americanOnly,
    ...americanToBritishSpelling,
    ...americanToBritishTitles,
    ...invertedBritish,
  };
  let sentence = this.text;
  let translatedSentence = "";

  for (const [key, value] of Object.entries(americanToBritish)) {
    let valueToFind;
    let valueToReplace;
    if (this.locale === "american-to-british") {
      valueToFind = key;
      valueToReplace = value;
    } else if (this.locale === "british-to-american") {
      valueToFind = value;
      valueToReplace = key;
    }
    if (sentence.toLowerCase().includes(valueToFind.toLowerCase())) {
      const indexToReplace = sentence
        .toLowerCase()
        .indexOf(valueToFind.toLowerCase());
      const nextCharacther = sentence[indexToReplace + valueToFind.length];
      const textToReplace = sentence.substring(
        indexToReplace,
        indexToReplace + valueToFind.length,
      );
      if (/\w/.test(nextCharacther)) {
        //e.g: match trash instead of trashcan => if next character is a word, ignore
        continue;
      }
      const preText = sentence.substring(0, indexToReplace);
      const posText = sentence.substring(
        indexToReplace + valueToFind.length,
        sentence.length,
      );
      const translationCased = this.replicateCase(
        textToReplace,
        valueToReplace,
      );
      const translated =
        '<span class="highlight">' + translationCased + "</span>";
      translatedSentence = preText + translated + posText;
      sentence = translatedSentence;
      //break;
    }
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
    //split with spaces
    const transladedSplit = translatedSentence.split(" ");
    //map and check if is surrounded by numbers
    const checkColonArray = transladedSplit.map((word) => {
      if (word.includes(hourToFind) && this.isSurroundedByNumber(word)) {
        //if it is: span the word and replace : for .
        return (
          '<span class="highlight">' +
          word.replace(hourToFind, hourToReplaece) +
          "</span>"
        );
      } else {
        return word;
      }
    });
    translatedSentence = checkColonArray.join(" ");
  }

  this.translation = translatedSentence;
}



americanToBritish() {
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
  if (translatedSentence === '') {
    translatedSentence = sentence;
  }
  if (translatedSentence.includes(':')) {
    //split with spaces
    const transladedSplit = translatedSentence.split(' ');
    //map and check if is surrounded by numbers
    const checkColonArray = transladedSplit.map(word => {
      if (word.includes(':') && this.isSurroundedByNumber(word, hourToFind)) {
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

britishToAmerican() {}