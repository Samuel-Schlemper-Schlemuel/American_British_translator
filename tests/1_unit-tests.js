const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    let translate = new Translator()

    suite('american to british', () => {
        test('1 normal phrase', (done) => {
            assert.equal(translate.translate('Mangoes are my favorite fruit.', 'american-to-british').translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
            done()
        })

        test('2 normal phrase', (done) => {
            assert.equal(translate.translate('I ate yogurt for breakfast.', 'american-to-british').translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
            done()
        })

        test('3 normal phrase', (done) => {
            assert.equal(translate.translate("We had a party at my friend's condo.", 'american-to-british').translation, 'Everything looks good to me!')
            done()
        })

        test('4 normal phrase', (done) => {
            assert.equal(translate.translate("Can you toss this in the trashcan for me?", 'american-to-british').translation, 'Can you toss this in the <span class="highlight">bin</span> for me?')
            done()
        })

        test('5 normal phrase', (done) => {
            assert.equal(translate.translate("The parking lot was full.", 'american-to-british').translation, 'The <span class="highlight">car park</span> was full.')
            done()
        })

        test('6 normal phrase', (done) => {
            assert.equal(translate.translate("Like a high tech Rube Goldberg machine.", 'american-to-british').translation, 'Everything looks good to me!')
            done()
        })

        test('7 normal phrase', (done) => {
            assert.equal(translate.translate("To play hooky means to skip class or work.", 'american-to-british').translation, 'To <span class="highlight">bunk off</span> means to skip class or work.')
            done()
        })

        test('8 normal phrase', (done) => {
            assert.equal(translate.translate("No Mr. Bond, I expect you to die.", 'american-to-british').translation, 'No <span class="highlight">Mr</span> Bond, I expect you to die.')
            done()
        })
        
        test('9 normal phrase', (done) => {
            assert.equal(translate.translate("Dr. Grosh will see you now.", 'american-to-british').translation, '<span class="highlight">Dr</span> Grosh will see you now.')
            done()
        })

        test('10 normal phrase', (done) => {
            assert.equal(translate.translate("Lunch is at 12:15 today.", 'american-to-british').translation, 'Lunch is at <span class="highlight">12.15</span> today.')
            done()
        })
    })

    suite('british to american', () => {
        test('1 normal phrase', (done) => {
            assert.equal(translate.translate('We watched the footie match for a while.', 'british-to-american').translation, 'We watched the <span class="highlight">soccer</span> match for a while.')
            done()
        })

        test('2 normal phrase', (done) => {
            assert.equal(translate.translate('Paracetamol takes up to an hour to work.', 'british-to-american').translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
            done()
        })

        test('3 normal phrase', (done) => {
            assert.equal(translate.translate("First, caramelise the onions.", 'british-to-american').translation, 'First, <span class="highlight">caramelize</span> the onions.')
            done()
        })

        test('4 normal phrase', (done) => {
            assert.equal(translate.translate("I spent the bank holiday at the funfair.", 'british-to-american').translation, 'I spent the <span class="highlight">public holiday</span> at the funfair.')
            done()
        })

        test('5 normal phrase', (done) => {
            assert.equal(translate.translate("I had a bicky then went to the chippy.", 'british-to-american').translation, 'I had a <span class="highlight">cookie</span> then went to the chippy.')
            done()
        })

        test('6 normal phrase', (done) => {
            assert.equal(translate.translate("I've just got bits and bobs in my bum bag.", 'british-to-american').translation, `I've just got <span class="highlight">odds and ends</span> in my bum bag.`)
            done()
        })

        test('7 normal phrase', (done) => {
            assert.equal(translate.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american').translation, 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.')
            done()
        })

        test('8 normal phrase', (done) => {
            assert.equal(translate.translate("Have you met Mrs Kalyani?", 'british-to-american').translation, 'Have you met <span class="highlight">Mrs.</span> Kalyani?')
            done()
        })
        
        test('9 normal phrase', (done) => {
            assert.equal(translate.translate("Prof Joyner of King's College, London.", 'british-to-american').translation, `<span class="highlight">Prof.</span> Joyner of King's College, London.`)
            done()
        })

        test('10 normal phrase', (done) => {
            assert.equal(translate.translate("Tea time is usually around 4 or 4.30.", 'british-to-american').translation, 'Tea time is usually around 4 or <span class="highlight">4:30</span>.')
            done()
        })
    })

    suite('errors', () => {
        test('Undefined 1', (done) => {
            assert.deepEqual(translate.translate('british-to-american'),  { error: 'Required field(s) missing' })
            done()
        })

        test('Undefined 2', (done) => {
            assert.deepEqual(translate.translate(),  { error: 'Required field(s) missing' })
            done()
        })

        test('No text', (done) => {
            assert.deepEqual(translate.translate('', 'british-to-american'),  { error: 'No text to translate' })
            done()
        })

        test('Invalid locale', (done) => {
            assert.deepEqual(translate.translate('Testing', 'Abacadabra!'),  { error: 'Invalid value for locale field' })
            done()
        })
    })
});
