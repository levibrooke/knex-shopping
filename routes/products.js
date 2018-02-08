const express = require(`express`);
const knex = require(`../knex/knex`);
const router = express.Router();


router.get(`/`, (req, res) => {

});

router.get(`/:product_id`, (req, res) => {

});

router.post(`/new`, (req, res) => {
  let {title, description, inventory, price} = req.body;
  if (!(title && description && inventory && price)) {
    return res.status(400).json({ message: `Must POST all product fields` });
  }
  return knex.raw('insert into products (title, description, inventory, price) values (?, ?, ?, ?) RETURNING *', [title, description, inventory, price])
  .then(result => { 
    return res.json(result.rows[0]);
  })
  .catch(err => {
    return res.status(400).json({message: err.message });
  });
});

module.exports = router;