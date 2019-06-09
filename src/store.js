export default class Store {
  constructor(options = {}) {
    this.key = options.storeKey;
    this.storage = Store.storage(options.storeType);
  }

  save(data) {
    Store.saveData(this.storage, this.key, data);
  }

  load(defaults = null) {
    let data = Store.loadData(this.storage, this.key);
    if (data) {
      return data;
    } else {
      return defaults;
    }
  }

  clear() {
    this.storage.removeItem(this.key);
  }

  static storage(type) {
    if (type == 'local') {
      return window.localStorage;
    } else {
      return window.sessionStorage;
    }
  }

  static saveData(storage, key, data) {
    let json = JSON.stringify(data);
    storage.setItem(key, json);
  }

  static loadData(storage, key) {
    let json = storage.getItem(key);
    if (!json) {
      return null;
    } else {
      return JSON.parse(json);
    }
  }
}
