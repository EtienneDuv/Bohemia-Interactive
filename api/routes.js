const { getSHA1 } = require('../services/fileHandler')
const Busboy = require('busboy');

module.exports = function (app) {
  app.get("/", (req, res) => {
    if (!req.session.data) {
      req.session.data = [];
    }
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index", { data: req.session.data });
  });

  app.post("/upload", async (req, res) => {
    try {
      let totalSize = 0;
      const busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(`Filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
        file.on('data', function (data) {
          totalSize += data.length
        });
        file.on('end', function () {
          req.session.data.push({
            name: filename,
            size: totalSize,
            sha1: 'SHA1'
          });
          res.redirect('/');
        });
      });
      req.pipe(busboy);
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  })
}
