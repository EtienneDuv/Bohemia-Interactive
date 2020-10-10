const Busboy = require('busboy');
const sha1 = require('sha1')

exports.getSHA1 = (string) => {
  return sha1(string)
};

exports.busboyHandle = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalSize = 0;
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(`Filename:${filename}, encoding:${encoding}, mimetype:${mimetype}`);
        file.on('data', function (data) {
          totalSize += data.length
        });
        file.on('end', function () {
          resolve({
            name: filename,
            size: totalSize,
            sha1: 'SHA1'
          });
        });
      });
      req.pipe(busboy);
    } catch (error) {
      reject(err)
    }
  })
}