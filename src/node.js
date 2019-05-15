const fs = require('fs');
const path = require('path');

const readMarkdownFile = (filename) => {
    const filePath = path.resolve(__dirname, `./assets/${filename}.md`);
    return fs.readFileSync(filePath, 'utf8');
};

module.exports = {
    readMarkdownFile,
};
