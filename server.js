const express = require(`express`);
const app = express();
const knex = require(`./knex/knex`);
const bodyParser = require(`body-parser`);

const PORT = process.env.PORT || 3000;

// routes
const users = require(`./routes/users`);
const products = require(`./routes/products`);
const cart = require(`./routes/cart`);

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/users`, users);
// app.use(`/products`, products);
// app.use(`/cart`, cart);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server listening on port: ${PORT}`);
});