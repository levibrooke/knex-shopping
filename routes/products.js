const express = require(`express`);
const knex = require(`../knex/knex`);
const router = express.Router();


router.get(`/`, (req, res) => {
  return knex.raw('select * from products')
  .then(result => {
    return res.json(result.rows);
  })
  .catch(err => {
    return res.status(400).json({ message: err });
  });
});

router.get(`/:product_id`, (req, res) => {
  return knex.raw('select * from products where id = ?', [req.params.product_id])
  .then(result => {
    if (result.rows.length === 0) {
      throw new Error(`Product not found`);
    } else {
      return result;
    }
  })
  .then(result => {
    return res.json(result.rows[0]);
  })
  .catch(err => {
    return res.status(400).json({ message: err.message });
  });
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