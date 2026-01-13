import { pool } from "../config/db.js";

export const getMotoristas = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM motoristas WHERE IdStatus = 1`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMotoristaById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM motoristas WHERE idMotorista = ?`,
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Motorista no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMotorista = async (req, res) => {
  try {
    const { nombre, IdStatus, apellido, numeroLicencia } = req.body;
    const [result] = await pool.query(
      `INSERT INTO motoristas (nombre, IdStatus, apellido, numeroLicencia) VALUES (?, ?, ?, ?)`,
      [nombre, IdStatus || 1, apellido, numeroLicencia] 
    );
    res
      .status(201)
      .json({ idMotorista: result.insertId, nombre, IdStatus: IdStatus || 1, apellido, numeroLicencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMotorista = async (req, res) => {
  try {
    const { nombre, apellido, numeroLicencia } = req.body;
    const [result] = await pool.query(
      `UPDATE motoristas SET nombre = ?, IdStatus = ?, apellido = ?, numeroLicencia = ? WHERE idMotorista = ?`,
      [nombre, 1, apellido, numeroLicencia, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Motorista no encontrado" });
    res.json({ idMotorista: req.params.id, nombre, apellido, numeroLicencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE motoristas SET IdStatus = 2 WHERE idMotorista = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Motorista no encontrado" });

    res.json({ message: "Motorista marcado como eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

