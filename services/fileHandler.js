const Busboy = require('busboy');
const crypto = require('crypto');

exports.handleFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let totalSize = 0;
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(`Filename:${filename}, encoding:${encoding}, mimetype:${mimetype}`);
        const sha1 = crypto.createHash('sha1').setEncoding('hex');
        file.on('data', (data) => {
          sha1.update(data);
          totalSize += data.length;
        });
        file.on('end', () => {
          const finalSha = sha1.end().read()
          console.log(finalSha)
          resolve(req.session.data.push({
            name: filename,
            size: totalSize,
            sha1: finalSha
          }));
        });
      });
      req.pipe(busboy);
    } catch (err) {
      reject(err)
    }
  })
}