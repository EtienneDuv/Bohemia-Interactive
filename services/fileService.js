const Busboy = require('busboy');
const crypto = require('crypto');
const { writeDb } = require('./databaseService')
const { formatBytes, trimName } = require('./formattingService')

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
          const finalSha1 = sha1.end().read()
          writeDb(filename, totalSize, finalSha1)
          resolve(req.session.data.push({
            name: trimName(filename),
            size: formatBytes(totalSize),
            sha1: finalSha1
          }));
        });
      });
      req.pipe(busboy);
    } catch (err) {
      reject(err)
    }
  })
}
