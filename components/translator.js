const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    errors(text, locale){
        if(text == undefined || locale == undefined){
            return { error: 'Required field(s) missing' }
        }
        else if(text == ''){
            return { error: 'No text to translate' }
        } 
        else if(locale != 'american-to-british' && locale != 'british-to-american'){
            return { error: 'Invalid value for locale field' }
        } else {
            return undefined
        }
    }

    time(text, locale){
        let result = text, arr

        if(locale){
            arr = text.match( /\d\d:\d\d/g)

            if(arr){
                for(let i in arr){
                    let sep = arr[i].split('')
                    let changed = `<span class="highlight">${sep[0]}${sep[1]}.${sep[3]}${sep[4]}</span>`
                    result = result.replace(arr[i], changed)
                }
            }
        } else {
            arr = text.match( /\d\d\.\d\d/g)

            if(arr){
                for(let i in arr){
                    let sep = arr[i].split('')
                    let changed = `<span class="highlight">${sep[0]}${sep[1]}:${sep[3]}${sep[4]}</span>`
                    result = result.replace(arr[i], changed)
                }
            }
        }

        return result
    }

    titles(text, locale){
        let result = text

        if(locale){
            for(let key in americanToBritishTitles){
                let re = new RegExp(`${key.replace('.', '\\.')} `, 'gi')
                result = result.replace(re, `<span class="highlight">${americanToBritishTitles[key]}</span> `)
            }
        } else {
            for(let key in americanToBritishTitles){
                let re = new RegExp(`${americanToBritishTitles[key]} `, 'gi')
                result = result.replace(re, `<span class="highlight">${key}</span> `)
            }
        }

        return result
    }

    words(text, locale){
        let result = text

        if(locale){
            for(let key in americanOnly){
                let re = new RegExp(`${key} `, 'gi')
                result = result.replace(re, `<span class="highlight">${americanOnly[key]}</span> `)
            }

            for(let key in americanToBritishSpelling){
                let re = new RegExp(`${key} `, 'gi')
                result = result.replace(re, `<span class="highlight">${americanToBritishSpelling[key]}</span> `)
            }
        } else {
            for(let key in britishOnly){
                let re = new RegExp(`${key} `, 'gi')
                result = result.replace(re, `<span class="highlight">${britishOnly[key]}</span> `)
            }

            for(let key in americanToBritishSpelling){
                let re = new RegExp(`${americanToBritishSpelling[key]} `, 'gi')
                result = result.replace(re, `<span class="highlight">${key}</span> `)
            }
        }

        return result
    }

    translate(text, locale){
        let errors = this.errors(text, locale)

        if(errors != undefined){
            return errors
        }

        locale = locale == 'american-to-british' ? true : false
        text = text + ' '

        let result = this.time(text, locale)
        result = this.titles(result, locale)
        result = this.words(result, locale)

        if(result == text){
            result = 'Everything looks good to me!'
        }

        return {text: text.replace(/\s$/, ''), translation: result.replace(/^./, result[0].toUpperCase()).replace(/\s$/, '')}
    }
}

module.exports = Translator;