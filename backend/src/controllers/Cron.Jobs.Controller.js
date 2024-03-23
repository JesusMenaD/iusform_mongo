const moment = require('moment-timezone');

const AvisosAgenda = async (req, res) => {
  try {
    const fechaActual = moment().tz('America/Mexico_City').format();
    const fechaActual2 = new Date();

    res.json({ message: 'Avisos enviados', fecha: fechaActual, fecha2: fechaActual2 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AvisosAgenda
};
