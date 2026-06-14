const fs = require('fs');
let file = fs.readFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/src/app/(marketing)/page.tsx', 'utf8');

// Fix comments
file = file.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// The `style={{...}}` strings were replaced with dictionary objects, let's verify if there are any issues.
// `margin: '0 auto'` and things like `background: 'linear-gradient(135deg,#3b82f6,#a855f7)'` should be fine.

// Also need to check if there are any `<style>` tags left over or something.
// We removed `<style>` and scripts previously.

// Also, need to replace `style=""` with `style={{}}` if I missed any? The python script did it but the node script did it as well:
// `body.replace(/style="([^"]*?)"/g, ...)`

fs.writeFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/src/app/(marketing)/page.tsx', file, 'utf8');
console.log("Done fixing comments");
