const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");

// User routes
router.use("/users", userRoutes);

module.exports = router;