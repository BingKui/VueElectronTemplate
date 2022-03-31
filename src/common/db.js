import { ipcRenderer } from 'electron';

/**
 * 向数据库中保存一条记录
 * @param {String} name 数据库名称
 * @param {Object} object 需要保存的对象
 */
export const addItem = (name, object) => {
    ipcRenderer.send(`${name}-add`, object);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-add-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reslove(false);
            }
        });
    });
};

/**
 * 更具id查询数据
 * @param {String} name 数据库名称
 * @param {String} id 数据id
 */
export const getItem = (name, id) => {
    ipcRenderer.send(`${name}-find`, { _id: id });
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-find-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reslove(false);
            }
        });
    });
};

/**
 * 根据条件查询一条记录
 * @param {String} name 数据库名称
 * @param {Object} condition 查询条件
 */
export const getItemByCondition = (name, condition) => {
    ipcRenderer.send(`${name}-find`, condition);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-find-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reslove(false);
            }
        });
    });
};

/**
 * 获取数据库中所有的数据
 * @param {String} name 数据库名称
 */
export const getAllItems = (name) => {
    ipcRenderer.send(`${name}-find-all`);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-find-all-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reslove(false);
            }
        });
    });
};

/**
 * 按条件查询
 * @param {String} name 数据库名称
 * @param {Object} condition 查询条件
 */
export const getItemsByCondition = (name, condition) => {
    ipcRenderer.send(`${name}-find-by-condition`, condition);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-find-by-condition-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reslove(false);
            }
        });
    });
};

/**
 * 通过 _id 删除一条数据
 * @param {String} name 数据库名称
 * @param {String} id 数据 ‘_id’
 */
export const delItem = (name, id) => {
    ipcRenderer.send(`${name}-del`, id);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-del-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reslove(false);
            }
        });
    });
};

/**
 * 根据条件更新一条或者多条数据
 * @param {String} name 数据库名称
 * @param {Object} condition 更新条件
 * @param {Object} value 更新结果
 */
export const updateItem = (name, condition, value) => {
    ipcRenderer.send(`${name}-update`, condition, value);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-update-result`, (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

/**
 * 获取记录数
 * @param {String} name 数据库名称
 */
export const getDbCount = (name) => {
    ipcRenderer.send(`${name}-count`);
    return new Promise((reslove, reject) => {
        ipcRenderer.once(`${name}-count-result`, (event, count) => {
            if (count) {
                reslove(count);
            } else {
                reslove(0);
            }
        });
    });
};
