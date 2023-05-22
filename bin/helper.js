const { resolve: resolvePath } = require('path');
const { readFileSync } = require('fs');

const rootPath = resolvePath(__dirname, '..');
const knosysUtils = require(resolvePath(rootPath, JSON.parse(readFileSync(resolvePath(rootPath, '.knosysrc'), 'utf8').toString().trim()).$path));

module.exports = { ...knosysUtils };
