import Utils from './utils/Utils';

function declare(map, callback) {
  Object.keys(map)
    .forEach((name) => {
      const item = map[name];

      if (item.hasOwnProperty('name') && item.hasOwnProperty('fn')) {
        if (Utils.isFunction(callback)) callback(item.name, item.fn);
      } else if (typeof item === 'function') {
        callback(name, item);
      } else {
        declare(item, callback);
      }
    });
}

export default declare;
