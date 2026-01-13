import { Router } from "express";
import { getVehiculos, getVehiculoById, createVehiculo, updateVehiculo, changeStatus } from "../controllers/vehiculos.controller.js";

const router = Router();

router.get("/", getVehiculos);
router.get("/:id", getVehiculoById);
router.post("/", createVehiculo);
router.put("/:id", updateVehiculo);
router.put("/changeStatus/:id", changeStatus);

export default router;
