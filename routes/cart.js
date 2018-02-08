const express = require(`express`);
const knex = require(`../knex/knex`);
const router = express.Router();


router.get(`/:user_id`, (req, res) => {
  // return knex.raw('select products.*, cart.user_id from products inner join cart on products.')
});

router.post(`/:user_id/:product_id`, (req, res) => {
  return knex.raw('select * from users where id = ?', [req.params.user_id])
  .then(result => {
    if (!result.rows.length) {
      throw new Error(`User ID not found`);
    } else {
      return result;
    }
  })
  .then(result => {
    return knex.raw('select * from products where id = ?', [req.params.product_id]);
  })
  .then(result => {
    if (!result.rows.length) {
      throw new Error(`Product ID not found`);
    } else {
      return result;
    }
  })
  .then(result => {
    return knex.raw('insert into cart (user_id, products_id) values (?, ?)', [req.params.user_id, req.params.product_id]);
  })
  .then(result => {
    return res.json({ success: true });
  })
  .catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

module.exports = router;

// select products.*, cart.user_id
// from products
// inner join cart on products.cart_id = cart.id
// where cart.user_id = req.params.user_id;