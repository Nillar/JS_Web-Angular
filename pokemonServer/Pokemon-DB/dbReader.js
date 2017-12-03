const fs = require('fs')

module.exports = JSON.parse(fs.readFileSync('./Pokemon-DB/pokedex.json', 'utf8'))
