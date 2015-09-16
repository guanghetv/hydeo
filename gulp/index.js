import fs from 'fs';
import onlyScripts from './util/scriptFilter.js';

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach((task) => {
  require('./tasks/' + task);
});

