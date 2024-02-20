import ModulosSchema from '../models/Modulos.js';
const APP_URL = process.env.APP_URL;
export const getModulos = async (req, res) => {
  try {
    const { tipo, estatus = 'Activo' } = req.query;

    // Establecer el valor por defecto para estatus
    const query = { estatus };

    // Agregar tipo a la consulta si está presente
    if (tipo) {
      query.tipo = tipo.trim();
    }

    const findModulos = await ModulosSchema.find(query).sort({ orden: 1 });

    findModulos.forEach((modulo) => {
      modulo.imagen = `${APP_URL}/uploads/modules/white/${modulo.imagen}`;
    });

    const modulos = findModulos.map((modulo) => {
      if (modulo.padre === '') {
        return modulo;
      } else {
        return null;
      }
    }).filter(modulo => modulo !== null); // Eliminar los elementos nulos del array

    const modulosConHijos = modulos.map((modulo) => {
      const child = findModulos.filter((hijo) => hijo.padre === modulo.enlace);
      return { ...modulo._doc, child };
    });

    res.status(200).json({ data: modulosConHijos });
  } catch (error) {
    res.status(404).json({ message: error.message, line_error: error.stack });
  }
};
