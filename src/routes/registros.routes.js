import { Router } from "express";
import { getRegistros, createRegistro, getVtaRegistros, changeStatus, updateRegistro, getRegistrosHoy } from "../controllers/registros.controller.js";

const router = Router();

router.get("/", getRegistros);
router.post("/", createRegistro);
router.get("/registrosHoy/", getRegistrosHoy);
router.get("/vta_registros/", getVtaRegistros);
router.put("/changeStatus/:id", changeStatus);
router.put("/:id", updateRegistro);





export default router;
