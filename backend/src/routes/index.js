import { Router } from 'express';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'colors';
const PORT = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const removeExtension = fileName => {
  return fileName.split('.').shift();
};

// eslint-disable-next-line array-callback-return
readdirSync(__dirname).filter(file => {
  const fileWithOutExt = removeExtension(file);

  const skip = ['index'].includes(fileWithOutExt);

  import(`./${fileWithOutExt}.js`).then(module => {
    if (!skip) {
      router.use(`/${fileWithOutExt}`, module.default);

      const ruta = `http://localhost:${PORT}/api/${fileWithOutExt}`;

      console.log('CARGAR RUTA ----> ', ruta.green);
    }
  });
});

export default router;
