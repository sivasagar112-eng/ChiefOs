const fs = require('fs');

function styleStrToDict(styleStr) {
  if (!styleStr.trim()) return "{}";
  const parts = styleStr.split(";");
  const res = [];
  for (let p of parts) {
    if (p.includes(":")) {
      let [k, v] = p.split(":");
      k = k.trim();
      v = v.trim();
      // camelCase
      let kCamel = k.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
      res.push(`${kCamel}: '${v}'`);
    }
  }
  return "{{" + res.join(", ") + "}}";
}

const html = fs.readFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/index.html', 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = styleMatch ? styleMatch[1] : "";

const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
let body = bodyMatch ? bodyMatch[1] : "";

body = body.replace(/class=/g, 'className=');
// some attributes might need fixing like for to htmlFor, but it doesn't look like we have forms yet.
body = body.replace(/onclick=/g, 'onClick=');

// Fix self closing
body = body.replace(/<br>/g, '<br />');
body = body.replace(/<hr>/g, '<hr />');
body = body.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
body = body.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');

// Style
body = body.replace(/style="([^"]*?)"/g, (match, p1) => {
  return `style=${styleStrToDict(p1)}`;
});

// Remove inline svg
// We need to replace inline SVGs with Lucide React icons where it makes sense. I can do this manually in page.tsx later.
// Replace standard entities that JSX dislikes if any, or just leave them. JSX handles standard HTML entities like &mdash; just fine natively.

fs.writeFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/marketing.css', css, 'utf8');
fs.writeFileSync('c:/Users/sivas/OneDrive/Desktop/ChiefOs/mockups/marketing_jsx.txt', body, 'utf8');

console.log("Done");
