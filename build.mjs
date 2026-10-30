import {cp,mkdir} from 'node:fs/promises';
// Only public site files enter the deployment output.
await mkdir('dist',{recursive:true});
for(const item of ['index.html','style.css','app.js','journey-ui.js','journey.css','map.js','map.css','vendor','assets','data'])await cp(item,`dist/${item}`,{recursive:true});
console.log('Built static site in dist/');
