import { createServer } from 'node:http';
import { readFile } from 'node:fs';

const hostname = '127.0.0.1';
const port = '8000';

const routingTemplates = {
  '(.css|.html|.js|.png|.svg)$': 'src/',
  '.ttf$': '.',
};

const customContentTypes = {
  '.svg$': 'image/svg+xml',
};

const matchTemplates = (url) => {
  for (const urlRegExp of Object.keys(routingTemplates)) {
    if (RegExp(urlRegExp).test(url)) {
      return routingTemplates[urlRegExp] + url;
    }
  }
  return '';
};

const printError = (statusCode, statusDescription) => {
  console.log(`${statusDescription} (${statusCode})`);
};

const server = createServer((req, res) => {
  const now = new Date();
  console.log(
    '%s:%s:%s | %s %s',
    now.getHours().toString().padStart(2, '0'),
    now.getMinutes().toString().padStart(2, '0'),
    now.getSeconds().toString().padStart(2, '0'),
    req.method,
    req.url,
  );

  if (req.method != 'GET') {
    res.statusCode = 405;
    printError(405, 'METHOD NOT ALLOWED');
    res.end();
    return;
  }

  const fileName = matchTemplates(req.url);

  readFile(fileName, (err, data) => {
    if (err == null) {
      res.statusCode = 200;
      res.setHeader('charset', 'utf8');
      res.setHeader('lang', 'ru');
      for (const rExp of Object.keys(customContentTypes)) {
        if (RegExp(rExp).test(fileName)) {
          res.setHeader('Content-Type', customContentTypes[rExp]);
        }
      }
      res.write(data);
      res.end();
    } else {
      printError(404, 'NOT FOUND');
      res.statusCode = 404;
      res.end();
    }
  });
});

server.listen(port, hostname);
console.log(`Started dev server on ${hostname}:${port}`);
