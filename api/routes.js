const { getSHA1, getFileData } = require('../services/fileHandler')

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index", { data: req.session.data });
  });

  app.post("/upload", async (req, res) => {
    try {
      const data = await Promise.all([getFileData(req), getSHA1(req)]);
      const { name, size } = data[0];
      const sha1 = data[1];
      req.session.data.push({
        name: name,
        size: size,
        sha1: sha1
      });
      res.redirect('/');
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  })
}
