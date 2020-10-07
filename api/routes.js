module.exports = function (app) {
  app.get("/", (req, res) => {
    res.status(200);
    res.setHeader("Content-type", "text/html");
    res.render("index");
  });
}
