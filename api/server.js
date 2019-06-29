const express = require("express");
const server = express();
server.use(express.json());

const Games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  }
];

server.post("/games", (req, res) => {
  if (req.body.title && req.body.genre) {
    Games.push({ title: req.body.title, genre: req.body.genre });
    res.status(201).json(req.body);
  } else {
    res.status(422).json({ message: "please provide a name and a title" });
  }
});

server.get("/games", (req, res) => {
  if (Games) {
    res.status(200).json(Games);
  } else {
    res.status(404).json({ message: "incorrect endpoint" });
  }
});

module.exports = server;
