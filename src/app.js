import dotenv from "dotenv";
dotenv.config(); 

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);


import express from "express";
import cors from "cors";

import registrosRoutes from "./routes/registros.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import motoristasRoutes from "./routes/motoristas.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/registros", registrosRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/motoristas", motoristasRoutes);

app.get("/", (req, res) => {
  res.send("API Control de Vehículos funcionando 🚗");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
