const fs = require('fs');
const text = fs.readFileSync('app/data/projects.ts', 'utf8');

// Match project titles and descriptions
const matches = [...text.matchAll(/title:\s*['"]([^'"]+)['"],\s*category:\s*['"][^'"]+['"],\s*group:\s*['"][^'"]+['"],\s*description:\s*['"]([^'"]+)['"]/g)];

console.log("PROJECTS:");
matches.forEach(m => {
  console.log(`Title: ${m[1]}`);
  console.log(`Desc: ${m[2]}\n`);
});
