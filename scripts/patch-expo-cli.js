const fs = require('fs');
const path = require('path');
const externalsPath = path.join(__dirname, '..', 'node_modules', '@expo', 'cli', 'build', 'src', 'start', 'server', 'metro', 'externals.js');
if (!fs.existsSync(externalsPath)) {
  process.exit(0);
}
const replacements = [['(process.binding ? Object.keys(process.binding("natives")) : []) || []).filter((x)=>', '(process.binding ? Object.keys(process.binding("natives")) : []) || []).map((x)=>x.replace(/^node:/, "")).filter((x)=>'], ['(_module.builtinModules || // @ts-expect-error\n    (process.binding ? Object.keys(process.binding("natives")) : []) || []).filter((x)=>', '(_module.builtinModules || // @ts-expect-error\n    (process.binding ? Object.keys(process.binding("natives")) : []) || []).map((x)=>x.replace(/^node:/, "")).filter((x)=>']];
const source = fs.readFileSync(externalsPath, 'utf8');
if (source.includes(').map((x)=>x.replace(/^node:/, "")).filter((x)=>')) {
  process.exit(0);
}
const replacement = replacements.find(([before]) => source.includes(before));
if (!replacement) {
  console.warn('Expo CLI compatibility patch was not applied: target code changed.');
  process.exit(0);
}
fs.writeFileSync(externalsPath, source.replace(replacement[0], replacement[1]));
console.log('Patched Expo CLI for Node 22+ built-in module names on Windows.');
