const ExpedienteModel = require('../models/Expedientes.js');
const ExpedientesUsuarioModel = require('../models/ExpedientesUsuarios.js');
const FoliosModel = require('../models/ExpedientesFolios.js');
const EtapasProcesalesModel = require('../models/EtapasProcesales.js');
const MateriaModel = require('../models/Materias.js');
const JuzgadosModel = require('../models/Juzgados.js');
const ExpedientesMovimientosModel = require('../models/ExpedientesMovimientos.js');
const AsuntosModel = require('../models/Asuntos.js');
const DespachoModel = require('../models/Despachos.js');
const UsuarioModel = require('../models/Usuarios.js');
const { MovimientosExpedienteHTML } = require('../Mail/MovimientosExpedienteHTML.js');
const { sendMail } = require('../config/mail.js');
const RecursosIncidenciasExpedienteModel = require('../models/ExpedientesRecursosIncidencias.js');
const RecursosExpediente = require('../models/RecursosIncidencias.js');
const ExpedienteAgenda = require('../models/ExpedientesAgenda.js');
const ExpedienteAgendaUsuarios = require('../models/ExpedientesAgendaUsuarios.js');
const ExpedientesPartes = require('../models/ExpedientesPartesInvolucradas.js');
const ExpedientesNotas = require('../models/ExpedientesNotas.js');
const ExpedientesGastos = require('../models/ExpedientesGastos.js');
const ExpedientesAdjuntos = require('../models/ExpedientesAdjuntos.js');
const ExpedientesPautas = require('../models/ExpedientesPautas.js');
const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const { deleteFile } = require('../config/FuntionGlobal.js');
const path = require('path');

const createExpediente = async (req, res) => {
  try {
    const { despacho } = req.params;
    const fecha = new Date();
    const { numeroExpediente = '', titulo, fechaInicio = new Date(), cliente, procedimiento, juzgado, materia, etapaProcesal, etapaOpcional, asunto, usuario } = req.body;

    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!titulo) {
      return res.status(400).json({ message: 'El título es requerido' });
    }

    if (!cliente) {
      return res.status(400).json({ message: 'El cliente es requerido' });
    }

    if (!procedimiento) {
      return res.status(400).json({ message: 'El procedimiento es requerido' });
    }

    if (!juzgado) {
      return res.status(400).json({ message: 'El juzgado es requerido' });
    }

    if (!usuario) {
      return res.status(400).json({ message: 'El usuario es requerido' });
    }

    if (!asunto) {
      return res.status(400).json({ message: 'El asunto es requerido' });
    }

    let numeroExpedienteInterno = '';
    if (materia) {
      const findFolio = await FoliosModel.findOne({ despacho, materia });

      if (findFolio) {
        const { clave, folio } = findFolio;
        numeroExpedienteInterno = `${clave}-${folio}`;

        findFolio.folio = folio + 1;
        await findFolio.save();
      }
    }
    // busca el usuario que lo va crear

    const findJuzgado = await JuzgadosModel.findById(juzgado);
    const { _id, nombre } = findJuzgado;

    const juzgadoOBJ = {
      nombre,
      juzgado: _id
    };

    const objExpediente = {
      despacho,
      procedimiento,
      numeroExpediente,
      numeroExpedienteInterno,
      titulo,
      fechaInicio,
      cliente,
      asunto,
      juzgado: juzgadoOBJ,
      creadoPor: usuario
    };

    if (procedimiento === 'No litigioso') {
      objExpediente.materia = undefined;
      objExpediente.etapaProcesal = undefined;
    } else {
      if (materia) { // el id de la materia
        const findMateria = await MateriaModel.findById(materia);
        const { _id, nombre } = findMateria;

        objExpediente.materia = {
          nombre,
          materia: _id
        };
      }

      if (etapaProcesal) { // el id de la etapa procesal
        const findEtapaProcesal = await EtapasProcesalesModel.findById(etapaProcesal);
        const { _id, nombre } = findEtapaProcesal;

        objExpediente.etapaProcesal = {
          nombre,
          etapa: _id
        };
      } else {
        objExpediente.etapaProcesal = {
          nombre: etapaOpcional ?? '',
          etapa: undefined
        };
      }
    }

    const despachoObj = await DespachoModel.findById(despacho);

    if (!despachoObj) {
      return res.status(404).json({ message: 'El despacho no existe' });
    }

    const { contadorExp } = despachoObj;

    const { contador, limite, vigencia } = contadorExp;

    if (vigencia < fecha) {
      return res.status(400).json({ message: 'El contador de expedientes ha caducado' });
    }

    if (contador >= limite) {
      return res.status(400).json({ message: 'El contador de expedientes ha llegado a su límite' });
    }

    despachoObj.contadorExp.contador = contador + 1;

    await despachoObj.save();

    const expediente = await ExpedienteModel.create(objExpediente);

    const expedienteUsuarioObj = {
      despacho,
      expediente,
      usuario,
      rol: 'Creador'
    };

    await ExpedientesUsuarioModel.create(expedienteUsuarioObj);

    const { nombre: nombreUsuario, apellidoPaterno, apellidoMaterno } = await UsuarioModel.findById(usuario);

    const movimiento = {
      despacho,
      expediente,
      creadoPor: usuario,
      titulo: 'Creación del expediente',
      fecha: new Date(),
      descripcion: `El expediente fue creado por el usuario ${nombreUsuario} ${apellidoPaterno} ${apellidoMaterno}`
    };

    await ExpedientesMovimientosModel.create(movimiento);

    res.status(201).json({
      message: 'El expediente se creó correctamente',
      expediente,
      despacho: despachoObj
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getExpedientesByUsuario = async (req, res) => {
  try {
    const { despacho, usuario } = req.params;
    const { estatus, page = 1, search } = req.query;

    // Verificar si despacho y usuario están presentes en la solicitud
    if (!despacho || !usuario) {
      return res.status(400).json({ message: 'El despacho y el usuario son requeridos' });
    }

    const options = {
      page,
      limit: 10,
      sort: {
        estatus: 1,
        fechaMovimiento: -1,
        ultimoCambio: -1
      },
      populate:
      {
        path: 'cliente',
        select: 'nombre',
        match: { nombre: { $regex: search, $options: 'i' } }
      }
    };

    const query = { despacho, usuario };

    let searchQuery = {};

    if (estatus) {
      searchQuery.estatus = estatus;
    }

    const expedientesUsuarios = await ExpedientesUsuarioModel.find(query).select('expediente');
    // const clientesIDS = [];

    if (search) {
      // const clientes = await ClientesModel.find({ nombre: { $regex: search, $options: 'i' } }).select('_id');

      // clientesIDS.push(...clientes.map(cliente => cliente._id));
      searchQuery = {
        $or: [
          { titulo: { $regex: search, $options: 'i' } },
          { numeroExpediente: { $regex: search, $options: 'i' } },
          { numeroExpedienteInterno: { $regex: search, $options: 'i' } }
        ]
        // cliente: { $in: clientesIDS }
      };
    }

    const expedienteIds = expedientesUsuarios.map(exp => exp.expediente);

    // const clientesIds = await

    const combinedQuery = { ...searchQuery, _id: { $in: expedienteIds } };

    const expedientes = await ExpedienteModel.paginate(combinedQuery, options);

    res.status(200).json(expedientes);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

const getExpedienteById = async (req, res) => {
  try {
    const { despacho, usuario, expediente } = req.params;

    if (!expediente) {
      return res.status(400).json({ message: 'El id del expediente es requerido' });
    }
    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!usuario) {
      return res.status(400).json({ message: 'El usuario es requerido' });
    }

    const query = {
      despacho,
      usuario,
      expediente // Agregar el campo expediente para buscar por _id
    };

    const expedienteUsuario = await ExpedientesUsuarioModel.findOne(query).select(['rol', 'notificaciones']);

    if (!expedienteUsuario) {
      return res.status(404).json({ message: 'El expediente no existe o no tienes permisos para verlo' });
    }

    const populate = [
      { path: 'cliente', select: 'nombre' },
      { path: 'asunto', select: 'nombre' },
      { path: 'juzgado.juzgado', select: 'nombre' },
      { path: 'materia.materia', select: 'nombre' },
      { path: 'etapaProcesal.etapa', select: 'nombre _id' }
    ];

    const queryExpediente = { _id: expediente };

    const expedienteData = await ExpedienteModel.findOne(queryExpediente).populate(populate);

    if (!expedienteData) {
      return res.status(404).json({ message: 'El expediente no existe o no tienes permisos para verlo' });
    }

    res.status(200).json({ expediente: expedienteData, permios: expedienteUsuario });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateEstatus = async (req, res) => {
  const { despacho, usuario, expediente } = req.params;

  const { estatus, descripcion } = req.body;

  if (!despacho) {
    return res.status(400).json({ message: 'El despacho es requerido' });
  }

  if (!usuario) {
    return res.status(400).json({ message: 'El usuario es requerido' });
  }

  if (!expediente) {
    return res.status(400).json({ message: 'El expediente es requerido' });
  }

  try {
    const tipos = ['Activo', 'Inactivo', 'Concluido', 'Suspendido'];

    if (!tipos.includes(estatus)) {
      return res.status(400).json({ message: 'El estatus no es válido' });
    }

    const query = {
      despacho,
      _id: expediente
    };

    const findExpediente = await ExpedienteModel.findOne(query);

    if (!findExpediente) {
      return res.status(404).json({ message: 'El expediente no existe' });
    }

    // const findUsuario = await ExpedientesUsuarioModel.findOne({ despacho, usuario });

    // if (!findUsuario) {
    //   return res.status(404).json({ message: 'El usuario no existe' });
    // }

    const { estatus: estatusAnterior } = findExpediente;

    const movimiento = {
      despacho,
      expediente,
      creadoPor: usuario,
      titulo: 'Cambio de estatus',
      fecha: new Date(),
      descripcion: descripcion || `El estatus del expediente cambió de ${estatusAnterior} a ${estatus}`
    };

    await ExpedientesMovimientosModel.create(movimiento);

    findExpediente.estatus = estatus;
    findExpediente.ultimoMovimiento = new Date();

    if (estatus === 'Concluido' || estatus === 'Inactivo' || estatus === 'Suspendido') {
      findExpediente.fechaTermino = new Date();
    }

    if (estatus === 'Activo') {
      findExpediente.fechaTermino = undefined;
    }

    await findExpediente.save();
    const findUsuarios = await ExpedientesUsuarioModel.find({ despacho, expediente, notificaciones: true }).populate('usuario', 'email nombre apellidoPaterno apellidoMaterno');

    findUsuarios.forEach(async (expediente) => {
      const { email, nombre, apellidoPaterno, apellidoMaterno } = expediente.usuario;

      const html = MovimientosExpedienteHTML({
        nombreCliente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombreExpediente: findExpediente.titulo,
        nombreRemitente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        accionRealizada: 'Cambio de estatus',
        detallesAdicionales: descripcion || `El estatus del expediente cambió de ${estatusAnterior} a ${estatus}`,
        fechaMovimiento: new Date().toLocaleString(),
        enlaceExpediente: `${APP_URL}/expedientes/${despacho}/${usuario}/${expediente._id}`
      });

      sendMail(html, 'Movimiento de expediente', email);
    });

    res.status(200).json({ message: 'El estatus del expediente se actualizó correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateTitulo = async (req, res) => {
  const { despacho, usuario, expediente } = req.params;

  const { titulo, descripcion } = req.body;

  try {
    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!usuario) {
      return res.status(400).json({ message: 'El usuario es requerido' });
    }

    if (!expediente) {
      return res.status(400).json({ message: 'El expediente es requerido' });
    }

    if (!titulo) {
      return res.status(400).json({ message: 'El título es requerido' });
    }

    const query = {
      despacho,
      _id: expediente
    };

    const findExpediente = await ExpedienteModel.findOne(query);

    if (!findExpediente) {
      return res.status(404).json({ message: 'El expediente no existe' });
    }

    // const findUsuario = await ExpedientesUsuarioModel.findOne({ despacho, usuario });

    // if (!findUsuario) {
    //   return res.status(404).json({ message: 'El usuario no existe' });
    // }

    const movimiento = {
      despacho,
      expediente,
      creadoPor: usuario,
      titulo: 'Cambio de título',
      fecha: new Date(),
      descripcion: descripcion || `El título del expediente cambió de ${findExpediente.titulo} a ${titulo}`
    };

    await ExpedientesMovimientosModel.create(movimiento);

    findExpediente.titulo = titulo;

    await findExpediente.save();
    const findUsuarios = await ExpedientesUsuarioModel.find({ despacho, expediente, notificaciones: true }).populate('usuario', 'email nombre apellidoPaterno apellidoMaterno');

    findUsuarios.forEach(async (expediente) => {
      const { email, nombre, apellidoPaterno, apellidoMaterno } = expediente.usuario;

      const html = MovimientosExpedienteHTML({
        nombreCliente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombreExpediente: findExpediente.titulo,
        nombreRemitente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        accionRealizada: 'Cambio de título',
        detallesAdicionales: descripcion || `El título del expediente cambió de ${findExpediente.titulo} a ${titulo}`,
        fechaMovimiento: new Date().toLocaleString(),
        enlaceExpediente: `${APP_URL}/expedientes/${expediente}/`
      });

      sendMail(html, 'Movimiento de expediente', email);
    });

    res.status(200).json({ message: 'El título del expediente se actualizó correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateNumeroExpediente = async (req, res) => {
  const { despacho, usuario, expediente } = req.params;

  const { numeroExpediente, descripcion } = req.body;

  try {
    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!usuario) {
      return res.status(400).json({ message: 'El usuario es requerido' });
    }

    if (!expediente) {
      return res.status(400).json({ message: 'El expediente es requerido' });
    }

    if (!numeroExpediente) {
      return res.status(400).json({ message: 'El número de expediente es requerido' });
    }

    const query = {
      despacho,
      _id: expediente
    };

    const findExpediente = await ExpedienteModel.findOne(query);

    if (!findExpediente) {
      return res.status(404).json({ message: 'El expediente no existe' });
    }

    // const findUsuario = await ExpedientesUsuarioModel.findOne({ despacho, usuario });

    // if (!findUsuario) {
    //   return res.status(404).json({ message: 'El usuario no existe' });
    // }

    const movimiento = {
      despacho,
      expediente,
      creadoPor: usuario,
      titulo: 'Cambio de número de expediente',
      fecha: new Date(),
      descripcion: descripcion || `El número de expediente cambió de ${findExpediente.numeroExpediente} a ${numeroExpediente}`
    };

    await ExpedientesMovimientosModel.create(movimiento);

    findExpediente.numeroExpediente = numeroExpediente;

    await findExpediente.save();
    const findUsuarios = await ExpedientesUsuarioModel.find({ despacho, expediente, notificaciones: true }).populate('usuario', 'email nombre apellidoPaterno apellidoMaterno');

    findUsuarios.forEach(async (expediente) => {
      const { email, nombre, apellidoPaterno, apellidoMaterno } = expediente.usuario;

      const html = MovimientosExpedienteHTML({
        nombreCliente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombreExpediente: findExpediente.titulo,
        nombreRemitente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        accionRealizada: 'Cambio de número de expediente',
        detallesAdicionales: descripcion || `El número de expediente cambió de ${findExpediente.numeroExpediente} a ${numeroExpediente}`,
        fechaMovimiento: new Date().toLocaleString(),
        enlaceExpediente: `${APP_URL}/expedientes/${expediente}/`
      });

      sendMail(html, 'Movimiento de expediente', email);
    }

    );

    res.status(200).json({ message: 'El número de expediente se actualizó correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// asunto
const updateJuicio = async (req, res) => {
  const { despacho, usuario, expediente } = req.params;

  const { nombreJuicio, descripcion } = req.body;

  try {
    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!usuario) {
      return res.status(400).json({ message: 'El usuario es requerido' });
    }

    if (!expediente) {
      return res.status(400).json({ message: 'El expediente es requerido' });
    }

    if (!nombreJuicio) {
      return res.status(400).json({ message: 'El nombre del juicio es requerido' });
    }

    const query = {
      despacho,
      _id: expediente
    };

    const findExpediente = await ExpedienteModel.findOne(query).populate('asunto');

    if (!findExpediente) {
      return res.status(404).json({ message: 'El expediente no existe' });
    }

    // const findUsuario = await ExpedientesUsuarioModel.findOne({ despacho, usuario });

    // if (!findUsuario) {
    //   return res.status(404).json({ message: 'El usuario no existe' });
    // }

    const findAsunto = await AsuntosModel.findOne({ _id: findExpediente.asunto, despacho });

    if (!findAsunto) {
      return res.status(404).json({ message: 'El asunto no existe' });
    }

    findAsunto.nombre = nombreJuicio;
    findAsunto.save();

    const movimiento = {
      despacho,
      expediente,
      creadoPor: usuario,
      titulo: 'Cambio de juicio',
      fecha: new Date(),
      descripcion: descripcion || `El juicio del expediente cambió de ${findExpediente.asunto.nombre} a ${nombreJuicio}`
    };

    await ExpedientesMovimientosModel.create(movimiento);

    const findUsuarios = await ExpedientesUsuarioModel.find({ despacho, expediente, notificaciones: true }).populate('usuario', 'email nombre apellidoPaterno apellidoMaterno');

    findUsuarios.forEach(async (expediente) => {
      const { email, nombre, apellidoPaterno, apellidoMaterno } = expediente.usuario;

      const html = MovimientosExpedienteHTML({
        nombreCliente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombreExpediente: findExpediente.titulo,
        nombreRemitente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        accionRealizada: 'Cambio de juicio',
        detallesAdicionales: descripcion || `El juicio del expediente cambió de ${findExpediente.asunto.nombre} a ${nombreJuicio}`,
        fechaMovimiento: new Date().toLocaleString(),
        enlaceExpediente: `${APP_URL}/expedientes/${expediente}/`
      });

      sendMail(html, 'Movimiento de expediente', email);
    });

    // findExpediente.nombre = nombreJuicio;
    // await findExpediente.save();

    res.status(200).json({ message: 'El juicio del expediente se actualizó correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateEtapaProcesal = async (req, res) => {
  const { despacho, usuario, expediente } = req.params;

  const { etapaProcesal, etapaOpcional = '', descripcion = '', recursosIncidencia = null, recursosIncidenciaOpcional = '', descripcionRC = '', tipo = 'Recurso' } = req.body;

  try {
    if (!despacho) {
      return res.status(400).json({ message: 'El despacho es requerido' });
    }

    if (!usuario) {
      return res.status(400).json({ message: 'El usuario es requerido' });
    }

    if (!expediente) {
      return res.status(400).json({ message: 'El expediente es requerido' });
    }

    if (!etapaProcesal && !etapaOpcional) {
      return res.status(400).json({ message: 'La etapa procesal es requerida' });
    }

    const query = {
      despacho,
      _id: expediente
    };

    const findExpediente = await ExpedienteModel.findOne(query);

    if (!findExpediente) {
      return res.status(404).json({ message: 'El expediente no existe' });
    }

    // const findUsuario = await ExpedientesUsuarioModel.findOne({ despacho, usuario });

    // if (!findUsuario) {
    //   return res.status(404).json({ message: 'El usuario no existe' });
    // }

    const findEtapaProcesal = await EtapasProcesalesModel.findById(etapaProcesal);

    let nuevaEtapa = '';

    if (etapaOpcional) {
      nuevaEtapa = etapaOpcional;
    } else {
      nuevaEtapa = findEtapaProcesal.nombre;
    }

    if (recursosIncidencia !== null || recursosIncidenciaOpcional !== '') {
      // crea un nu nueva recurso o incidencia
      const objRecursoIncidencia = {
        despacho,
        expediente,
        creadoPor: usuario,
        comentario: descripcionRC
      };

      if (recursosIncidencia) {
        const findRecursoIncidencia = await RecursosExpediente.findById(recursosIncidencia);

        if (!findRecursoIncidencia) {
          return res.status(400).json({ message: 'El recurso o incidencia no existe' });
        }

        const { tipo } = findRecursoIncidencia;

        objRecursoIncidencia.tipo = tipo;
        objRecursoIncidencia.recursoIncidencia = recursosIncidencia;
      }

      if (recursosIncidenciaOpcional) {
        objRecursoIncidencia.opcional = recursosIncidenciaOpcional;
        objRecursoIncidencia.recursoIncidencia = undefined;
        objRecursoIncidencia.tipo = tipo;
      }

      await RecursosIncidenciasExpedienteModel.create(objRecursoIncidencia);
    }

    const movimiento = {
      despacho,
      expediente,
      creadoPor: usuario,
      titulo: 'Cambio de etapa procesal',
      fecha: new Date(),
      descripcion: descripcion || `La etapa procesal del expediente cambió de ${findExpediente.etapaProcesal.nombre} a ${nuevaEtapa}`
    };

    await ExpedientesMovimientosModel.create(movimiento);

    const findUsuarios = await ExpedientesUsuarioModel.find({ despacho, expediente, notificaciones: true }).populate('usuario', 'email nombre apellidoPaterno apellidoMaterno');

    findUsuarios.forEach(async (expediente) => {
      const { email, nombre, apellidoPaterno, apellidoMaterno } = expediente.usuario;

      const html = MovimientosExpedienteHTML({
        nombreCliente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombreExpediente: findExpediente.titulo,
        nombreRemitente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        accionRealizada: 'Cambio de etapa procesal',
        detallesAdicionales: descripcion || `La etapa procesal del expediente cambió de ${findExpediente.etapaProcesal.nombre} a ${nuevaEtapa}`,
        fechaMovimiento: new Date().toLocaleString(),
        enlaceExpediente: `${APP_URL}/expedientes/${expediente}/`
      });

      sendMail(html, 'Movimiento de expediente', email);
    });

    if (etapaOpcional) {
      findExpediente.etapaProcesal = {
        etapa: undefined,
        nombre: etapaOpcional
      };
    } else {
      findExpediente.etapaProcesal = {
        etapa: etapaProcesal,
        nombre: findEtapaProcesal.nombre
      };
    }

    await findExpediente.save();

    res.status(200).json({ message: 'La etapa procesal del expediente se actualizó correctamente' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteExpediente = async (req, res) => {
  const { despacho, expediente } = req.params;

  try {
    if (!expediente) {
      return res.status(400).json({ message: 'El expediente es requerido' });
    }

    const findExpediente = await ExpedienteModel.findById(expediente);

    if (!findExpediente) {
      return res.status(404).json({ message: 'El expediente no existe' });
    }

    const expedientesEliminarArchivo = async ({ expediente, despacho }) => {
      const eliminarExpedientesAdjuntos = await ExpedientesAdjuntos.find({ expediente, despacho }).select('archivo');

      eliminarExpedientesAdjuntos.forEach(async (adjunto) => {
        const { archivo } = adjunto;
        const folderPath = path.join('src/uploads/documentos', archivo);
        deleteFile(folderPath);
      });

      return await ExpedientesAdjuntos.deleteMany({ expediente, despacho });
    };

    const expedientesEliminarGastos = async ({ expediente, despacho }) => {
      const eliminarExpedientesGastos = await ExpedientesGastos.find({ expediente, despacho }).select('adjunto');

      eliminarExpedientesGastos.forEach(async (gasto) => {
        const archivo = gasto.adjunto.archivo;

        const folderPath = path.join('src/uploads/expedientes-gastos', archivo);
        deleteFile(folderPath);
      });

      return await ExpedientesGastos.deleteMany({ expediente, despacho });
    };

    const EliminarTodo = Promise.all([
      // expediente asociados a los usuarios
      await ExpedientesUsuarioModel.deleteMany({ expediente, despacho }),

      // expediente asociados a los movimientos
      await ExpedientesMovimientosModel.deleteMany({ expediente, despacho }),

      // expediente asociados a los recursos o incidencias
      await RecursosIncidenciasExpedienteModel.deleteMany({ expediente, despacho }),

      // expediente asociados a agenda

      await ExpedienteAgenda.deleteMany({ expediente, despacho }),

      // expediente asociados a agenda usuarios
      await ExpedienteAgendaUsuarios.deleteMany({ expediente, despacho }),

      // expediente asociados a partes involucradas
      await ExpedientesPartes.deleteMany({ expediente, despacho }),

      // expediente asociados a notas
      await ExpedientesNotas.deleteMany({ expediente, despacho }),

      // expediente asociados a gastos
      await expedientesEliminarGastos({ expediente, despacho }),

      // expediente asociados a adjuntos y tambien eliminar los archivos
      await expedientesEliminarArchivo({ expediente, despacho }),

      // expediente asociados a pautas
      await ExpedientesPautas.deleteMany({ expediente, despacho })
    ]);

    await ExpedienteModel.findByIdAndDelete(expediente);

    res.status(200).json({ message: 'El expediente se eliminó correctamente', expediente: findExpediente, EliminarTodo });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  createExpediente,
  getExpedientesByUsuario,
  getExpedienteById,
  updateEstatus,
  updateTitulo,
  updateNumeroExpediente,
  updateJuicio,
  updateEtapaProcesal,
  deleteExpediente
};
