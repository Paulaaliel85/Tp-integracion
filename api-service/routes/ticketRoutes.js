const express = require("express");
const router = express.Router();

const {
    crearTicket
} = require("../controllers/ticketController")

router.post("/", crearTicket);

module.exports = router;