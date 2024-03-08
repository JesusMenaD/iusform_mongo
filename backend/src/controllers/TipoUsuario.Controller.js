import TipoUsuarioModel from '../models/TipoUsuarios.js';

export const getTipoUsuarios = async (req, res) => {
  const { despacho } = req.params;
  const { estatus } = req.query;

  const query = {
    despacho
  };

  if (estatus) {
    query.estatus = estatus;
  }

  try {
    const tipoUsuarios = await TipoUsuarioModel.find(query);
    res.status(200).json(tipoUsuarios);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
