import { MongoLib } from "../../lib/mongo.js";
import { ObjectId } from "mongodb";
const mongoDB = new MongoLib();

// Crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, especie, propietario, telefono, direccion, usuario, contrasena } = req.body;
    if (!nombre || !especie || !propietario || !telefono || !direccion || !usuario || !contrasena) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const db = await mongoDB.connect();
    const result = await db.collection("clientes").insertOne({
      nombre,
      especie,
      propietario,
      telefono,
      direccion,
      usuario,
      contrasena,
      fechaRegistro: new Date(),
    });
    res.status(201).json({
      message: "Cliente registrado exitosamente",
      cliente: result.ops?.[0] || req.body,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar cliente", error: error.message });
  }
};

// Login cliente
export const loginCliente = async (req, res) => {
  try {
    console.log("Intento de login:", req.body);
    const { usuario, contrasena } = req.body;
    const db = await mongoDB.connect();
    const user = await db.collection("clientes").findOne({
      usuario: String(usuario).trim(),
      contrasena: String(contrasena).trim(),
    });
    if (!user) {
      console.log("Login fallido: usuario o contraseña incorrectos");
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
    console.log("Login exitoso", user.usuario);
    res.status(200).json({
      message: "Login exitoso",
      usuario: user.usuario,
      nombre: user.nombre,
      rol: "cliente",
    });
  } catch (error) {
    console.log("Error al iniciar sesión", error.message);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

// Actualizar cliente
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especie, propietario, telefono, direccion, usuario, contrasena } = req.body;
    if (!nombre || !especie || !propietario || !telefono || !direccion || !usuario || !contrasena) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const db = await mongoDB.connect();
    const result = await db.collection("clientes").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          nombre,
          especie,
          propietario,
          telefono,
          direccion,
          usuario,
          contrasena,
        },
      },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({
      message: "Cliente actualizado exitosamente",
      cliente: result.value,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error: error.message });
  }
};