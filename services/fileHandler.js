const crypto = require('crypto');
const Busboy = require('busboy');

exports.getSHA1 = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha1').setEncoding('binary');
      hash.on('finish', () => {
        resolve(hash.read())
      })
      req.pipe(hash)
    } catch (err) {
      reject(err);
    }
  })
};

exports.getFileData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalSize = 0;
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(`Filename:${filename}, encoding:${encoding}, mimetype:${mimetype}`);
        file.on('data', (data) => {
          totalSize += data.length
        });
        file.on('end', () => {
          resolve({
            name: filename,
            size: totalSize
          });
        });
      });
      req.pipe(busboy);
    } catch (err) {
      reject(err)
    }
  })
}