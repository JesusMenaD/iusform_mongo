import RecursosIncidenciasExpedienteModel from '../models/ExpedientesRecursosIncidencias.js';

export const getRecursosIncidencias = async (req, res) => {
  const { despacho, expediente } = req.params;
  const { tipo, page = 1 } = req.query;

  try {
    const options = {
      page,
      limit: 20,
      sort: { fecha: -1 },
      populate: [
        {
          path: 'recursoIncidencia'
          // select: 'tipo descripcion titulo'
        },
        {
          path: 'creadoPor',
          select: 'nombre apellidoPaterno apellidoMaterno'
        }
      ]
    };
    const query = {
      despacho,
      expediente
    };

    if (tipo) {
      query.tipo = tipo;
    }

    const recursosIncidencias = await RecursosIncidenciasExpedienteModel.paginate(query, options);

    res.status(200).json({ recursosIncidencias });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
