### Install 

`npm i -D package-node-to-nvmrc`

### Description

`package-node-to-nvmrc` was designed to run as part of a `pre-commit` hook to avoid the lack of consistency caused by the need to manually keep this:

```json
// package.json
{
  "engines": {
    "node": "14.17.0"
  }
}
```

and this, in sync:

```sh
# .nvmrc
14.17.0
```

### Usage

We recommend using <a href="https://github.com/typicode/husky">`husky`</a> `v6` to do this. Once you have installed `husky`, create a `pre-commit` hook in your project line with their documentation. 

Navigate to the `pre-commit` file (inside a `.husky` directory in `v6`) and add the following line to the file `npx package-node-to-nvmrc && git add .nvmrc`. 

An example of a full file with only this package to be run would look like:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx package-node-to-nvmrc && git add .nvmrc

```

Ensure you have your engine declared in `package.json`, and `commit` your changes. You should see an `.nvmrc` is generated, added and committed as part of the process.



