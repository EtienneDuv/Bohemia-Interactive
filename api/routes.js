const { getSHA1 } = require('../services/fileHandler')

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
      if (!req.files) {
        req.session.data.push({ name: 'Failed upload', size: '' });
        res.redirect('/');
      } else {
        const { name, size, data } = req.files.uploaded
        req.session.data.push({
          name: name.substring(0, 25),
          size: size,
          sha1: getSHA1(data)
        });
        // #TODO Db save
        res.redirect('/');
      }
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  })
}
