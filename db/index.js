const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_movies_db"
);
const { STRING, INTEGER } = Sequelize;

const Movie = conn.define("movie", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: INTEGER,
    defaultValue: 3,
  },
});

Movie.addHook("beforeUpdate", (movie) => {
  if (movie.rating > 5 || movie.rating < 1) {
    throw new Error("Movie rating must be between 1 and 5");
  }
});
module.exports = {
  conn,
  Movie,
};
