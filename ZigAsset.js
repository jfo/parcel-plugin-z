const {Asset} = require('parcel-bundler');

class ZigAsset extends Asset {
  async generate() {
    return {
      js: "module.exports='this is a thing'",
    };
  }
}

module.exports = ZigAsset;
