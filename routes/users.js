const express = require(`express`);
const knex = require(`../knex/knex`);
const router = express.Router();


router.get(`/:user_id`, (req, res) => {
  knex.raw('select * from users where users.id = ?', [req.params.user_id])
  .then(result => {
    if (result.rows.length === 0) {
      throw new Error(`User not found`);
    } else {
      return res.json(result.rows[0]);
    }
  })
  .catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

router.post(`/login`, (req, res) => {
  let {email, password} = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: 'Missing email or password' });
  }
  email = email.toLowerCase();

  knex.raw('select * from users where users.email = ?', [email])
  .then(result => {
    if (!result.rows.length) {
      throw new Error(`User not found`);
    } else {
      return result;
    }
  })
  .then(result => {
    if (result.rows[0].password !== password) {
      throw new Error(`Incorrect password`);
    } else {
      return res.json(result.rows[0]);
    }
  })
  .catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

router.post(`/register`, (req, res) => {
  let {email, password} = req.body;  // -> let email = req.body.email; let password = req.body.password;
  if (!(email && password)) { // -> (!email || !password)
    return res.status(400).json({ message: 'Missing email or password'});
  }
  email = email.toLowerCase();

  return knex.raw('select users.email from users where users.email = ?', [email])
  .then(result => {
    if (result.rows.length > 0) {
      throw new Error(`User already exists`);;
    } else {
      return result;
    }
  })
  .then(result => {
    return knex.raw('insert into users (email, password, created_at, updated_at) values (?, ?, ?, ?) RETURNING *', [email, password, 'now()', 'now()']);
  })
  .then(result => {
    return res.json(result.rows[0]);
  })
  .catch(err => {
    return res.status(400).json({ "message": err.message });
  });
});

module.exports = router;