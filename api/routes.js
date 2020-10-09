module.exports = function (app) {
  app.get("/", (req, res) => {
    if (!req.session.data) {
      req.session.data = [];
    }
    console.log(req.session.data)
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
        console.log("YES", req.files.uploaded)
        req.session.data.push({ name: 'data', size: 'size' });
        // #TODO Db save
        res.redirect('/');
      }
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  })
}
