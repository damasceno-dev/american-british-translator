const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  
    test('Translation with text and locale fields: POST request to /api/translate', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/translate')
         .send({
           "text": "Mangoes are my favorite fruit. I ate yogurt for breakfast. We had a party at my friend's condo. Can you toss this in the trashcan for me? The parking lot was full. Like a high tech Rube Goldberg machine. To play hooky means to skip class or work. No Mr. Bond, I expect you to die. Dr. Grosh will see you now. Lunch is at 12:15 today.",
           "locale": "american-to-british"
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit. I ate <span class=\"highlight\">yoghurt</span> for breakfast. We had a party at my friend's <span class=\"highlight\">flat</span>. Can you toss this in the <span class=\"highlight\">bin</span> for me? The <span class=\"highlight\">car park</span> was full. Like a high tech <span class=\"highlight\">Heath Robinson device</span>. To <span class=\"highlight\">bunk off</span> means to skip class or work. No <span class=\"highlight\">Mr</span> Bond, I expect you to die. <span class=\"highlight\">Dr</span> Grosh will see you now. Lunch is at <span class=\"highlight\">12.15</span> today.");
          done();
        });
    })
  
    test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/translate')
         .send({
           "text": "Mangoes are my favorite fruit. I ate yogurt for breakfast.",
           "locale": "brazilian-to-portuguese"
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Invalid value for locale field"}');
          done();
        });
    })
  
    test('Translation with missing text field: POST request to /api/translate', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/translate')
         .send({
           "locale": "american-to-british"
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Required field(s) missing"}');
          done();
        });
    })
  
    test('Translation with missing locale field: POST request to /api/translate', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/translate')
         .send({
            "text": "Mangoes are my favorite fruit. I ate yogurt for breakfast."
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"Required field(s) missing"}');
          done();
        });
    })
  
    test('Translation with empty text: POST request to /api/translate', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/translate')
         .send({
            "text": "",
            "locale": "american-to-british"
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '{"error":"No text to translate"}');
          done();
        });
    })
  
    test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
       chai.request(server)
        .keepOpen()
        .post('/api/translate')
         .send({
            "text": "Mangoes are my favourite fruit.",
            "locale": "american-to-british"
         })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, "Everything looks good to me!");
          done();
        });
    })

  
});
