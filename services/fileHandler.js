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
          resolve(req.session.data.push({
            name: trimName(filename),
            size: formatBytes(totalSize),
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

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const trimName = (string, length = 15) => {
  return string.length > length ? string.substring(0, length - 3) + "..." : string;
}