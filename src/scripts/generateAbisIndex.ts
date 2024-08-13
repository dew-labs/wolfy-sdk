import fs from 'node:fs'

function generateAbisIndexContent() {
  const fileNames = fs
    .readdirSync('./src/abis', {withFileTypes: true})
    .filter(file => file.isFile() && file.name.endsWith('ABI.ts'))
    .map(file => file.name.replace('.ts', ''))

  return fileNames
    .map(fileName => {
      return `export {default as ${fileName} } from './${fileName}'`
    })
    .join('\n')
}

const abisIndexContent = generateAbisIndexContent()

fs.writeFileSync(`./src/abis/index.ts`, abisIndexContent, {
  flag: 'w',
})
