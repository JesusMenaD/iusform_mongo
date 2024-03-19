// import 'dotenv/config';
// import './config/database.js';
// import './utils/initialSetup.js';
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import router from './routes/index.js'; // <--- importar rutas
// import path from 'path';
// import { fileURLToPath } from 'url';
// import history from 'connect-history-api-fallback';
require('dotenv').config();
require('./config/database');
require('./utils/initialSetup');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index'); // Importando rutas con require

// Para manejar las rutas de archivos con __dirname y __filename en ES Modules,
// se necesita convertir la importación de 'path' y 'url' a CommonJS.
const path = require('path');
// La conversión de URL a ruta de archivo no es necesaria en CommonJS para el uso básico, pero se incluye por si acaso.
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const history = require('connect-history-api-fallback');

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

app.use(history());

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// archivos estáticos (imágenes, css, js)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Subir imágenes (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// React app (frontend)
app.use('/', express.static(path.join(__dirname, 'public')));

// export default app;
module.exports = app;
