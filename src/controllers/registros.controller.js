import { pool } from "../config/db.js";

export const getRegistros = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.idRegistro, 
        r.tipo, 
        r.fecha,
        r.hora,
        v.placa,
        m.nombre
      FROM registros r
        JOIN vehiculos v ON r.vehiculo_id = v.idVehiculo
        JOIN motoristas m ON r.motorista_id = m.idMotorista
      WHERE r.IdStatus = 1
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRegistro = async (req, res) => {
  const { 
    vehiculo_id, 
    motorista_id, 
    tipo, 
    fecha, 
    hora, 
    kilometrajeInicial, 
    kilometrajeFinal, 
    kilometraje
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO registros 
      (vehiculo_id, motorista_id, tipo, fecha, hora, kilometrajeInicial, kilometrajeFinal, kilometraje)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vehiculo_id, 
        motorista_id, 
        tipo, 
        fecha, 
        hora, 
        kilometrajeInicial, 
        kilometrajeFinal, 
        kilometraje
      ]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVtaRegistros = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM vw_RegistrosDetalle WHERE IdStatus = 1`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE Registros SET IdStatus = 2 WHERE idRegistro = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Registro no encontrado" });

    res.json({ message: "Registro marcado como eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRegistro = async (req, res) => {
  let { 
    vehiculo_id, 
    motorista_id, 
    tipo, 
    fecha, 
    hora, 
    kilometrajeInicial, 
    kilometrajeFinal, 
    kilometraje 
  } = req.body;

  try {
    const formatDateForMySQL = (d) => {
      const date = new Date(d);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const mi = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    };

    const fechaMySQL = formatDateForMySQL(fecha);

    await pool.query(
      `UPDATE registros
       SET vehiculo_id = ?, 
           motorista_id = ?, 
           tipo = ?, 
           fecha = ?, 
           hora = ?, 
           kilometrajeInicial = ?, 
           kilometrajeFinal = ?, 
           kilometraje = ?
       WHERE idRegistro = ?`,
      [
        vehiculo_id,
        motorista_id,
        tipo,
        fechaMySQL,
        hora,
        kilometrajeInicial,
        kilometrajeFinal,
        kilometraje,
        req.params.id
      ]
    );

    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar registro:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getRegistrosHoy = async (req, res) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const fechaHoy = `${yyyy}-${mm}-${dd}`;

    const [rows] = await pool.query(`
      SELECT 
        r.idRegistro, 
        r.tipo, 
        r.fecha, 
        r.hora,
        v.placa, 
        m.nombre
      FROM registros r
      JOIN vehiculos v ON r.vehiculo_id = v.idVehiculo
      JOIN motoristas m ON r.motorista_id = m.idMotorista
      WHERE r.IdStatus = 1
        AND DATE(r.fecha) = ?
    `, [fechaHoy]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
