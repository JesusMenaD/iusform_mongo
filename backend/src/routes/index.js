const Router = require('express');
const { readdirSync } = require('fs');
// const { PORT } = require("../config/index.js");
require('colors');

const router = Router();

const pathRouter = `${__dirname}`;
const PORT = 3000;

const removeExtension = (fileName) => {
  return fileName.split('.').shift();
};

// eslint-disable-next-line array-callback-return
readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ['index'].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    const ruta = `http://localhost:${PORT}/api/${fileWithOutExt}`;
    console.log('CARGAR RUTA ---->', ruta.green);
  }
});

module.exports = router;
