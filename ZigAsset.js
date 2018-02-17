const path = require('path');
const { Asset, md5 } = require('parcel-bundler');
const { exec } = require('child_process');

class ZigAsset extends Asset {
  async parse() {
    this.wasmPath = path.join(this.options.cacheDir, this.name + '.wasm');
    const cmd = `zig build-obj ${this.name} --output ${this.wasmPath}`
    const x = exec(cmd)
    x.stderr.pipe(process.stderr)
    x.stdout.pipe(process.stdout)
  }

  async generate() {
    return {
      js: `module.exports='${this.name}fjijij'`
    };
  }
}

module.exports = ZigAsset;
