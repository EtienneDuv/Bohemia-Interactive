const Busboy = require('busboy');
const sha1 = require('SHA1')

exports.handleFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let totalSize = 0;
      let sha1Concat = ''
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(`Filename:${filename}, encoding:${encoding}, mimetype:${mimetype}`);
        file.on('data', (data) => {
          sha1Concat += sha1(data)
          totalSize += data.length
        });
        file.on('end', () => {
          resolve(req.session.data.push({
            name: filename,
            size: totalSize,
            sha1: sha1(sha1Concat)
          }));
        });
      });
      req.pipe(busboy);
    } catch (err) {
      reject(err)
    }
  })
}