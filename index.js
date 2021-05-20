const fs = require('fs')

const NO_PACKAGE_JSON_ENGINE_ERROR_MESSAGE = 'Could not create .nvmrc file. A Node engine is not declared within the project package.json'

module.exports = {
  run() {
    try {
      console.info('Matching nvmrc version to package.json...')
      // Check package.json
      const packageJSONAsBuffer = fs.readFileSync(`${process.cwd()}/package.json`)
      const packageJSONAsString = packageJSONAsBuffer.toString()
      const parsedPackageJSON = JSON.parse(packageJSONAsString)

      if (!parsedPackageJSON.engines || !parsedPackageJSON.engines.node) {
        throw new Error(NO_PACKAGE_JSON_ENGINE_ERROR_MESSAGE)
      }

      try {
        // Check .nvmrc - don't overwrite the file if the existing file includes the same version
        const existingNVMRCFile = fs.readFileSync(`${process.cwd()}/.nvmrc`)
        const existingNodeVersion = existingNVMRCFile.toString()

        // Replace new lines and trim. Check for match.
        if (existingNodeVersion.replace(new RegExp('\n\g'),  '').trim() === parsedPackageJSON.engines.node.trim()) {
          console.info('.nvmrc upto date with package.json')  
          return
        }
      } catch (e) {
        console.error('Could not parse existing nvmrc. Either it doesnt exist or its in an unexpected format. Continuing...')
      }
    
      console.info('Generating .nvmrc from package.json...')
      fs.writeFileSync(`${process.cwd()}/.nvmrc`, `${parsedPackageJSON.engines.node}\n`, { encoding: "utf-8" })
      console.info('Generated .nvmrc from package.json')
    } catch (e) {
      if (e.code === 'ENOENT' && e.errno === -2) {
        console.log('Could not create .nvmrc file. Could not find project package.json')
        return
      }
    
      if (e.message === NO_PACKAGE_JSON_ENGINE_ERROR_MESSAGE) {
        console.error(e.message)
        return
      }

      console.error(e)
    }
  }
}
