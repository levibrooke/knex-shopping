const express = require(`express`);
const knex = require(`../knex/knex`);
const router = express.Router();

// router.get(`/`, (req, res) => {
//   console.log()
// });

router.get(`/:user_id`, (req, res) => {

})
.post(`/register`, (req, res) => {
  knex.raw('select users.email from users where users.email = ?', [req.body.email])
  .then(result => {
    if (result.rows.length > 0) {
      res.json({ "message": "User already exists" });
    }
    else {
      return result;
    }
  })
  .then(result => {
    return knex.raw('insert into users (email, password, created_at, updated_at) values (?, ?, ?, ?) RETURNING *', [req.body.email, req.body.password, 'now()', 'now()']);
  })
  .then(result => {
    res.json(result.rows);
  });
});



// knex.raw('insert into users (email, password) values (?, ?) RETURNING *', [req.body.email, req.body.password])
      // .then(result => {
      //   res.json(result);
      // });

module.exports = router;