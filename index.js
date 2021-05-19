const fs = require('fs')

const NO_PACKAGE_JSON_ENGINE_ERROR_MESSAGE = 'Could not create .nvmrc file. A Node engine is not declared within the project package.json'
try {
  const packageJSONAsBuffer = fs.readFileSync(`${__dirname}/package.json`)
  const packageJSONAsString = packageJSONAsBuffer.toString()
  const parsedPackageJSON = JSON.parse(packageJSONAsString)
  // TODO: Check for incorrectly formatted package json and thro

  if (!parsedPackageJSON.engines || !parsedPackageJSON.engines.node) {
    throw new Error(NO_PACKAGE_JSON_ENGINE_ERROR_MESSAGE)
  }

  fs.writeFileSync(`${__dirname}/.nvmrc`, `${parsedPackageJSON.engines.node}\n`, { encoding: "utf-8" })
} catch (e) {
  if (e.code === 'ENOENT' && e.errno === -2) {
    console.log('Could not create .nvmrc file. Could not find project package.json')
  }

  if (e.message === NO_PACKAGE_JSON_ENGINE_ERROR_MESSAGE) {
    console.error(e.message)
  }
}
