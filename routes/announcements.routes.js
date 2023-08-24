const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json("Retrieve all announcements");
  });
  
  router.post("/", (req, res, next) => {
    res.json("Post a new announcement");
  });
  
  router.get("/:id", (req, res, next) => {
    res.json(`Retrieve announcement with ID: ${req.params.id}`);
  });
  
  router.put("/:id", (req, res, next) => {
    res.json(`Update announcement with ID: ${req.params.id}`);
  });
  
  router.delete("/:id", (req, res, next) => {
    res.json(`Delete announcement with ID: ${req.params.id}`);
  });

module.exports = router;