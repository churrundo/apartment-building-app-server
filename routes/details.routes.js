const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    res.json("Retrieve all details");
  });
  
  router.post("/", (req, res, next) => {
    res.json("Post a new detail");
  });
  
  router.get("/:id", (req, res, next) => {
    res.json(`Retrieve detail with ID: ${req.params.id}`);
  });
  
  router.put("/:id", (req, res, next) => {
    res.json(`Update detail with ID: ${req.params.id}`);
  });
  
  router.delete("/:id", (req, res, next) => {
    res.json(`Delete detail with ID: ${req.params.id}`);
  });

module.exports = router;