const crearTicket = (req, res) => {
    console.log("Ticket recibido");
    console.log(req.body);

    res.status(201).json({
        mensaje: "Ticket recibido correctamente"
    });
};

module.exports = {
    crearTicket
};