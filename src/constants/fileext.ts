// 文件扩展卡枚举

// 所有文件
export const ALL_EXT_FILTER = {
    name: 'All Files',
    extensions: ['*'],
};
// 常见图片文件格式
export const IMAGE_EXT_FILTER = {
    name: 'Images',
    extensions: ['jpg', 'png', 'gif', 'svg', 'webp', 'jpeg'],
};
// 所有格式图片文件格式
export const IMAGE_EXT_FULL_FILTER = {
    name: 'Images Full',
    extensions: IMAGE_EXT_FILTER.extensions.concat(['bmp', 'tif', 'pcx', 'tga', 'exif', 'fpx', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF']),
};
// 视频文件
export const MOBVIE_EXT_FILTER = {
    name: 'Movies',
    extensions: ['mkv', 'avi', 'mp4', 'rmvb', 'mov', 'flv', '3gp', 'rm'],
};
// 音频文件
export const MUSIC_EXT_FILTER = {
    name: 'Music',
    extensions: ['wav', 'flac', 'ape', 'alac', 'wv', 'cda', 'mp3', 'aac', 'wma', 'ogg'],
};
// Word 文件
export const WORD_EXT_FILTER = {
    name: 'Word',
    extensions: ['doc', 'docx', 'docm', 'dotx', 'dotm'],
};
// Excel 文件
export const EXCEL_EXT_FILTER = {
    name: 'Excel',
    extensions: ['xls', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xlam'],
};
// PPT 文件
export const PPT_EXT_FILTER = {
    name: 'PowerPoint',
    extensions: ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsx', 'potx', 'potm', 'ppam'],
};
// Office 文件
export const OFFICE_EXT_FILTER = {
    name: 'Office',
    extensions: WORD_EXT_FILTER.extensions.concat(EXCEL_EXT_FILTER.extensions, PPT_EXT_FILTER.extensions),
};
// 压缩文件
export const COMPRESS_EXT_FILTER = {
    name: 'Compress',
    extensions: ['rar', 'zip', 'gzip', '7z', 'iso', 'img', 'gz', 'jar', 'xar'],
};
// 代码文件
export const CODE_EXT_FILTER = {
    name: 'Code',
    extensions: ['js', 'ts', 'jsx', 'vue', 'java', 'class', 'py', 'dart', 'sh', 'c', 'cc', 'cs', 'cpp', 'go', 'dart'],
};
// 用户自定义文件后缀
export const EXTENSION_EXT_FILTER = {
    name: 'iTools Extension File',
    extensions: ['zip'],
};
