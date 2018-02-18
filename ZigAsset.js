const path = require('path');
const { Asset } = require('parcel-bundler');
const { exec } = require('child_process');
const crypto = require('crypto');

function md5(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex');
}

class ZigAsset extends Asset {

  // parse will compile the file, placing it in a hashed fn wasm output in the
  // cache directory, reporting as appropriate.
  async parse() {
    this.outputPath = path.join(this.options.cacheDir, md5(this.name));
    const cmd = `zig build-exe ${this.name} --output ${this.outputPath}`;
    const x = exec(cmd);
    x.stderr.pipe(process.stderr);
    x.stdout.pipe(process.stdout);
  }

  // generate will eventually return {wasm: {path: this.wasmPath}}
  async generate() {
    return {
      js: `module.exports='${this.name}fjijij'`
    };
  }
}

module.exports = ZigAsset;
