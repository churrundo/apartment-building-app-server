const express = require("express");
const router = express.Router();
  
  router.post("/", (req, res, next) => {
    res.json("Post a new building");
  });
  
  router.get("/:id", (req, res, next) => {
    res.json(`Retrieve building with ID: ${req.params.id}`);
  });
  
  router.put("/:id", (req, res, next) => {
    res.json(`Update building with ID: ${req.params.id}`);
  });
  
  router.delete("/:id", (req, res, next) => {
    res.json(`Delete building with ID: ${req.params.id}`);
  });

module.exports = router;