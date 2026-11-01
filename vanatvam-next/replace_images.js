const fs = require('fs');
const path = require('path');

const replacements = {
  '/assets/images/about_hero_bg.webp': '/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.webp',
  '/assets/images/eeshavana.webp': '/assets/project-images/Esahavana/EV Image.webp',
  '/assets/images/impact_seedling.webp': '/assets/project-images/Brindavana/Farmer Tending Lush Seedlings.webp',
  '/assets/images/about_story_forest.webp': '/assets/project-images/Ananthavana/hero_image_2.webp',
  '/assets/images/dew_drops_leaf.webp': '/assets/project-images/Brindavana/Rainy Countryside Pond Reflections.webp',
  '/assets/images/hero_kaveri_river.webp': '/assets/project-images/Esahavana/Riverside view.webp',
  '/assets/images/cta_sunset_bg.webp': '/assets/project-images/Esahavana/EV River View 1.webp',
  '/assets/images/forest_address_bg.webp': '/assets/project-images/Brindavana/Tropical Garden Pathway Tunnel.webp',
  '/assets/images/master_plan_map.webp': '/assets/project-images/Esahavana/EV Arial View 1.webp',
  '/assets/projects/BrindaVana.webp': '/assets/project-images/Brindavana/Sunny Tropical Banana Orchard.webp',
  '/assets/projects/eeshavanaalogo.webp': '/assets/images/Project-Logos/eeshavanaalogo.webp',
  '/assets/projects/Logo-MadhuVana.svg': '/assets/images/Project-Logos/Logo-MadhuVana.svg',
  '/assets/projects/Anantavana.webp': '/assets/images/Project-Logos/Anantavana.webp',
  '/assets/images/anantavana.webp': '/assets/project-images/Ananthavana/hero_image.webp',
  '/assets/images/madhu_vana.webp': '/assets/project-images/Maduvana/hero.webp'
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  for (const [oldPath, newPath] of Object.entries(replacements)) {
    content = content.split(oldPath).join(newPath);
  }
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
