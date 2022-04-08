import { renderEvent } from '@common/utils';
import { ACTION_KEY } from '@constants/channel';

/**
 * 向数据库中保存一条记录
 * @param {String} name 数据库名称
 * @param {Object} object 需要保存的对象
 */
export const addItem = (name, object) => {
    return renderEvent(ACTION_KEY.dbAddItem(name), object);
};

/**
 * 通过 _id 删除一条数据
 * @param {String} name 数据库名称
 * @param {String} id 数据 '_id'
 */
export const delItem = (name, id) => {
    return renderEvent(ACTION_KEY.dbDeleteItem(name), id);
};

/**
 * 通过 _id 更新一条数据
 * @param {String} name 数据库名称
 * @param {String} id 数据 '_id'
 * @param {Object} value 更新结果
 */
export const updateItem = (name, id, value) => {
    return renderEvent(ACTION_KEY.dbUpdateItem(name), id, value);
};

/**
 * 更具id查询数据
 * @param {String} name 数据库名称
 * @param {String} id 数据 '_id'
 */
export const getItem = (name, id) => {
    return renderEvent(ACTION_KEY.dbFindItem(name), id);
};

/**
 * 根据条件查询记录
 * @param {String} name 数据库名称
 * @param {Object} condition 查询条件
 */
export const getList = (name, condition = {}) => {
    return renderEvent(ACTION_KEY.dbFind(name), condition);
};

/**
 * 统计记录数
 * @param {String} name 数据库名称
 * @param {Object} condition 统计条件
 */
export const getCount = (name, condition = {}) => {
    return renderEvent(ACTION_KEY.dbCount(name), condition);
};
