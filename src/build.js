const fs   = require('fs')
const path = require('path')

const sourceDir  = './data'
const outputPath = './public/messages.json'

let result = {}
const files = fs.readdirSync(sourceDir)
files.map(filePath => {
    const file = fs.readdirSync(path.join(sourceDir, filePath), 'utf-8')
    const key = filePath.replace(/.txt/, '')
    result[key] = file
})

fs.writeFileSync(
    outputPath,
    JSON.stringify(message, null, 4)
)