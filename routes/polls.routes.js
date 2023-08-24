const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json("Retrieve all polls");
  });
  
  router.post("/", (req, res, next) => {
    res.json("Create a new poll");
  });
  
  router.get("/:id", (req, res, next) => {
    res.json(`Retrieve poll with ID: ${req.params.id}`);
  });
  
  router.put("/:id", (req, res, next) => {
    res.json(`Update poll with ID: ${req.params.id}`);
  });
  
  router.delete("/:id", (req, res, next) => {
    res.json(`Delete poll with ID: ${req.params.id}`);
  });

module.exports = router;