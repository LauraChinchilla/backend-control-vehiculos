import { pool } from "../config/db.js";

export const getRegistros = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.idRegistro, r.tipo, r.fecha,v.placa,m.nombre
      FROM registros r
        JOIN vehiculos v ON r.vehiculo_id = v.idVehiculo
        JOIN motoristas m ON r.motorista_id = m.idMotorista`);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRegistro = async (req, res) => {
  const { vehiculo_id, motorista_id, tipo, fecha } = req.body;

  try {
    await pool.query(
      `INSERT INTO registros (vehiculo_id, motorista_id, tipo, fecha)
       VALUES (?, ?, ?, ?)`,
      [vehiculo_id, motorista_id, tipo, fecha]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
