
npm init -y
npm i typescript
tsc --init
tsconfig

tsc
tsc file.ts
npx tsc index.ts

npm i ts-node-dev --D
npx ts-node-dev --respawn src/index.ts

npx tsc --watch
node --watch ./dist/index.js
// package.json
{
  "scripts": {
    "build":"tsc"
  },
}


// tsconfig.json
{
  "compilerOptions": {
     "noImplicitAny": true,
    "outDir": "./dist" /* convencion */
  },
  "files": ["index.ts"]
}
// command
// nodemon
{
    "watch": [
        "dist"
    ],
    "ext": "ts",
    "exec": "node dist/index.js"
}
instalacion global de typeScript
npm list -g