const BancosSchema = require('../models/Bancos.js');

const getBancos = async (req, res) => {
  try {
    const bancos = await BancosSchema.find().sort({ banco: 1 });
    res.status(200).json(bancos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getBancos
};
