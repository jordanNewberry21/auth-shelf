const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  // YOUR CODE HERE
  // Joins the two tables by species_name and class_name by using the class_id with the class table id
  let queryString = `SELECT * FROM "item";`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.user", req.user);
  let sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);`;
  pool
    .query(sqlText, [req.body.description, req.body.url, req.user.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error adding item to DB", error);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id/:user_id", rejectUnauthenticated, (req, res) => {
  console.log("req.user", req.user);
  console.log("req.body:", req.body);
  console.log("req.params:", req.params);
  let sqlText = `DELETE from "item" WHERE $1 = $2 AND id=$3;`;
  pool
    .query(sqlText, [req.params.user_id, req.user.id, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error deleting item from DB", error);
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id/:user_id", rejectUnauthenticated, (req, res) => {
  console.log('Req.body', req.body)
  const query =
    'UPDATE "item" SET "description"=$1 WHERE $2 = $3 AND id=$4';
  pool
    .query(query, [req.body.state.description, req.user.id, req.body.userId, req.body.itemId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});
/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // GET /count route code here
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // GET item route code here
});

module.exports = router;
