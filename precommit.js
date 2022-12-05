const pack = require('./package.json');
const yaml = require('js-yaml');
const fs = require('fs');
const { execSync } = require('child_process');

const chartFile = 'charts/telepost-frontend/Chart.yaml';
const data = fs.readFileSync(chartFile, 'utf8');
const doc = yaml.safeLoad(data);

if (pack.version !== doc.version) {
  fs.writeFileSync(chartFile, data.replace(doc.version, pack.version));
  execSync(`git add ${chartFile}`);
  console.log('Bump Chart.yaml version to ' + pack.version);
}
