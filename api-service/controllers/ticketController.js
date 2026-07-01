const { v4: uuidv4 } = require("uuid");
const { getChannel } = require("../rabbitmq/connection");
const fs = require("fs");
const path = require("path");

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

    // Routing por prioridad
    const routingKey = `ticket.created.${priority}`;

    channel.publish(
        process.env.EXCHANGE_NAME,
        routingKey,
        Buffer.from(JSON.stringify(evento))
    );

    console.log("\n==== Ticket Creado y Publicado en RabbitMQ ===");
    console.log("Evento publicado");
    console.log("Routing Key:", routingKey);
    console.log(evento);

    // Actualizar métricas
    const metricsPath = path.join(__dirname, "../../metrics.json");

    let metrics = {};

    if (fs.existsSync(metricsPath)) {
        metrics = JSON.parse(fs.readFileSync(metricsPath));
    }

    const hoy = new Date().toISOString().split("T")[0];

    metrics[hoy] = (metrics[hoy] || 0) + 1;

    fs.writeFileSync(
        metricsPath,
        JSON.stringify(metrics, null, 2)
    );

    // Respuesta al cliente
    res.status(201).json({
        mensaje: "Ticket creado correctamente",
        evento
    });

};

module.exports = {
    crearTicket
};