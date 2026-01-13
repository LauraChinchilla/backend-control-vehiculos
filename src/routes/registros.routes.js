import { Router } from "express";
import { getRegistros, createRegistro } from "../controllers/registros.controller.js";

const router = Router();

router.get("/", getRegistros);
router.post("/", createRegistro);


export default router;
