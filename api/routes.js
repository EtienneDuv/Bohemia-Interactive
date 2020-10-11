const { handleFileUpload } = require('../services/fileHandler')

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index", { data: req.session.data });
  });

  app.post("/upload", async (req, res) => {
    try {
      await handleFileUpload(req);
      res.redirect('/');
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  })
}
