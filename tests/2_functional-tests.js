const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Basic function', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
         'text': 'Mangoes are my favorite fruit.',
         'locale': 'american-to-british'
        })
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, {text: 'Mangoes are my favorite fruit.', translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'})
          done()
        })
    })

    test('Invalid locale', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
         'text': 'Anything',
         'locale': 'Invalid'
        })
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, { error: 'Invalid value for locale field' })
          done()
        })
    })

    test('Undefined text', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
         'locale': 'Anything'
        })
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, { error: 'Required field(s) missing' })
          done()
        })
    })

    test('Undefined locale', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
         'text': 'Anything'
        })
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, { error: 'Required field(s) missing' })
          done()
        })
    })

    test('Undefined locale', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
         'text': '',
         'locale': 'american-to-british'
        })
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, { error: 'No text to translate' })
          done()
        })
    })

    test('The translation is not necessary', function(done) {
        chai.request(server)
        .post('/api/translate')
        .send({
         'text': 'Anything',
         'locale': 'american-to-british'
        })
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, {text: 'Anything', translation: 'Everything looks good to me!' })
          done()
        })
    })
});
