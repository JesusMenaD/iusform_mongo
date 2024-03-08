import EstadosSchema from '../models/Estados.js';

export const getEstados = async (req, res) => {
  try {
    const estados = await EstadosSchema.find().sort({ nombre: 1 });

    const data = estados.map((item) => {
      const value = item._id;
      const label = item.nombre;
      return {
        value,
        label
      };
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
