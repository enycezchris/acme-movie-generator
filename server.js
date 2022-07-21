const express = require("express");
const app = express();
const path = require("path");
const { Movie, conn } = require("./db");
const port = process.env.PORT || 3000;
const { faker } = require("@faker-js/faker");

// APP USE
app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

// GET ROUTES
app.get("/api/movies", async function (req, res, next) {
  try {
    res.send(await Movie.findAll());
  } catch (e) {
    next(e);
  }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// POST ROUTES
app.post("/api/movies", async function (req, res, next) {
  try {
    res.status(201).send(await Movie.create(req.body));
  } catch (e) {
    next(e);
  }
});

// DELETE ROUTES
app.delete("/api/movies/:id", async function (req, res, next) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

// PUT ROUTES
app.put("/api/movies/:id", async function (req, res, next) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.send(movie);
  } catch (e) {
    next(e);
  }
});

const init = async () => {
  try {
    await conn.sync({ force: true });
    await Promise.all([
      Movie.create({ name: faker.music.songName() }),
      Movie.create({ name: faker.music.songName() }),
      Movie.create({ name: faker.music.songName() }),
      Movie.create({ name: faker.music.songName() }),
      Movie.create({ name: faker.music.songName() }),
    ]);
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
