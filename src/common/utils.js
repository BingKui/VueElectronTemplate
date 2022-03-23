const { readMarkdownFile } = require('@/node');

/**
 *  加载 markdown 文件
 * @param {*} filename
 */
export const loadMarkdownFile = (filename) => {
    return readMarkdownFile(filename);
};
