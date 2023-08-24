const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    res.json("Retrieve all users");
  });
  
  router.get("/:id", (req, res, next) => {
    res.json(`Retrieve details for user with ID: ${req.params.id}`);
  });
  
  router.post("/", (req, res, next) => {
    res.json("Create a new user");
  });
  
  router.put("/:id", (req, res, next) => {
    res.json(`Update user with ID: ${req.params.id}`);
  });
  
  router.delete("/:id", (req, res, next) => {
    res.json(`Delete user with ID: ${req.params.id}`);
  });

module.exports = router;