const path = require('path');
const {Asset} = require('parcel-bundler');
const childProcess = require('child_process');
const crypto = require('crypto');

const promisify = function(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      fn(...args, function(err, ...res) {
        if (err) return reject(err);

        if (res.length === 1) return resolve(res[0]);

        resolve(res);
      });
    });
  };
};

const exec = promisify(childProcess.execFile);

function md5(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex');
}

class ZigAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'wasm';
  }

  // parse will compile the file, placing it in a hashed fn wasm output in the
  // cache directory, reporting as appropriate.
  async parse() {
    this.outputPath = path.join(
      this.options.cacheDir,
      md5(this.name) + '.wasm',
    );
    const args = [
      'build-obj',
      '--release-fast',
      '--target-arch',
      'wasm32',
      '--target-os',
      'freestanding',
      this.name,
      '--output',
      this.outputPath,
    ];

    const x = await exec('zig', args);
    // x.stderr.pipe(process.stderr);
    // x.stdout.pipe(process.stdout);
  }

  // generate will eventually return { wasm: { path: this.outputPath } }
  async generate() {
    return {
      wasm: {
        path: this.outputPath,
      },
    };
  }
}

module.exports = ZigAsset;
