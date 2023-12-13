"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    
    if(text === '') {
      return res.json({ error: 'No text to translate' })
    }
    
    if(!text || !locale) {
      return res.json({ error: 'Required field(s) missing' })
    }


    if (locale !== 'american-to-british' && locale !== 'british-to-american') {
      return res.json({ error: 'Invalid value for locale field' })
    }
    
    const translator = new Translator(text, locale);
    
    translator.translate();
    
    if (!translator.translation.includes('<span')) {
      translator.translation = 'Everything looks good to me!'
    }
    return res.json({text: text, translation: translator.translation});
  });
};
