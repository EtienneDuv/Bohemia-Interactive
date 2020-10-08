module.exports = async function (app) {
  app.get("/", (req, res) => {
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index");
  });

  app.post("/upload", (req, res) => {
    console.log(req.body)
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index");
  })
}
