import _ from "lodash-es";
export const common = {
  async sleep(time = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, time);
    });
  },
  arrayToMap(array) {
    if (!array) {
      return {};
    }
    if (!_.isArray(array)) {
      return array;
    }
    const map = {};
    for (const item of array) {
      if (item.key) {
        map[item.key] = item;
      }
    }
    return map;
  },
  mapToArray(map) {
    if (!map) {
      return [];
    }
    if (_.isArray(map)) {
      return map;
    }
    const array: any = [];
    for (const key in map) {
      const item = map[key];
      item.key = key;
      array.push(item);
    }
    return array;
  }
};
