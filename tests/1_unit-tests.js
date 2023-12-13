const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  test("Translate Mangoes are my favorite fruit. to British English", () => {
    const translator = new Translator('Mangoes are my favorite fruit.', 'american-to-british');
    translator.translate();
    assert.equal("Mangoes are my <span class=\"highlight\">favourite</span> fruit.", translator.translation)
  })
  test("Translate I ate yogurt for breakfast. to British English", () => {
    const translator = new Translator('I ate yogurt for breakfast.', 'american-to-british');
    translator.translate();
    assert.equal("I ate <span class=\"highlight\">yoghurt</span> for breakfast.", translator.translation)
  })
  test("Translate We had a party at my friend's condo. to British English", () => {
    const translator = new Translator("We had a party at my friend's condo.", 'american-to-british');
    translator.translate();
    assert.equal("We had a party at my friend's <span class=\"highlight\">flat</span>.", translator.translation)
  })
  test("Translate Can you toss this in the trashcan for me? to British English", () => {
    const translator = new Translator("Can you toss this in the trashcan for me?", 'american-to-british');
    translator.translate();
    assert.equal("Can you toss this in the <span class=\"highlight\">bin</span> for me?", translator.translation)
  })
  test("Translate The parking lot was full. to British English", () => {
    const translator = new Translator("The parking lot was full.", 'american-to-british');
    translator.translate();
    assert.equal("The <span class=\"highlight\">car park</span> was full.", translator.translation)
  })
  test("Translate Like a high tech Rube Goldberg machine. to British English", () => {
    const translator = new Translator("Like a high tech Rube Goldberg machine.", 'american-to-british');
    translator.translate();
    assert.equal("Like a high tech <span class=\"highlight\">Heath Robinson device</span>.", translator.translation)
  })
  test("Translate To play hooky means to skip class or work. to British English", () => {
    const translator = new Translator("To play hooky means to skip class or work.", 'american-to-british');
    translator.translate();
    assert.equal("To <span class=\"highlight\">bunk off</span> means to skip class or work.", translator.translation)
  })
  test("Translate No Mr. Bond, I expect you to die. to British English", () => {
    const translator = new Translator("No Mr. Bond, I expect you to die.", 'american-to-british');
    translator.translate();
    assert.equal("No <span class=\"highlight\">Mr</span> Bond, I expect you to die.", translator.translation)
  })
  test("Translate Dr. Grosh will see you now. to British English", () => {
    const translator = new Translator("Dr. Grosh will see you now.", 'american-to-british');
    translator.translate();
    assert.equal("<span class=\"highlight\">Dr</span> Grosh will see you now.", translator.translation)
  })
  test("Translate Lunch is at 12:15 today. to British English", () => {
    const translator = new Translator("Lunch is at 12:15 today.", 'american-to-british');
    translator.translate();
    assert.equal("Lunch is at <span class=\"highlight\">12.15</span> today.", translator.translation)
  })
  test("Translate We watched the footie match for a while. to American English", () => {
    const translator = new Translator("We watched the footie match for a while.", 'british-to-american');
    translator.translate();
    assert.equal("We watched the <span class=\"highlight\">soccer</span> match for a while.", translator.translation)
  })
  test("Translate Paracetamol takes up to an hour to work. to American English", () => {
    const translator = new Translator("Paracetamol takes up to an hour to work.", 'british-to-american');
    translator.translate();
    assert.equal("<span class=\"highlight\">Tylenol</span> takes up to an hour to work.", translator.translation)
  })
  test("Translate First, caramelise the onions. to American English", () => {
    const translator = new Translator("First, caramelise the onions.", 'british-to-american');
    translator.translate();
    assert.equal("First, <span class=\"highlight\">caramelize</span> the onions.", translator.translation)
  })
  test("Translate I spent the bank holiday at the funfair. to American English", () => {
    const translator = new Translator("I spent the bank holiday at the funfair.", 'british-to-american');
    translator.translate();
    assert.equal("I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.", translator.translation)
  })
  test("Translate I had a bicky then went to the chippy. to American English", () => {
    const translator = new Translator("I had a bicky then went to the chippy.", 'british-to-american');
    translator.translate();
    assert.equal("I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-<span class=\"highlight\">fish-and-chip shop</span></span>.", translator.translation)
  })
  test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
    const translator = new Translator("I've just got bits and bobs in my bum bag.", 'british-to-american');
    translator.translate();
    assert.equal("I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.", translator.translation)
  })
  test("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
    const translator = new Translator("The car boot sale at Boxted Airfield was called off.", 'british-to-american');
    translator.translate();
    assert.equal("The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.", translator.translation)
  })
  test("Translate Have you met Mrs Kalyani? to American English", () => {
    const translator = new Translator("Have you met Mrs Kalyani?", 'british-to-american');
    translator.translate();
    assert.equal("Have you met <span class=\"highlight\">Mrs.</span> Kalyani?", translator.translation)
  })
  test("Translate Prof Joyner of King's College, London. to American English", () => { 
    const translator = new Translator("Prof Joyner of King's College, London.", 'british-to-american');
    translator.translate();
    assert.equal("<span class=\"highlight\">Prof.</span> Joyner of King's College, London.", translator.translation)
  })
  test("Translate Tea time is usually around 4 or 4.30. to American English", () => { 
    const translator = new Translator("Tea time is usually around 4 or 4.30.", 'british-to-american');
    translator.translate();
    assert.equal("Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.", translator.translation)
  })
  test("Highlight translation in Mangoes are my favorite fruit.", () => { 
    const translator = new Translator("Mangoes are my favorite fruit.", 'american-to-british');
    translator.translate();
    assert.equal("Mangoes are my <span class=\"highlight\">favourite</span> fruit.", translator.translation)
  })
  test("Highlight translation in I ate yogurt for breakfast.", () => { 
    const translator = new Translator("I ate yogurt for breakfast.", 'american-to-british');
    translator.translate();
    assert.equal("I ate <span class=\"highlight\">yoghurt</span> for breakfast.", translator.translation)
  })
  test("Highlight translation in We watched the footie match for a while.", () => { 
    const translator = new Translator("We watched the footie match for a while.", 'british-to-american');
    translator.translate();
    assert.equal("We watched the <span class=\"highlight\">soccer</span> match for a while.", translator.translation)
  })
  test("Highlight translation in Paracetamol takes up to an hour to work.", () => { 
    const translator = new Translator('Paracetamol takes up to an hour to work.', 'british-to-american');
    translator.translate();
    assert.equal("<span class=\"highlight\">Tylenol</span> takes up to an hour to work.", translator.translation)
  })
});
