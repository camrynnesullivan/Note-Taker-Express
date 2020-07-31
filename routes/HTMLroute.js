// DEPENDECIES ===================================
const path = require("path");
// Display notes.html while using the GET METHOD
module.exports = function (app) {
  app.get("*", function (req, res) {
    res.sendfile(path.join(__dirname, "../public/index.html"));
  });
  // display notes.html while using the GET METHOD
  app.get("/notes", function (req, res) {
    res.sendfile(path.join(__dirname, "../public/notes.html"));
  });
};
