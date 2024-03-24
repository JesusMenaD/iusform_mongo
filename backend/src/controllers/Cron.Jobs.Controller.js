const moment = require('moment-timezone');
const ExpedientesAgendaUsuarios = require('../models/ExpedientesAgendaUsuarios');

const AvisosAgenda = async (req, res) => {
  try {
    // Asegúrate de que 'ahora' representa la fecha y hora actual en la zona horaria correcta
    const ahora = moment().tz('America/Mexico_City').startOf('minute');

    // Sumar un minuto para establecer el límite superior del rango de búsqueda
    const fechaLimite = ahora.clone().add(1, 'minutes');

    // Convertir 'ahora' y 'fechaLimite' a UTC para la comparación en MongoDB
    // Esto es importante ya que MongoDB maneja las fechas en UTC
    const ahoraUTC = ahora.clone().utc().toDate();
    const fechaLimiteUTC = fechaLimite.clone().utc().toDate();

    // Realizar la consulta utilizando las fechas en UTC
    const expedientes = await ExpedientesAgendaUsuarios.find({
      estatus: 'Pendiente',
      fechaRecordatorio: {
        $gte: ahoraUTC,
        $lt: fechaLimiteUTC
      }
    });

    // Convertir 'ahora' y 'fechaLimite' a String para una visualización correcta en la respuesta
    res.status(200).json({
      data: expedientes,
      ahora: ahora.format(),
      fechaLimite: fechaLimite.format()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AvisosAgenda
};
