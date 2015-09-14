import fs from 'fs';
import onlyScripts from './util/scriptFilter.js';

var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach((task) => {
  require('./tasks/' + task);
});

