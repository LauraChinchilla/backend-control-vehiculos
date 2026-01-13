import { pool } from "../config/db.js";

// Obtener todos los vehículos
export const getVehiculos = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM vehiculos WHERE IdStatus = 1`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un vehículo por id
export const getVehiculoById = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM vehiculos WHERE idVehiculo = ?`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Vehículo no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo vehículo
export const createVehiculo = async (req, res) => {
  try {
    const { placa, modelo } = req.body;
    const [result] = await pool.query(`INSERT INTO vehiculos (placa, modelo) VALUES (?, ?)`, [placa, modelo]);
    res.status(201).json({ idVehiculo: result.insertId, placa, modelo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un vehículo
export const updateVehiculo = async (req, res) => {
  try {
    const { placa, modelo } = req.body;
    const [result] = await pool.query(`UPDATE vehiculos SET placa = ?, modelo = ? WHERE idVehiculo = ?`, [placa, modelo, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vehículo no encontrado" });
    res.json({ idVehiculo: req.params.id, placa, modelo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Cambiar estado a Eliminado
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
