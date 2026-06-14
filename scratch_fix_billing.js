const fs = require('fs');
let f = fs.readFileSync('src/app/(marketing)/page.tsx', 'utf8');
f = f.replace(/onClick="toggleBilling\(\)"/g, 'onClick={() => setIsAnnual(!isAnnual)}');
// And remove esModuleInterop error by removing import * as React? It's Next.js so `import React, { ... }` is fine but we can just use `import { useEffect, useState, useRef }`
f = f.replace(/import React, \{ /g, 'import { ');
fs.writeFileSync('src/app/(marketing)/page.tsx', f, 'utf8');
