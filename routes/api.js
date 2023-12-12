"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    const translator = new Translator(text, locale);
    translator.translate();

    console.log(translator.translation);
    return res.json(translator);
  });
};
