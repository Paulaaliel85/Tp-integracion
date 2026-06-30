const { v4: uuidv4 } = require("uuid");
const { getChannel } = require("../rabbitmq/connection");

const crearTicket = (req, res) => {

    const { title, description, priority } = req.body;

    const evento = {
        eventId: uuidv4(),
        type: "ticket.created",
        occurredAt: new Date().toISOString(),
        version: 1,
        payload: {
            ticketId: `TCK-${Date.now()}`,
            title,
            description,
            priority
        }
    };

    const channel = getChannel();
    if (!channel) {
    return res.status(500).json({
        mensaje: "RabbitMQ no está disponible."
    });
}

    channel.publish(
        process.env.EXCHANGE_NAME,
        "ticket.created",
        Buffer.from(JSON.stringify(evento))
    );

    console.log(" Evento publicado:");
    console.log(evento);

    res.status(201).json({
        mensaje: "Ticket creado correctamente",
        evento
    });

};

module.exports = {
    crearTicket
};