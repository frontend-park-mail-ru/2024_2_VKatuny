import { createServer } from 'node:http';
import { readFile } from 'node:fs';

const hostname = '127.0.0.1';
const port = '8000';

const routingTemplates = {
  '.js$': '.',
  '(.css|.html|.png|.svg)$': 'src/',
  '.ttf$': '.',
};

const customContentTypes = {
  '.js$': 'text/javascript',
  '.svg$': 'image/svg+xml',
};

const matchTemplates = (url) => {
  const matchedUrl = Object.keys(routingTemplates).find((urlRegExp) => RegExp(urlRegExp).test(url));
  if (!matchedUrl) {
    return '';
  }
  return routingTemplates[matchedUrl] + url;
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

  if (req.method !== 'GET') {
    res.statusCode = 405;
    printError(405, 'METHOD NOT ALLOWED');
    res.end();
    return;
  }

  const fileName = matchTemplates(req.url) || 'src/index.html';

  readFile(fileName, (err, data) => {
    if (err === null) {
      res.statusCode = 200;
      res.setHeader('charset', 'utf8');
      res.setHeader('lang', 'ru');
      const matchedContentType = Object.keys(customContentTypes).find((rExp) =>
        RegExp(rExp).test(fileName),
      );
      if (matchedContentType) {
        res.setHeader('Content-Type', customContentTypes[matchedContentType]);
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
