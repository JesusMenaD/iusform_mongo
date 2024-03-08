import RegimenFiscal from '../models/RegimenFiscales.js';

export const getRegimenFiscal = async (req, res) => {
  try {
    const regimenFiscal = await RegimenFiscal.find();

    const data = regimenFiscal.map((item) => {
      const regimen = item.regimen;
      const descripcion = item.descripcion;
      const fisica = item.fisica; // Si o No
      const moral = item.moral; // Si o No
      let label = regimen + ' - ' + descripcion;

      if (fisica === 'Si') {
        label += ' (Física)';
      }

      if (moral === 'Si') {
        label += ' (Moral)';
      }

      return {
        value: regimen,
        label

      };
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
