import { Router } from "express";
import { changeStatus, createMotorista, getMotoristaById, getMotoristas, updateMotorista } from "../controllers/motoristas.controller.js";

const router = Router();

router.get("/", getMotoristas);
router.get("/:id", getMotoristaById);
router.post("/", createMotorista);
router.put("/:id", updateMotorista);
router.put("/changeStatus/:id", changeStatus);

export default router;