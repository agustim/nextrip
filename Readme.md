# Nextrip

Using Nextjs with stripe, and deploy in netlify.

## Next.js

Build from scratch:

```
mkdir nextrip
cd nextrip
yarn init -y
yarn add react react-dom next
mkdir pages

cat > pages/index.js <<EOF
function IndexPage() {
    return (
            <div>
                <p>
                    Next info
                </p>
            </div>
    )
}
export default IndexPage
EOF
```
add in package.json
```
...
  "scripts": {
    "dev": "next",
    "build": "next build",
    "export": "next export",
    "deploy": "npm run build && npm run export",
    "start": "next start"
  },
...
```
Create netlify.toml
```
# netlify.toml 

[build]
  command = "yarn run deploy"
  publish = "out"
```

## Active lambdes

Create lambda directory

```
mkdir lambda    # workspace
mkdir functions # deploy space
```

Add netlify-lambda
```
yarn add netlify-lambda
```

Create lambda
```
cat > lambda/hello.js <<EOF
'use strict'

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: "Hello World!",
  }
}
EOF
```

Change pipeline: Add in package.json:
```
...
    "deploy": "npm run build && npm run export && npm run lambda:build",
...
    "lambda:build": "netlify-lambda build lambda",
    "lambda:test": "netlify-lambda serve lambda",
    "postinstall": "netlify-lambda install"
...
```

Add funciton at the end of netlify.toml file
```
...
  functions = "functions"
```

Test
```
yarn run lambda:test
```

