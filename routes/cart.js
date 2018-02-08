const express = require(`express`);
const knex = require(`../knex/knex`);
const router = express.Router();


router.get(`/:user_id`, (req, res) => {
  return knex.raw('select * from users where id = ?', [req.params.user_id])
  .then(result => {
    if (!result.rows.length) {
      throw new Error(`User ID not found`);
    } else {
      return result;
    }
  })
  .then(result => {
    return knex.raw('select products.* from cart inner join products on cart.products_id = products.id where cart.user_id = ?', [req.params.user_id]);
  })
  .then(result => {
    if (!result.rows.length) {
      throw new Error(`User ID: ${req.params.user_id} has not added any products to cart.`);
    } else {
      return result;
    }
  })
  .then(result => {
    return res.json({ user_id: req.params.user_id, cart: result.rows });
  })
  .catch(err => {
    return res.status(400).json({ message: err.message });
  });
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

router.delete(`/:user_id/:product_id`, (req, res) => {
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
    return knex.raw('delete from cart where user_id = ? and products_id = ? RETURNING *', [req.params.user_id, req.params.product_id]);
  })
  .then(result => {
    if (!result.rows.length) {
      throw new Error(`Failed to delete from cart.`);
    } else {
      return result;
    }
  })
  .then(result => {
    return res.json({ success: true });
  })
  .catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

module.exports = router;