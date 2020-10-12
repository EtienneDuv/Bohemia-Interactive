const { handleFileUpload } = require('../services/fileService')
const { readDb } = require('../services/databaseService')

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index", { data: req.session.data, savedData: req.session.savedData });
  });

  app.get("/upload", async (req, res) => {
    await readDb(req)
    res.redirect('/');
  })

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
