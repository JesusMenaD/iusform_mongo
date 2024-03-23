require('dotenv').config();
require('./config/database');
require('./utils/initialSetup');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index'); // Importando rutas con require

const path = require('path');

// const history = require('connect-history-api-fallback');

// import bodyParser from 'body-parser';
// Inicio de express
const app = express();

// Middlewares
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser());

app.use(morgan('dev'));
// Routes
app.use('/api', router);

// app.use(history());

// zona horaria de México

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// archivos estáticos (imágenes, css, js)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Subir imágenes (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// React app (frontend)
// app.use('/', express.static(path.join(__dirname, 'public')));

// export default app;
module.exports = app;
