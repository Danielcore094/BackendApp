import { Router } from "express";
import { crearUsuario, consultarUsuarios, loginUsuario, eliminarUsuario } from "../controllers/usuario.controller.js";
import { resultadoValidacion } from "../../helpers/validateHelper.js";
import { validarCrear, validarCliente } from "../../middleware/validation/validation.js";
import { crearCliente } from "../controllers/cliente.controller.js";
import { actualizarCliente } from "../controllers/cliente.controller.js"; 
import { loginCliente } from "../controllers/cliente.controller.js";

const router = Router();

// Rutas
router.post("/usuarios", validarCrear, resultadoValidacion, crearUsuario);
router.get("/usuarios", consultarUsuarios);
router.delete("/usuarios/:id", eliminarUsuario);
router.post("/loginUsuario", loginUsuario);
router.post("/clientes", validarCliente, resultadoValidacion, crearCliente);
router.put("/clientes/:id", validarCliente, resultadoValidacion, actualizarCliente); 
router.post("/loginCliente", loginCliente); 

export default router;