//modulos de node.js
const express = require("express");
const router = express.Router();
const cartController = require("./cartController");

router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);
module.exports = router;