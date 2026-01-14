import { pool } from "../config/db.js";

export const getVehiculos = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM vta_vehiculos WHERE IdStatus = 1`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehiculoById = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM vehiculos WHERE idVehiculo = ?`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Vehículo no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVehiculo = async (req, res) => {
  try {
    const { placa, modelo, marca } = req.body;
    const [result] = await pool.query(`INSERT INTO vehiculos (placa, modelo, marca) VALUES (?, ?, ?)`, [placa, modelo, marca]);
    res.status(201).json({ idVehiculo: result.insertId, placa, modelo, marca });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVehiculo = async (req, res) => {
  try {
    const { placa, modelo, marca } = req.body;
    const [result] = await pool.query(`UPDATE vehiculos SET placa = ?, modelo = ?, marca=? WHERE idVehiculo = ?`, [placa, modelo, marca, req.params.id,]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vehículo no encontrado" });
    res.json({ idVehiculo: req.params.id, placa, modelo, marca });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const changeStatus = async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE vehiculos SET IdStatus = 2 WHERE idVehiculo = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Vehículo no encontrado" });

    res.json({ message: "Vehículo marcado como eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
