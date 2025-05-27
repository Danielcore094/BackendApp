import { MongoLib } from "../../lib/mongo.js";
const mongoDB = new MongoLib();

// Crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion } = req.body;
    if (!nombre || !correo || !telefono || !direccion) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const db = await mongoDB.connect();
    const result = await db.collection("clientes").insertOne({
      nombre,
      correo,
      telefono,
      direccion,
      fechaRegistro: new Date(),
    });
    res.status(201).json({ message: "Cliente registrado exitosamente", cliente: result.ops?.[0] || req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar cliente", error: error.message });
  }
};