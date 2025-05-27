import { Router } from "express";
import { crearUsuario, consultarUsuarios, loginUsuario, eliminarUsuario } from "../controllers/usuario.controller.js";
import { resultadoValidacion } from "../../helpers/validateHelper.js";
import { validarCrear, validarCliente } from "../../middleware/validation/validation.js";
import { crearCliente } from "../controllers/cliente.controller.js";

const router = Router();

// Rutas
router.post("/usuarios", validarCrear, resultadoValidacion, crearUsuario);
router.get("/usuarios", consultarUsuarios);
router.delete("/usuarios/:id", eliminarUsuario);
router.post("/login", loginUsuario);
router.post("/clientes", validarCliente, resultadoValidacion, crearCliente);

export default router;