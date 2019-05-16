const { readMarkdownFile } = require('@node');

/**
 *
 * @param {*} filename
 */
export const loadMarkdownFile = (filename) => {
    return readMarkdownFile(filename);
};
