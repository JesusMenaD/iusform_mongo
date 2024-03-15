import BancosSchema from '../models/Bancos.js';

export const getBancos = async (req, res) => {
  try {
    const bancos = await BancosSchema.find().sort({ banco: 1 });
    res.status(200).json(bancos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
