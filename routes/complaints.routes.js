const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json("Retrieve all complaints");
  });
  
  router.post("/", (req, res, next) => {
    res.json("Post a new complaint");
  });
  
  router.get("/:id", (req, res, next) => {
    res.json(`Retrieve complaint with ID: ${req.params.id}`);
  });
  
  router.put("/:id", (req, res, next) => {
    res.json(`Update complaint with ID: ${req.params.id}`);
  });
  
  router.delete("/:id", (req, res, next) => {
    res.json(`Delete complaint with ID: ${req.params.id}`);
  });

module.exports = router;