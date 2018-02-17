module.exports = function (bundler) {
  bundler.addAssetType('zig', require.resolve('./ZigAsset'));
};
