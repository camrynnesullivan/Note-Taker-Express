// DEPENDECIES ===================================
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      data = JSON.parse(data);
      res.json(data);
    });
  });
  // POST API ====================================
  app.post("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, database) {
      if (err) throw err;
      database = JSON.parse(database);
      var newNote = req.body;

      if (database.length === 0) {
        newNote.id = 1;
      } else {
        const lastElementId = database[database.length - 1].id;
        newNote.id = lastElementId + 1;
      }
      database.push(newNote);
      database = JSON.stringify(database);
      fs.writeFile("db/db.json", database, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });

  // DELETE API ==================================

  app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id);
    fs.readFile("db/db.json", "utf8", function (err, database) {
      if (err) throw err;
      database = JSON.parse(database);

      var newDatabase = database.filter((note) => {
        return note.id !== id;
      });

      newDatabase = JSON.stringify(newDatabase);
      fs.writeFile("db/db.json", newDatabase, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });
};
