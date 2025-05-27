import { ObjectId } from "mongodb";
import { MongoLib } from "../../lib/mongo.js";
const mongoDB = new MongoLib();

// Crear usuario/trabajador
export const crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      email,
      area,
      tipoDocumento,
      numeroDocumento,
      fechaIngreso,
      usuario,
      contrasena,
    } = req.body;
    const db = await mongoDB.connect();
    const result = await db.collection("usuarios").insertOne({
      nombre,
      email,
      area,
      tipoDocumento,
      numeroDocumento,
      fechaIngreso: new Date(fechaIngreso),
      usuario,
      contrasena,
    });
    res.status(201).json({ message: "Trabajador creado", usuario: result.ops?.[0] || req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al crear trabajador", error: error.message });
  }
};

// Consultar usuarios/trabajadores
export const consultarUsuarios = async (req, res) => {
  try {
    const db = await mongoDB.connect();
    const query = {};

    if (req.query.numeroDocumento) {
      query.numeroDocumento = req.query.numeroDocumento;
    }

    const usuarios = await db.collection("usuarios").find(query).toArray();
    res.status(200).json(usuarios);
    console.log("Consulta de trabajadores exitosa", usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar trabajadores", error: error.message });
  }
};

// Validar usuario y contraseña (login)
export const loginUsuario = async (req, res) => {
  try {
    console.log("Intento de login:", req.body);
    const { usuario, contrasena } = req.body;
    const db = await mongoDB.connect();
    const user = await db.collection("usuarios").findOne({ usuario, contrasena });
    if (!user) {
      // Si no encuentra usuario, responde con error y loguea
      console.log("Login fallido: usuario o contraseña incorrectos");
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
    // Si encuentra usuario, responde con éxito y loguea
    console.log("Login exitoso", user.usuario);
    res.status(200).json({ message: "Login exitoso", usuario: user.usuario, nombre: user.nombre });
  } catch (error) {
    console.log("Error al iniciar sesión", error.message);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await mongoDB.connect();
    const result = await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};