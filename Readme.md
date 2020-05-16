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
