const ModulosSchema = require('../models/Modulos.js');
const TipoUsuarioModel = require('../models/TipoUsuarios.js');
const FormaPagoSchema = require('../models/FomaPago.js');
const ProductosSchema = require('../models/Productos.js');
const EstadoSchema = require('../models/Estados.js');
const JuzgadosSchema = require('../models/Juzgados.js');
const MateriaSchema = require('../models/Materias.js');
const EtapasProcesalesSchema = require('../models/EtapasProcesales.js');
const RecursosIncidencias = require('../models/RecursosIncidencias.js');
const RegimenSchema = require('../models/RegimenFiscales.js');
const BancoSchema = require('../models/Bancos.js');
const documentqacionJson = require('./documentacion.json');
const DocumentacionModel = require('../models/LegislacionesReglamentos.js');
const FiscaliaSchema = require('../models/Fiscalias.js');
const DependenciaSchema = require('../models/Dependencias.js');
// const fs = require('fs');

const generateModules = async () => {
  const count = await ModulosSchema.countDocuments();
  if (count > 0) return;
  try {
    const modulosAdmin = [
      {
        nombre: 'Usuarios',
        enlace: '/usuarios',
        imagen: 'iconos_principales_150x150_usuarios.svg',
        orden: 1,
        estatus: 'Activo',
        padre: '',
        tipo: 'admin'
      },
      {
        nombre: 'Despachos',
        enlace: '/despachos',
        imagen: 'iconos_principales_150x150_despachos.svg',
        orden: 2,
        estatus: 'Activo',
        padre: '',
        tipo: 'admin'
      },
      {
        nombre: 'Ventas',
        enlace: '/ventas',
        imagen: 'iconos_principales_150x150_reportes.svg',
        orden: 3,
        estatus: 'Activo',
        padre: '',
        tipo: 'admin'
      },
      {
        nombre: 'Configuraciones',
        enlace: '/configuraciones',
        imagen: 'iconos_principales_150x150_configuraciones.svg',
        orden: 3,
        estatus: 'Activo',
        padre: '',
        tipo: 'admin'
      },
      {
        nombre: 'Juzgados',
        enlace: '/juzgados',
        imagen: 'iconos_principales_150x150_juzgado.svg',
        orden: 1,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Dependencias',
        enlace: '/dependencias',
        imagen: 'iconos_principales_150x150_dependencias.svg',
        orden: 2,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Fiscalías',
        enlace: '/fiscalias',
        imagen: 'iconos_principales_150x150_fiscalias.svg',
        orden: 3,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Legislación y Reglamentos',
        enlace: '/legislacion-reglamentos',
        imagen: 'iconos_principales_150x150_legislacion_reglamentos.svg',
        orden: 4,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Paquetes de expedientes',
        enlace: '/paquetes-expedientes',
        imagen: 'iconos_principales_150x150_paquetes.svg',
        orden: 5,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Plantillas',
        enlace: '/plantillas',
        imagen: 'iconos_principales_150x150_plantillas.svg',
        orden: 6,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Paquetes de timbres',
        enlace: '/paquetes-timbres',
        imagen: 'icono_administrador_iusform_folios.svg',
        orden: 7,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Materias',
        enlace: '/materias',
        imagen: 'iconos_principales_150x150_materias.svg',
        orden: 8,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Etapas procesales',
        enlace: '/etapas-procesales',
        imagen: 'iconos_principales_150x150_etapas_procesales.svg',
        orden: 9,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Recursos',
        enlace: '/recursos',
        imagen: 'icono_administrador_iusform_recursos.svg',
        orden: 10,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Incidencias',
        enlace: '/incidencias',
        imagen: 'icono_administrador_iusform_incidencias.svg',
        orden: 11,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      },
      {
        nombre: 'Datos fiscales',
        enlace: '/datos-fiscales',
        imagen: 'iconos_principales_150x150_configuraciones.svg',
        orden: 11,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'admin'
      }
    ];

    const modulosDespacho = [
      {
        nombre: 'Expedientes',
        enlace: '/expedientes',
        imagen: 'iconos_principales_150x150_expedientes.svg',
        orden: 1,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Agenda',
        enlace: '/agenda',
        imagen: 'iconos_principales_150x150_agenda.svg',
        orden: 2,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Clientes',
        enlace: '/clientes',
        imagen: 'iconos_principales_150x150_clientes.svg',
        orden: 3,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Control interno',
        enlace: '/control-interno',
        imagen: 'icono_administrador_iusform_control_interno.svg',
        orden: 7,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Configuraciones',
        enlace: '/configuraciones',
        imagen: 'iconos_principales_150x150_configuraciones.svg',
        orden: 10,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Usuarios',
        enlace: '/usuarios',
        imagen: 'iconos_principales_150x150_usuarios.svg',
        orden: 1,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'despacho'
      },
      {
        nombre: 'Configuraciones del despacho',
        enlace: '/datos-fiscales',
        imagen: 'iconos_menu_usuario_150x150_configuraciones_2.svg',
        orden: 3,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'despacho'
      },
      {
        nombre: 'Tipo usuarios',
        enlace: '/tipo-usuarios',
        imagen: 'iconos_principales_150x150_usuarios.svg',
        orden: 4,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'despacho'
      },
      {
        nombre: 'Gastos',
        enlace: '/gastos',
        imagen: 'iconos_principales_150x150_gastos.svg',
        orden: 1,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Ingresos',
        enlace: '/ingresos',
        imagen: 'iconos_principales_150x150_ingresos.svg',
        orden: 2,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Facturación',
        enlace: '/facturacion',
        imagen: 'iconos_principales_150x150_facturacion.svg',
        orden: 3,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Cuentas bancarias',
        enlace: '/cuentas-bancarias',
        imagen: 'iconos_principales_150x150_historial_bancos.svg',
        orden: 4,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Edo. de cuenta',
        enlace: '/edo-cuenta',
        imagen: 'iconos_principales_150x150_edo_cuenta.svg',
        orden: 5,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Historial bancos',
        enlace: '/historial-bancos',
        imagen: 'iconos_principales_150x150_historial_bancos.svg',
        orden: 6,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Gastos trámites',
        enlace: '/gastos-tramites',
        imagen: 'iconos_principales_150x150_gastos_tramites.svg',
        orden: 6,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Folios',
        enlace: '/folios',
        imagen: 'icono_administrador_iusform_folios.svg',
        orden: 7,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      },
      {
        nombre: 'Declaraciones fiscales',
        enlace: '/declaraciones-fiscales',
        imagen: 'iconos_principales_150x150_declaraciones.svg',
        orden: 9,
        estatus: 'Activo',
        padre: '/control-interno',
        tipo: 'despacho'
      }
    ];

    await ModulosSchema.insertMany(modulosAdmin);
    await ModulosSchema.insertMany(modulosDespacho);

    console.log('Modulos creados'.grey);
  } catch (error) {
    console.error('Error al crear modulos'.red, error);
  }
};

const generateTipoUsuarios = async () => {
  const count = await TipoUsuarioModel.countDocuments();
  if (count > 0) return;

  try {
    const modulos = await ModulosSchema.find();

    const modulosAdmin = modulos.filter(modulo => modulo.tipo === 'admin');
    const modulosDespacho = modulos.filter(modulo => modulo.tipo === 'despacho');

    const objTipoUsuarioAdmin = {
      nombre: 'Administrador',
      tipo: 'admin',
      modulos: modulosAdmin.map(modulo => {
        return ({
          modulo: modulo._id
        });
      })
    };

    const objTipoUsuarioDespacho = {
      nombre: 'Administrador',
      tipo: 'despacho',
      modulos: modulosDespacho.map(modulo => ({ modulo: modulo._id }))
    };

    await TipoUsuarioModel.create(objTipoUsuarioAdmin);
    await TipoUsuarioModel.create(objTipoUsuarioDespacho);

    console.log('Tipos de usuarios creados'.grey);
  } catch (error) {
    console.error('Error al crear tipos de usuarios'.red, error);
  }
};

const generateFormaPagos = async () => {
  const count = await FormaPagoSchema.countDocuments();
  if (count > 0) return;

  try {
    const formasPagos = [
      {
        nombre: 'Efectivo',
        formaPago: '01',
        bancarizada: 'No'
      },
      {
        nombre: 'Transferencia electrónica de fondos',
        formaPago: '03',
        bancarizada: 'Si'
      },
      {
        nombre: 'Transferencia electrónica de fondos',
        formaPago: '03',
        bancarizada: 'Si'
      },
      {
        nombre: 'Tarjeta de crédito',
        formaPago: '04',
        bancarizada: 'Si'
      },
      {
        nombre: 'Tarjeta de débito',
        formaPago: '28',
        bancarizada: 'Si'
      },
      {
        nombre: 'Aplicación de anticipos',
        formaPago: '30',
        bancarizada: 'No'
      },
      {
        nombre: 'Por definir',
        formaPago: '99',
        bancarizada: 'Opcional'
      }
    ];

    await FormaPagoSchema.insertMany(formasPagos);

    console.log('Formas de pago creadas'.grey);
  } catch (error) {
    console.error('Error al crear formas de pago'.red, error);
  }
};

const generateProductos = async () => {
  const count = await ProductosSchema.countDocuments();
  if (count > 0) return;

  try {
    const productos = [
      {
        nombre: '15 EXPEDIENTE',
        tipo_producto: 'Paquete',
        imagen: 'paq_1705953935.png',
        precio: 0,
        cantidad: 15
      },
      {
        nombre: '50 EXPEDIENTE',
        tipo_producto: 'Paquete',
        imagen: 'paq_1705942854.png',
        precio: 100,
        cantidad: 25
      },
      {
        nombre: '50 EXPEDIENTE',
        tipo_producto: 'Paquete',
        imagen: 'paq_1705942880.png',
        precio: 200,
        cantidad: 50
      },
      {
        nombre: '100 EXPEDIENTE',
        tipo_producto: 'Paquete',
        imagen: 'paq_1705942898.png',
        precio: 200,
        cantidad: 100
      }
    ];

    await ProductosSchema.insertMany(productos);

    console.log('Productos creados'.grey);
  } catch (error) {
    console.error('Error al crear productos'.red, error);
  }
};

const generateEstatos = async () => {
  const count = await EstadoSchema.countDocuments();
  if (count > 0) return;

  try {
    const estados = [
      {
        clave: 'AGU',
        pais: 'MEX',
        nombre: 'Aguascalientes'
      },
      {
        clave: 'BCN',
        pais: 'MEX',
        nombre: 'Baja California'
      },
      {
        clave: 'BCS',
        pais: 'MEX',
        nombre: 'Baja California Sur'
      },
      {
        clave: 'CAM',
        pais: 'MEX',
        nombre: 'Campeche'
      },
      {
        clave: 'CHP',
        pais: 'MEX',
        nombre: 'Chiapas'
      },
      {
        clave: 'CHH',
        pais: 'MEX',
        nombre: 'Chihuahua'
      },
      {
        clave: 'COA',
        pais: 'MEX',
        nombre: 'Coahuila'
      },
      {
        clave: 'COL',
        pais: 'MEX',
        nombre: 'Colima'
      },
      {
        clave: 'DIF',
        pais: 'MEX',
        nombre: 'Ciudad de México'
      },
      {
        clave: 'DUR',
        pais: 'MEX',
        nombre: 'Durango'
      },
      {
        clave: 'GUA',
        pais: 'MEX',
        nombre: 'Guanajuato'
      },
      {
        clave: 'GRO',
        pais: 'MEX',
        nombre: 'Guerrero'
      },
      {
        clave: 'HID',
        pais: 'MEX',
        nombre: 'Hidalgo'
      },
      {
        clave: 'JAL',
        pais: 'MEX',
        nombre: 'Jalisco'
      },
      {
        clave: 'MEX',
        pais: 'MEX',
        nombre: 'nombre de México'
      },
      {
        clave: 'MIC',
        pais: 'MEX',
        nombre: 'Michoacán'
      },
      {
        clave: 'MOR',
        pais: 'MEX',
        nombre: 'Morelos'
      },
      {
        clave: 'NAY',
        pais: 'MEX',
        nombre: 'Nayarit'
      },
      {
        clave: 'NLE',
        pais: 'MEX',
        nombre: 'Nuevo León'
      },
      {
        clave: 'OAX',
        pais: 'MEX',
        nombre: 'Oaxaca'
      },
      {
        clave: 'PUE',
        pais: 'MEX',
        nombre: 'Puebla'
      },
      {
        clave: 'QUE',
        pais: 'MEX',
        nombre: 'Querétaro'
      },
      {
        clave: 'ROO',
        pais: 'MEX',
        nombre: 'Quintana Roo'
      },
      {
        clave: 'SLP',
        pais: 'MEX',
        nombre: 'San Luis Potosí'
      },
      {
        clave: 'SIN',
        pais: 'MEX',
        nombre: 'Sinaloa'
      },
      {
        clave: 'SON',
        pais: 'MEX',
        nombre: 'Sonora'
      },
      {
        clave: 'TAB',
        pais: 'MEX',
        nombre: 'Tabasco'
      },
      {
        clave: 'TAM',
        pais: 'MEX',
        nombre: 'Tamaulipas'
      },
      {
        clave: 'TLA',
        pais: 'MEX',
        nombre: 'Tlaxcala'
      },
      {
        clave: 'VER',
        pais: 'MEX',
        nombre: 'Veracruz'
      },
      {
        clave: 'YUC',
        pais: 'MEX',
        nombre: 'Yucatán'
      },
      {
        clave: 'ZAC',
        pais: 'MEX',
        nombre: 'Zacatecas'
      }
    ];

    await EstadoSchema.insertMany(estados);
  } catch (error) {
    console.error('Error al crear estados'.red, error);
  }
};

const generateJuzgados = async () => {
  const count = await JuzgadosSchema.countDocuments();
  if (count > 0) return;

  try {
    const juzgados = [
      {
        tipo: 'Civil',
        nombre: 'Edificio de Justicia Civil del Estado de Aguascalientes',
        url: 'https://aguascalientes.gob.mx/index.html',
        direccion: 'Héroe de Nacozari esq, Av Lic. Adolfo López Mateos Ote S/N, San Luis, 20250 Aguascalientes, Ags.',
        estado: '65d3c9132141bccfaefbd2b3',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Supremo Tribunal de Justicia del Poder Judicial del Estado de Aguascalientes',
        url: 'https://www.poderjudicialags.gob.mx/Inicio',
        direccion: 'Blvd. Lic. Adolfo Ruiz Cortines 2311, 20310 Aguascalientes, Ags.',
        estado: '65d3c9132141bccfaefbd2b3',
        telefonos: []
      },
      {
        tipo: 'Penal ',
        nombre: 'Centro de Justicia para las Mujeres - Fiscalía General del Estado de Aguascalientes',
        url: 'https://www.fiscalia-aguascalientes.gob.mx/Centro_de_Justicia_para_las_Mujeres.aspx',
        direccion: 'Av. Aguascalientes Ote. LB, El Cedazo, 20295 Aguascalientes, Ags.',
        estado: '65d3c9132141bccfaefbd2b3',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Centro de Mediación del Poder Judicial del Estado de Aguascalientes',
        url: 'https://www.poderjudicialags.gob.mx/Inicio',
        direccion: 'Av. Ojocaliente 703, Municipio Libre, 20199 Aguascalientes, Ags.',
        estado: '65d3c9132141bccfaefbd2b3',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Junta Local de Conciliación y Arbitraje del Estado de Aguascalientes',
        url: '',
        direccion: 'C. 20 Sur 902, Azcarate, 72501 Heroica Puebla de Zaragoza, Pue.',
        estado: '65d3c9132141bccfaefbd2b3',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Poder Judicial del Estado de Baja California',
        url: 'https://www.poder-judicial-bc.gob.mx/',
        direccion: 'Calz Independencia s/n, Centro Cívico, 21000 Mexicali, B.C',
        estado: '65d3c9132141bccfaefbd2b4',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Sistema de Justicia Penal Oral del Estado de Baja California',
        url: 'https://www.poder-judicial-bc.gob.mx/',
        direccion: 'Calz. de los Presidentes, Agualeguas, 21090 Mexicali, B.C.',
        estado: '65d3c9132141bccfaefbd2b4',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Civiles',
        url: 'https://www.poder-judicial-bc.gob.mx/',
        direccion: 'Av. Vía Rápida Pte. s/n, 20 de Noviembre, 22439 Tijuana, B.',
        estado: '65d3c9132141bccfaefbd2b4',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Centro de Justicia',
        url: 'https://www.poder-judicial-bc.gob.mx/',
        direccion: 'Corredor Tijuana - Rosarito 2000, El Realito, 22250 B.C.',
        estado: '65d3c9132141bccfaefbd2b4',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales',
        url: 'https://www.poder-judicial-bc.gob.mx/',
        direccion: ' Los Charros 234, José Sandoval, 22105 Tijuana, B.C.',
        estado: '65d3c9132141bccfaefbd2b4',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Tribunales en Materia Laboral',
        url: 'https://www.poder-judicial-bc.gob.mx/',
        direccion: 'Los Charros 234, José Sandoval, 22105 Tijuana, B.C.',
        estado: '65d3c9132141bccfaefbd2b4',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Centro de Convivencia Familiar del Poder Judicial del Estado de Baja California Sur',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'Santo Domingo No. 136 esquina con, San José de Comondú Fraccionamiento, Bella Vista, 23050 La Paz, B.C.S.',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Poder Judicial del Estado de Baja California Sur',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'Lic. Antonio Álvarez Rico 4365, Emiliano Zapata, 23070 La Paz, B.C.S.',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'H. Tribunal Juzgado Familiar I y II de La Paz',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'Privada las Garzas, 23075 La Paz, B.C.S.',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Centro de Justicia Penal del Estado',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'General Agustín Olachea Avilés, Luis Donaldo Colosio esquina, La Paz, B.C.S.',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado del Sistema Penal Acusatorio de Cabo San Lucas',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'Cabo San Lucas - Todos los Santos 35, Los Cangrejos, 23473 Cabo San Lucas, B.C.S.',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgados de Primera Instancia del Ramo Civil y Familiar',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'Agua Verde, 23436 San Bernabé, B.C.S.',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Primero Penal',
        url: 'https://www.tribunalbcs.gob.mx/',
        direccion: 'Blvd. Luis D. Colosio E/ México y A. Álvarez Rico Altos Casa al Mitad del Camino Col. Emiliano Zapata C.P. 23070. LA PAZ, B.C.S ',
        estado: '65d3c9132141bccfaefbd2b5',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Fiscalía General del Estado',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: 'Av Patricio Trueba de Regil 236, San Rafael, 24090 San Francisco de Campeche, Camp.',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de Campeche',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: '24050, Av. Héroe de Nacozari 3, Barrio de Sta. Ana, San Francisco de Campeche, Camp.',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Civil, Penal',
        nombre: 'Centro de Justicia Alternativa',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: 'Av. Álvaro Obregón 110, Barrio de la Ermita, 24020 San Francisco de Campeche, Camp',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Salas De Juicios Orales Campeche',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: 'Av Patricio Trueba de Regil 245, 24096 San Francisco de Campeche, Camp',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Sala Independencia',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: 'Av Patricio Trueba de Regil, San Rafael, 24090 San Francisco de Campeche, Camp.',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Primero Federal',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: 'Av Patricio Trueba de Regil 245, 24096 San Francisco de Campeche, Camp.',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Administrativa, Civil',
        nombre: 'Tribunal de Justicia Administrativa del Estado de Campeche',
        url: 'http://www.tjacam.org.mx/',
        direccion: 'Av. Álvaro Obregón 110, Barrio de la Ermita, 24020 San Francisco de Campeche, Camp.',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Salas De Juicios Orales Campeche',
        url: 'https://poderjudicialcampeche.gob.mx/',
        direccion: '4062 San Francisco de Campeche, Camp.',
        estado: '65d3c9132141bccfaefbd2b6',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de Chiapas',
        url: 'https://www.poderjudicialchiapas.gob.mx/',
        direccion: '30099, Blvrd 20 de Noviembre MZ6 LT17, Primero de Mayo, Comitán de Domínguez, Chis.',
        estado: '65d3c9132141bccfaefbd2b7',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados de Control y Tribunales de Enjuiciamiento.',
        url: 'https://www.poderjudicialchiapas.gob.mx/',
        direccion: 'Ejido Lázaro Cárdenas, carretera internacional Km',
        estado: '65d3c9132141bccfaefbd2b7',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Edificio B Juzgados Civiles y Familiares',
        url: 'https://www.poderjudicialchiapas.gob.mx/',
        direccion: 'El Bosque, 29049 Tuxtla Gutiérrez, Chis.',
        estado: '65d3c9132141bccfaefbd2b7',
        telefonos: []
      },
      {
        tipo: 'Civil, Penal',
        nombre: 'Palacio de Justicia de los Altos',
        url: 'https://www.poderjudicialchiapas.gob.mx/',
        direccion: 'Avenida De Los Insurgentes s/n, Los Pinos, 29280 San Cristóbal de las Casas, Chis.',
        estado: '65d3c9132141bccfaefbd2b7',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Juzgado Especializado en Materia Laboral',
        url: 'https://www.poderjudicialchiapas.gob.mx/',
        direccion: 'Blvd. Lic. Salomón González Blanco 26, Las Torres, 29045 Tuxtla Gutiérrez, Chis.',
        estado: '65d3c9132141bccfaefbd2b7',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado De Paz',
        url: 'https://www.poderjudicialchiapas.gob.mx/',
        direccion: 'Los Naranjos, 2 de Marzo, 30794 Tapachula de Córdova y Ordóñez, Chis.',
        estado: '65d3c9132141bccfaefbd2b7',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia del Estado de Chihuahua',
        url: 'http://www.stj.gob.mx/',
        direccion: 'San Pedro, Zona Centro II, 31000 Chihuahua, Chih.',
        estado: '65d3c9132141bccfaefbd2b8',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado',
        url: 'http://www.stj.gob.mx/',
        direccion: 'Paseo Simón Bolívar s/n, Centro, 31000 Chihuahua, Chih.',
        estado: '65d3c9132141bccfaefbd2b8',
        telefonos: []
      },
      {
        tipo: 'Mercantil, Civil',
        nombre: 'Juzgado de Garantía Distrito Judicial',
        url: 'http://www.stj.gob.mx/',
        direccion: 'C. Manuel Doblado 1502, Lagunita, 33700 Chihuahua, Chih.',
        estado: '65d3c9132141bccfaefbd2b8',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Palacio de Justicia Laboral. ',
        url: 'http://www.stj.gob.mx/',
        direccion: '1000, Josué Neri Santos 616, Zona Centro, Chihuahua, Chih.',
        estado: '65d3c9132141bccfaefbd2b8',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado de Garantía Distrito Judicial',
        url: 'http://www.stj.gob.mx/',
        direccion: 'C. Manuel Doblado 1502, Lagunita, 33700 Chihuahua, Chih.',
        estado: '65d3c9132141bccfaefbd2b8',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Centro De Seguridad Y Justicia',
        url: 'http://www.stj.gob.mx/',
        direccion: 'Av. Benito Juárez 1016, Zona Centro, 31000 Chihuahua, Chih.',
        estado: '65d3c9132141bccfaefbd2b8',
        telefonos: []
      },
      {
        tipo: 'Mercantil',
        nombre: 'Juzgados Mercantiles Poder Judicial de Coahuila',
        url: 'https://www.pjecz.gob.mx/',
        direccion: 'Blvd. Luis Donaldo Colosio, numero 703, col, Valle Real 2do Sector, 25505 Saltillo, Coah.',
        estado: '65d3c9132141bccfaefbd2b9',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Centro de Justicia',
        url: 'https://www.pjecz.gob.mx/',
        direccion: 'Periférico Luis Echeverría 5402, Nuevo Centro Metropolitano de Saltillo, Saltillo, Coah.',
        estado: '65d3c9132141bccfaefbd2b9',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgados Civiles Y Familiares San Pedro',
        url: 'https://www.pjecz.gob.mx/',
        direccion: '27800, Av. Benito Juárez 193, Centro, San Pedro, Coah.',
        estado: '65d3c9132141bccfaefbd2b9',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Centro de Justicia Monclova',
        url: 'https://www.pjecz.gob.mx/',
        direccion: 'Cd. Deportiva, Estadio &, Cd Deportiva, 25750 Monclova, Coah.',
        estado: '65d3c9132141bccfaefbd2b9',
        telefonos: []
      },
      {
        tipo: 'Civil, Penal',
        nombre: 'Poder Judicial del Estado de Colima',
        url: 'https://stjcolima.gob.mx/#/',
        direccion: 'Calz. Pedro A. Galván Nte. 239 Norte, Centro, 28000 Colima, Col.',
        estado: '65d3c9132141bccfaefbd2ba',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado Tercero Familiar del Primer Partido Judicial con Sede Colima',
        url: 'https://stjcolima.gob.mx/#/',
        direccion: 'Ricardo Flores Magón s/n, Centro, 28000 Colima, Col.',
        estado: '65d3c9132141bccfaefbd2ba',
        telefonos: []
      },
      {
        tipo: 'z',
        nombre: 'Juzgado Tercero Familiar del Primer Partido Judicial con Sede Colima',
        url: 'https://stjcolima.gob.mx/#/',
        direccion: 'Av. Gonzalo de Sandoval, Equipamiento Urbano, 28047 Colima, Col.',
        estado: '65d3c9132141bccfaefbd2ba',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal de Justicia Laboral del Estado de Colima',
        url: 'https://stjcolima.gob.mx/#/',
        direccion: 'Aldama 502, Centro, 28000 Colima, Col.',
        estado: '65d3c9132141bccfaefbd2ba',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Edificios Legislativo y de Justicia',
        url: 'https://stjcolima.gob.mx/#/',
        direccion: 'Calz. Pedro A. Galván Nte. s/n, Centro, 28000 Colima, Col.',
        estado: '65d3c9132141bccfaefbd2ba',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia del Estado de Durango',
        url: 'https://pjdgo.gob.mx/',
        direccion: 'Calle Zaragoza S/N, Centro, 34000 Durango, Dgo',
        estado: '65d3c9132141bccfaefbd2bc',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Cívico Durango',
        url: 'https://pjdgo.gob.mx/',
        direccion: 'Carretera, Durango - El Calabazal Km 2.5, 34208 Durango, Dgo.',
        estado: '65d3c9132141bccfaefbd2bc',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Oficina de Correspondencia Común de los Juzgados de Distrito del Estado de Durango',
        url: 'https://pjdgo.gob.mx/',
        direccion: 'Blvd. José María Patoni 103, Impregnadora Guadiana, Predio El Tule, 34217 Durango, Dgo.',
        estado: '65d3c9132141bccfaefbd2bc',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado de lo Familiar',
        url: 'https://pjdgo.gob.mx/',
        direccion: 'Av Estaño, Fidel Velázquez, 34229 Durango, Dgo.',
        estado: '65d3c9132141bccfaefbd2bc',
        telefonos: []
      },
      {
        tipo: 'ELECTORAL',
        nombre: 'Tribunal Electoral del Estado de Durango',
        url: 'https://pjdgo.gob.mx/',
        direccion: 'Zaragoza, esquina con, Calle 5 de Febrero, Zona Centro, Durango',
        estado: '65d3c9132141bccfaefbd2bc',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Edificio de Juzgados de Ixtapaluca, México',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: 'Tezontle S/N, La Era, 56585 Ixtapaluca, Méx.',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgados Civiles y Familiares de Primera Instancia y Cuantía Menor de Ecatepec',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: 'Av. Adolfo López Mateos Manzana 001, 57000 Col. Gustavo Baz Prada, Méx.',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados de Zumpango',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: '55614 Zumpango de Ocampo, Méx',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado Quinto Familiar de Tlalnepantla',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: 'Av Lago de Guadalupe 72, Villas de la Hacienda, 52929 Cdad. López Mateos, Méx.',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgados Civiles, Familiares y de  Cuantía Menor Poder Judicial',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: ' Adolfo López Mateos 57, La Mora, 55030 Ecatepec de Morelos, Méx.',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados De Control Neza-Bordo',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: 'Av. Adolfo López Mateos Manzana 001, 57000 Col. Gustavo Baz Prada, Méx.',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de México',
        url: 'https://www.pjedomex.gob.mx/vista/1_inicio',
        direccion: 'Tecnológico Sn, Madero, 50000 Toluca de Lerdo, Méx.',
        estado: '65d3c9132141bccfaefbd2c1',
        telefonos: []
      },
      {
        tipo: 'Civil Penal',
        nombre: 'Poder Judicial del Estado de Guanajuato',
        url: 'https://www.poderjudicial-gto.gob.mx/',
        direccion: 'Circuito Superior, Pozuelos No.1, 36050 Guanajuato, Gto',
        estado: '65d3c9132141bccfaefbd2bd',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Único Menor Mixto Guanajuato, Gto',
        url: 'https://www.poderjudicial-gto.gob.mx/',
        direccion: 'Conjunto Administrativo, Pozuelos S/N, Guanajuato, Gto.',
        estado: '65d3c9132141bccfaefbd2bd',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Segundo Penal Guanajuato',
        url: 'https://www.poderjudicial-gto.gob.mx/',
        direccion: 'Superior Pozuelos 1, Noria Alta, 36050 Guanajuato, Gto.',
        estado: '65d3c9132141bccfaefbd2bd',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Civiles',
        url: 'https://www.poderjudicial-gto.gob.mx/',
        direccion: 'Complejo Administrativo Pozuelos, 36089 Guanajuato, Gto',
        estado: '65d3c9132141bccfaefbd2bd',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Edificio Sede Poder Judicial de la Federación, Guanajuato, Gto.',
        url: 'https://www.poderjudicial-gto.gob.mx/',
        direccion: 'Carr. Guanajuato - Silao, Burócrata, 36255 Yerbabuena, Gto',
        estado: '65d3c9132141bccfaefbd2bd',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado de Adolescentes',
        url: 'https://www.poderjudicial-gto.gob.mx/',
        direccion: '36263 Puentecillas, Gto.',
        estado: '65d3c9132141bccfaefbd2bd',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgados Civiles y Familiares. Poder Judicial Guerrero',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: 'Palacio de Justicia, Av. Gran Vía Tropical s/n, Las Playas, 39390 Acapulco de Juárez, Gro',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de Guerrero',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: 'Fútbol SN, Cd Renacimiento, 39700 Acapulco de Juárez, Gro.',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados De Distrito',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: '5 de May. 19B, Centro, 39000 Chilpancingo de los Bravo, Gro',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Décimo de Distrito en el Estado de Guerrero',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: 'Paseo Alejandro Cervantes Delgado 268, Galeana, 39010 Chilpancingo de los Bravo, Gro.',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Segundo Penal de Primera Instancia',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: 'De Los Plateros s/n, Barrio de la Garita, 40230 Taxco de Alarcón, Gro.',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia Centro.',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: 'Emiliano Zapata 10A, Centro, 39000 Ejido del Centro, Gro.',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Penal Iguala',
        url: 'http://tsj-guerrero.gob.mx/2020/',
        direccion: 'Mariano Matamoros 27, Centro, 40000 Iguala de la Independencia, Gro.',
        estado: '65d3c9132141bccfaefbd2be',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de Hidalgo',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'Carretera México Pachuca Kilometro 84.5 Sn, Sector Primario, 42002 Pachuca de Soto, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales de Control, Juicio Oral y Ejecución. Primer Circuito Judicial de Pachuca de Soto.',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'Pachuca - Actopan Km. 6.5, Venustiano Carranza, 42037 Pachuca de Soto, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Civiles Poder Judicial',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'Impulsor Sector Primario, Colonias, 42083 Pachuca de Soto, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Civil y Familiar de Tulancingo, Hidalgo',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'Av. Juárez Nte., Cuxtitla, 43808 Tizayuca, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Segundo Mixto Menor del Estado de Hidalgo',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: '42500, Centro Nte, 42500 Actopan, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Penal Acusatorio De Molango De Escamilla, Hidalgo',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'Erasmo Ángeles, Zacatempa, 43103 Molango de Escamilla, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: '',
        nombre: 'Centro de Justicia Penal Federal en el Estado de Hidalgo, con residencia en Pachuca',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'C. Plan de San Luis 1007, San Bartolo, 42039 Pachuca de Soto, Hgo.',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Mixto de Primera Instancia',
        url: 'http://www.pjhidalgo.gob.mx/',
        direccion: 'Pensador Mexicano 388, Centro Nte, 42500 Actopan, Hgo',
        estado: '65d3c9132141bccfaefbd2bf',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Ciudad Judicial del Estado de Jalisco',
        url: 'https://cjj.gob.mx/',
        direccion: 'Av. Perif. Pte. Manuel Gómez Morin 7255, Bajío II, 45010 Zapopan, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Administrativo',
        nombre: 'Juzgado Administrativo Municipal',
        url: 'https://cjj.gob.mx/',
        direccion: 'C. San Miguel 327, Las Juntas, 45590 San Pedro Tlaquepaque, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Municipales de Guadalajara Zona 7',
        url: 'https://cjj.gob.mx/',
        direccion: 'Av Cruz del Sur 2572, Jardines de La Cruz, 44530 Guadalajara, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado 1ro Familiar',
        url: 'https://cjj.gob.mx/',
        direccion: 'Bajío II, 45012 Zapopan, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Cívicos de Tonalá',
        url: 'https://cjj.gob.mx/',
        direccion: 'Av. Tonaltecas 197, Tonalá Centro, 45400 Tonalá, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados De Control Y Juicio Oral Distrito I',
        url: 'https://cjj.gob.mx/',
        direccion: '45687 El Salto, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Tlajomulco De Zúñiga "Trigésimo Primer Partido"',
        url: 'https://cjj.gob.mx/',
        direccion: 'C. Porfirio Díaz 4A, Centro, 45640 Tlajomulco de Zúñiga, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Centro de Justicia Penal Federal en el Estado de Jalisco.',
        url: 'https://cjj.gob.mx/',
        direccion: 'Km.2 Carretera a Chapala-Mezcala, desviación Hacienda s/n, Labor de Medina, Jal.',
        estado: '65d3c9132141bccfaefbd2c0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Mixto de Primera Instancia',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: '60380, Allende Sur 113A, Centro, Ejido del Centro, Mich',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Segundo Menor Mixto Poder Judicial del Estado de Michoacán',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Av de las Americas 101, Morelos, 60050 Morelos, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado 1ra Instancia Civil',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: '58500 Centro,, Lic. Verdad Arteaga 279, Centro, 58500 Centro, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Supremo Tribunal de Justicia del Estado de Michoacán',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Calz La Huerta 400, Nueva Valladolid, 58190 Morelia, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil Mercantil',
        nombre: 'Juzgados Civiles de primera Instancia de Morelia',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Calz La Huerta 408, Nueva Valladolid, 58190 Morelia, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial De Lázaro Cárdenas, Michoacán',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Orquídeas 134A, 600 Casas, 60954 Cdad. Lázaro Cárdenas, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Civiles De Primera Instancia',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Calz La Huerta 408, Nueva Valladolid, 58190 Morelia, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Centro de Justicia Oral',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: '60984 Cdad. Lázaro Cárdenas, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: '',
        nombre: 'Juzgados Civiles, Familiar y Laboral Poder judicial',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Lázaro Cárdenas 2001, La Joyita, 60170 Uruapan, Mich.',
        estado: '65d3c9132141bccfaefbd2c2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia del Estado de Morelos',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'AY',
        estado: '65d3c9132141bccfaefbd2c3',
        telefonos: []
      },
      {
        tipo: 'Administrativo',
        nombre: 'Unidad de Administrativa - Tribunal Superior de Justicia del Estado de Morelos y Juzgados en Materia Laboral',
        url: 'http://www.tsjmorelos2.gob.mx/inicio/',
        direccion: 'Dwight W. Morrow 17, Cuernavaca Centro, Centro, 62000 Cuernavaca, Mor.',
        estado: '65d3c9132141bccfaefbd2c3',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Ciudad Judicial de Cuautla Morelos',
        url: 'http://tsjmorelos2.gob.mx/index.php',
        direccion: 'Paulino Martínez S/N, Francisco I. Madero, 62744 Cuautla, Mor.',
        estado: '65d3c9132141bccfaefbd2c3',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Civil de Primera Instancia 7° Distrito Judicial',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Calle Moctezuma 1, San Francisco, 62930 Jonacatepec de Leandro Valle, Mor.',
        estado: '65d3c9132141bccfaefbd2c3',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Segundo Penal de Primera Instancia del Sexto Distrito Judicial',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Paulino Martínez Sn, Francisco I. Madero, 62755 Cuautla, Mor.',
        estado: '65d3c9132141bccfaefbd2c3',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de Morelos',
        url: 'https://www.poderjudicialmichoacan.gob.mx/web/',
        direccion: 'Av. Manuel Altamirano 400, Emiliano Zapata, 62900 Jojutla, Mor.',
        estado: '65d3c9132141bccfaefbd2c3',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia',
        url: 'https://www.tsjnay.gob.mx/',
        direccion: 'Zacatecas Sur 109 Sur, Centro, 63000 Tepic, Nay.',
        estado: '65d3c9132141bccfaefbd2c4',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Penal de Primera Instancia',
        url: 'https://www.tsjnay.gob.mx/',
        direccion: ' Blvd. Tepic-Xalisco s/n, Moctezuma, 63180 Tepic, Nay.',
        estado: '65d3c9132141bccfaefbd2c4',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado De Adolescentes',
        url: 'https://www.tsjnay.gob.mx/',
        direccion: 'Cedro 19, Independencia, 63136 Tepic, Nay.',
        estado: '65d3c9132141bccfaefbd2c4',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Mixto de Primera Instancia',
        url: 'https://www.tsjnay.gob.mx/',
        direccion: 'Atenas, Tepeyac, 63715 Las Varas, Nay.',
        estado: '65d3c9132141bccfaefbd2c4',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar Mercantil',
        nombre: 'Juzgados Civiles, Familiares y Mercantiles',
        url: 'https://www.tsjnay.gob.mx/',
        direccion: 'Av México Nte 132B, Centro, 63000 Tepic, Nay.',
        estado: '65d3c9132141bccfaefbd2c4',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial',
        url: 'https://www.cjf.gob.mx/',
        direccion: 'Av México Nte, Caja de Agua, 63158 Tepic, Nay.',
        estado: '65d3c9132141bccfaefbd2c4',
        telefonos: []
      },
      {
        tipo: 'Civil Mercantil',
        nombre: 'Centro De Justicia Civil Y Mercantil de Nuevo León',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'Pino Suarez 602-S, Centro, 64000 Monterrey, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial Del Estado De Nuevo León',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'Juan Ignacio Ramón e, 21 - Ignacio Zaragoza Sur S/N, Centro, 64000 Monterrey, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Juzgados Laborales Del Estado De Nuevo León',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'Mariano Escobedo 508, Centro, 64000 Monterrey, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgado mixto Civil y juzgado Familiar del Decimocuarto Distrito Judicial',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'Gral. Treviño 408, Cabecera Municipal, 66000 García, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Administrativo',
        nombre: 'Tribunal de Justicia Administrativa del Estado de Nuevo León',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'C. Loma Larga 2626, Obispado, 64060 Monterrey, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Civil Mercantil',
        nombre: 'Juzgados Civiles y Mercantiles de Monterrey',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'Pino Suarez 601, Centro, 64000 Monterrey, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgados Familiares San Pedro Garza García',
        url: 'https://www.pjenl.gob.mx/',
        direccion: 'Av. Corregidora 324, Casco Urbano, 66200 San Pedro Garza García, N.L.',
        estado: '65d3c9132141bccfaefbd2c5',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Especializado en Materia de Justicia para Adolescentes',
        url: 'https://www.tribunaloaxaca.gob.mx/',
        direccion: 'C. Alamos 807, Reforma, 68050 Oaxaca de Juárez, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Civil Mercantil',
        nombre: 'Juzgados Laborales del Poder Judicial del Estado de Oaxaca',
        url: 'https://www.tribunaloaxaca.gob.mx/',
        direccion: 'Cerrada de Escultores, sin número, Agencia Municipal Sta Maria Ixcotel, Santa Lucía del Camino, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado II de lo Penal del Estado de Oaxaca',
        url: 'https://www.tribunaloaxaca.gob.mx/',
        direccion: 'Esculteres S/N La Bigarra, Santa Maria Ixcotel, 68100 Santa Lucía del Camino, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado',
        url: 'https://www.tribunaloaxaca.gob.mx/',
        direccion: 'Mártires de Tacubaya 400, RUTA INDEPENDENCIA, Centro, 68000 Oaxaca de Juárez, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Administrativo',
        nombre: 'Tribunal de Justicia Administrativa del Estado de Oaxaca',
        url: 'https://tjaoaxaca.gob.mx/',
        direccion: 'Miguel Hidalgo 215, Zona Lunes Feb 09, Centro, 68000 Oaxaca de Juárez, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Juzgados Civiles y Familiares del Centro',
        url: 'https://www.tribunaloaxaca.gob.mx/',
        direccion: 'División Ote. 618, Santa María del Marquesado, Centro, 68000 Oaxaca de Juárez, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado 5to del Distrito',
        url: '',
        direccion: 'C. Amapolas 1202, Reforma, 68050 Oaxaca de Juárez, Oax.',
        estado: '65d3c9132141bccfaefbd2c6',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales',
        url: 'https://pjpuebla.gob.mx/',
        direccion: 'Av. 12 Ote. 608, Centro histórico de Puebla, 72000 Heroica Puebla de Zaragoza, Pue.',
        estado: '65d3c9132141bccfaefbd2c7',
        telefonos: []
      },
      {
        tipo: 'Civil Mercantil',
        nombre: 'Poder Judicial del Estado de Puebla',
        url: 'https://pjpuebla.gob.mx/',
        direccion: 'C. 11 Sur No. 11921, San Isidro Castillotla, 72498 Heroica Puebla de Zaragoza, Pue.',
        estado: '65d3c9132141bccfaefbd2c7',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Calificador',
        url: 'https://pjpuebla.gob.mx/',
        direccion: 'Diag. Defensores de la República entre Avenida 8 Pte y Av 10 Pte, Tierra y Libertad, 72140 Heroica Puebla de Zaragoza, Pue.',
        estado: '65d3c9132141bccfaefbd2c7',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado del Registro Civil',
        url: 'https://pjpuebla.gob.mx/',
        direccion: 'Libertad, 72130 Heroica Puebla de Zaragoza, Pue.',
        estado: '65d3c9132141bccfaefbd2c7',
        telefonos: []
      },
      {
        tipo: 'Civil Mercantil',
        nombre: 'Ciudad Judicial Siglo XXI',
        url: 'https://pjpuebla.gob.mx/',
        direccion: 'Anillo Perif. Ecológico 4000, Arcos del Sur, 72761 San Bernardino Tlaxcalancingo, Pue.',
        estado: '65d3c9132141bccfaefbd2c7',
        telefonos: []
      },
      {
        tipo: 'Civil Familiar',
        nombre: 'Centro de Justicia, Sede de los Juzgados Civiles, Familiares, Menores y Oficina de Consignaciones.',
        url: 'https://www.poderjudicialqro.gob.mx/',
        direccion: 'Cto. Moisés Solana 1001, Prados del Mirador, 76070 Santiago de Querétaro, Qro',
        estado: '65d3c9132141bccfaefbd2c8',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Palacio del Tribunal Superior de Justicia de Querétaro',
        url: 'https://www.poderjudicialqro.gob.mx/',
        direccion: 'Av. Luis Pasteur Sur 4, Centro, 76000 Santiago de Querétaro, Qro.',
        estado: '65d3c9132141bccfaefbd2c8',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Juzgados Laborales del Estado de Querétaro',
        url: 'https://www.poderjudicialqro.gob.mx/',
        direccion: 'De La Congregación 162, Plazas del Sol 1ra Secc, 76099 Santiago de Querétaro, Qro.',
        estado: '65d3c9132141bccfaefbd2c8',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial De La Federación Juzgados De Distrito Querétaro',
        url: 'https://www.poderjudicialqro.gob.mx/',
        direccion: 'Av Fray Luis de León 57, Colinas del Cimatario, 76090 Santiago de Querétaro, Qro.',
        estado: '65d3c9132141bccfaefbd2c8',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Cívicos Municipales del Municipio de Querétaro',
        url: 'https://www.poderjudicialqro.gob.mx/',
        direccion: 'Desarrollo San Pablo II, Desarrollo San Pablo, 76125 Santiago de Querétaro, Qro.',
        estado: '65d3c9132141bccfaefbd2c8',
        telefonos: []
      },
      {
        tipo: 'Administrativo',
        nombre: 'Juzgado Administrativo',
        url: 'https://www.poderjudicialqro.gob.mx/',
        direccion: 'Ignacio Zaragoza 44, Barrio el Refugio, 76500 Qro.',
        estado: '65d3c9132141bccfaefbd2c8',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Poder Judicial',
        url: 'https://www.tsjqroo.gob.mx/',
        direccion: 'Avenida Punta Celarain. Supermanzana 8. Manzana 2. Lote 2, Benito Juarez, 77504 Cancún, Q.R.',
        estado: '65d3c9132141bccfaefbd2c9',
        telefonos: []
      },
      {
        tipo: 'Mercantil',
        nombre: 'Juzgados Mercantiles (Cancún)',
        url: 'https://www.tsjqroo.gob.mx/',
        direccion: 'Supermanzana 510, Cecilio Chi, 77534 Cancún, Q.R.',
        estado: '65d3c9132141bccfaefbd2c9',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgados Familiares Orales',
        url: 'https://www.tsjqroo.gob.mx/',
        direccion: 'C. 45-A Supermanzana 77, Los Corales, 77528 Cancún, Q.R.',
        estado: '65d3c9132141bccfaefbd2c9',
        telefonos: []
      },
      {
        tipo: 'Civil,',
        nombre: 'Tribunal De Justicia Administrativa Del Estado De Quintana Roo',
        url: 'https://www.tsjqroo.gob.mx/',
        direccion: 'Av. Itzal 7, 77507 Cancún, Q.R.',
        estado: '65d3c9132141bccfaefbd2c9',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales Orales',
        url: 'https://www.tsjqroo.gob.mx/',
        direccion: 'Av. Nichupté Supermanzana 510, Cecilio Chi, 77534 Cancún, Q.R.',
        estado: '65d3c9132141bccfaefbd2c9',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Cívico de Tulum',
        url: 'https://www.tsjqroo.gob.mx/',
        direccion: 'Av. Coba 107, 77760 Tulum, Q.R.',
        estado: '65d3c9132141bccfaefbd2c9',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Supremo Tribunal de Justicia de San Luis Potosí',
        url: 'https://www.stjslp.gob.mx/',
        direccion: 'Av Luis Donaldo Colosio 305, Issste, 78280 San Luis Potosí, S.L.P.',
        estado: '65d3c9132141bccfaefbd2ca',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales STJE',
        url: 'https://www.stjslp.gob.mx/',
        direccion: '78342 San Luis Potosí, S.L.P.',
        estado: '65d3c9132141bccfaefbd2ca',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Tribunal Laboral del Poder Judicial del Estado de San Luis Potosí',
        url: 'https://www.stjslp.gob.mx/',
        direccion: 'Av Himno Nacional 1911, Tangamanga, 78269 San Luis Potosí, S.L.P.',
        estado: '65d3c9132141bccfaefbd2ca',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado 6 Penal San Luis Potosí',
        url: 'https://www.stjslp.gob.mx/',
        direccion: '78342 San Luis Potosí, S.L.P.',
        estado: '65d3c9132141bccfaefbd2ca',
        telefonos: []
      },
      {
        tipo: 'Penal, Civil',
        nombre: 'Juzgado Especializado en Órdenes de Protección de Emergencia y Preventivas en Favor de las Mujeres y de Procedimientos no Controvertidos',
        url: 'https://www.stjslp.gob.mx/',
        direccion: 'Blvd. Antonio Rocha Cordero 507, Simon Diaz, 78385 San Luis Potosí, S.L.P.',
        estado: '65d3c9132141bccfaefbd2ca',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Estatal de Conciliación y Arbitraje',
        url: 'https://www.stjslp.gob.mx/',
        direccion: 'Francisco I. Madero 355, Centro, 78000 San Luis Potosí, S.L.P.',
        estado: '65d3c9132141bccfaefbd2ca',
        telefonos: []
      },
      {
        tipo: 'Civil, Penal',
        nombre: 'Juzgado Mixto de Primera instancia del Distrito Judicial de Sinaloa De Leyva',
        url: 'https://www.stj-sin.gob.mx/poderjudicial/directorio',
        direccion: '81910 Sinaloa de Leyva, Sin.',
        estado: '65d3c9132141bccfaefbd2cb',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado 1ro de Primera Instancia del Ramo Civil del Distrito Judicial de Culiacán Sinaloa',
        url: 'https://www.stj-sin.gob.mx/poderjudicial/directorio',
        direccion: 'Avenida Lázaro Cárdenas 891, Centro Sinaloa, 80129 Culiacán Rosales, Sin.',
        estado: '65d3c9132141bccfaefbd2cb',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados de Primera Instancia De Control y Enjuiciamiento Penal',
        url: 'https://www.stj-sin.gob.mx/poderjudicial/directorio',
        direccion: 'kilometro 9.5, sindicatura de, Carr. A Navolato, Aguaruto, Culiacán Rosales, Sin.',
        estado: '65d3c9132141bccfaefbd2cb',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Superior Tribunal Justicia Estado Sinaloa Juzgado Tercero Civil Ahome',
        url: 'https://www.stj-sin.gob.mx/poderjudicial/directorio',
        direccion: 'Calle Gral. Angel Flores 61, Primer Cuadro, 81200 Culiacán Rosales, Sin.',
        estado: '65d3c9132141bccfaefbd2cb',
        telefonos: []
      },
      {
        tipo: 'Civil, Penal',
        nombre: 'Tribunal Superior de Justicia del Estado de Sinaloa Juzgado Mixto',
        url: 'https://www.stj-sin.gob.mx/poderjudicial/directorio',
        direccion: 'Benito Juárez SN, Zona Centro, 81900 Guamúchil, Sin.',
        estado: '65d3c9132141bccfaefbd2cb',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Poder Judicial del Estado de Sonora',
        url: 'https://www.stjsonora.gob.mx/',
        direccion: 'Tehuantepec s/n, Las Palmas, 83270 Hermosillo, Son.',
        estado: '65d3c9132141bccfaefbd2cc',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado de lo Familiar Con Competencia Especializada',
        url: 'https://www.stjsonora.gob.mx/',
        direccion: 'Calle Paseo Río Sonora Norte 76 Proyecto Río Sonora Edificio la Gran Plaza, Local 206, Nivel 1, 83270 Hermosillo, Son.',
        estado: '65d3c9132141bccfaefbd2cc',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Primero Civil',
        url: 'https://www.stjsonora.gob.mx/',
        direccion: 'Calle Comonfort & Tehuantepec, El Centenario, 83260 Hermosillo, Son.',
        estado: '65d3c9132141bccfaefbd2cc',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Oral Penal Hermosillo',
        url: 'https://www.stjsonora.gob.mx/',
        direccion: 'Unnamed Road, Periférico Ote. 980, Las Lomas, 83270 Hermosillo, Son.',
        estado: '65d3c9132141bccfaefbd2cc',
        telefonos: []
      },
      {
        tipo: 'Penal, Civil',
        nombre: 'Juzgado Mixto de Primera Instancia',
        url: 'https://www.stjsonora.gob.mx/',
        direccion: 'Prof.ª María Alonso 281, 83106 Cumpas, Son.',
        estado: '65d3c9132141bccfaefbd2cc',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado Familiar Ciudad Obregón',
        url: 'https://www.stjsonora.gob.mx/',
        direccion: 'Blvd. Rodolfo Elías Calles 102, Cortinas 1 Secc, 85000 Cdad. Obregón, Son.',
        estado: '65d3c9132141bccfaefbd2cc',
        telefonos: []
      },
      {
        tipo: 'Civil, Familiar',
        nombre: 'Tribunal Superior De Justicia 1a Instancia Juzgado Civiles y Familiares, de Villahermosa, Centro, Tabasco',
        url: 'https://tsj-tabasco.gob.mx/',
        direccion: 'Av. Gregorio Méndez Magaña 2410, Cuadrante II, Atasta de Serra, 86100 Villahermosa, Tab.',
        estado: '65d3c9132141bccfaefbd2cd',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgados Civiles y Familiares del Fuero Común',
        url: 'https://tsj-tabasco.gob.mx/',
        direccion: 'Av. Gregorio Méndez Magaña 2410, Jose Colomo, 86100 Villahermosa, Tab.',
        estado: '65d3c9132141bccfaefbd2cd',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia del Estado de Tabasco',
        url: 'https://tsj-tabasco.gob.mx/',
        direccion: 'Independencia esquina Nicolas Bravo s/n, 86000 Villahermosa, Tab.',
        estado: '65d3c9132141bccfaefbd2cd',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Juzgado Primero de Distrito en el Estado de Tabasco',
        url: 'https://tsj-tabasco.gob.mx/',
        direccion: 'C. Reforma 107, Atasta de Serra, 86100 Villahermosa, Tab.',
        estado: '65d3c9132141bccfaefbd2cd',
        telefonos: []
      },
      {
        tipo: 'Civil, Familiar',
        nombre: 'Juzgados Civiles y Familiares de Primera Instancia',
        url: 'https://tsj-tabasco.gob.mx/',
        direccion: 'Av. Gregorio Méndez Magaña s/n, Jose Colomo, 86100 Villahermosa, Tab.',
        estado: '65d3c9132141bccfaefbd2cd',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial del Estado de Tabasco',
        url: 'https://tsj-tabasco.gob.mx/',
        direccion: '86870, 5 de Mayo 41, Centro, Tacotalpa, Tab',
        estado: '65d3c9132141bccfaefbd2cd',
        telefonos: []
      },
      {
        tipo: 'Civil, Familiar',
        nombre: 'Ciudad Judicial Altamira',
        url: 'https://www.pjetam.gob.mx/layout.php?seccion=Directorio&sub=Juzgados&tipo=PrimeraInstancia',
        direccion: ' Divisoria 2001, Tampico Altamira, 89605 Miramar, Tamp',
        estado: '65d3c9132141bccfaefbd2ce',
        telefonos: []
      },
      {
        tipo: 'Penal, Civil',
        nombre: 'Supremo Tribunal de Justicia de Tamaulipas',
        url: 'https://www.pjetam.gob.mx/layout.php?seccion=Directorio&sub=Juzgados&tipo=PrimeraInstancia',
        direccion: 'Blvrd Praxedis Balboa 2207, Miguel Hidalgo y Costilla, 87090 Cdad. Victoria, Tamps.',
        estado: '65d3c9132141bccfaefbd2ce',
        telefonos: []
      },
      {
        tipo: 'Civil, Familiar',
        nombre: 'Juzgados Civiles y Familiares de Primera Instancia(Palacio de Justicia de El Mante, Tamaulipas)',
        url: 'https://www.pjetam.gob.mx/layout.php?seccion=Directorio&sub=Juzgados&tipo=PrimeraInstancia',
        direccion: 'V. Guerrero 606, Zona Centro, 89800 Cdad. Mante, Tamps',
        estado: '65d3c9132141bccfaefbd2ce',
        telefonos: []
      },
      {
        tipo: 'Administrativo, Civil',
        nombre: 'Tribunal De Justicia Administrativa Del Estado De Tamaulipas',
        url: 'https://www.pjetam.gob.mx/layout.php?seccion=Directorio&sub=Juzgados&tipo=PrimeraInstancia',
        direccion: 'Zona Centro, 87000 Cdad. Victoria, Tamps',
        estado: '65d3c9132141bccfaefbd2ce',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Segundo Penal',
        url: 'https://www.pjetam.gob.mx/layout.php?seccion=Directorio&sub=Juzgados&tipo=PrimeraInstancia',
        direccion: 'Av. Primero de Mayo 1205, Lázaro Cárdenas, 89430 Tampico, Tamps.',
        estado: '65d3c9132141bccfaefbd2ce',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia del Estado de Tlaxcala',
        url: 'https://tsjtlaxcala.gob.mx/',
        direccion: 'LibramientoApizaco-Huamantla Km 1.5, 90407 Santa Anita Huiloac, Tlax.',
        estado: '65d3c9132141bccfaefbd2cf',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Poder Judicial de la Federación',
        url: 'https://tsjtlaxcala.gob.mx/',
        direccion: 'Av. Vicente Guerrero 56, Centro, 90000 Tlaxcala de Xicohténcatl, Tlax.',
        estado: '65d3c9132141bccfaefbd2cf',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado 2do Distrito',
        url: 'https://tsjtlaxcala.gob.mx/',
        direccion: 'C. Miguel Hidalgo y Costilla 36, Centro, 90000 Tlaxcala de Xicohténcatl, Tlax.',
        estado: '65d3c9132141bccfaefbd2cf',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado Civil y Familiar Distrito Xicohténcatl',
        url: 'https://tsjtlaxcala.gob.mx/',
        direccion: 'Cda. de Rio Bravo LB, San Bartolomé, 90970 Cdad. de San Pablo del Monte, Tlax.',
        estado: '65d3c9132141bccfaefbd2cf',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Tribunal De Justicia',
        url: 'https://tsjtlaxcala.gob.mx/',
        direccion: 'Av Independencia, San Isidro, 90060 Tlaxcala de Xicohténcatl, Tlax.',
        estado: '65d3c9132141bccfaefbd2cf',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal de Justicia Administrativa',
        url: 'https://tsjtlaxcala.gob.mx/',
        direccion: 'Apizaco-Huamantla Km 1.5, 90407 Santa Anita Huiloac, Tlax.',
        estado: '65d3c9132141bccfaefbd2cf',
        telefonos: []
      },
      {
        tipo: 'Civil, Mercantil',
        nombre: 'Ciudad Judicial de Veracruz',
        url: 'https://www.pjeveracruz.gob.mx/',
        direccion: 'Santos Pérez Abascal, Pascual S/N, Ortiz Rubio, 91750 Veracruz, Ver.',
        estado: '65d3c9132141bccfaefbd2d0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado Segundo Civil',
        url: 'https://www.pjeveracruz.gob.mx/',
        direccion: 'Independencia 946, Centro, 91700 Veracruz, Ver.',
        estado: '65d3c9132141bccfaefbd2d0',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgado Primero Menor Penal del Poder Judicial',
        url: 'https://www.pjeveracruz.gob.mx/',
        direccion: 'C. Francisco Canal 1301, Centro, 91700 Veracruz, Ver.',
        estado: '65d3c9132141bccfaefbd2d0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Centro de Conciliación Familiar Veracruz, Ver.',
        url: 'https://www.pjeveracruz.gob.mx/',
        direccion: 'Santos Pérez Abascal S/N, Col. Pascual Ortiz Rubio, Entre Jiménez Sur y Prol. Cuauhtémoc. C.P. 91750. Veracruz, Ver. 01 229 9233210 Ext. 42030, 42022 y, 42025',
        estado: '65d3c9132141bccfaefbd2d0',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Juzgado en Materia Laboral del Decimoséptimo Distrito Judicial de Veracruz',
        url: 'https://www.pjeveracruz.gob.mx/',
        direccion: 'Cto. Puente Moreno 2-3°piso, Fraccionamento Puente Moreno, 94274 Fraccionamiento Puente Moreno, Ver.',
        estado: '65d3c9132141bccfaefbd2d0',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Tribunal Superior de Justicia del Estado de Yucatán',
        url: 'http://www.poderjudicialyucatan.gob.mx/',
        direccion: 'Av Jacinto Canek 90, Centro, 97069 Mérida, Yuc.',
        estado: '65d3c9132141bccfaefbd2d1',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales',
        url: 'http://www.poderjudicialyucatan.gob.mx/',
        direccion: 'Calle 145 por 54 y 56, San José Tecoh II, 97298 Mérida, Yuc.',
        estado: '65d3c9132141bccfaefbd2d1',
        telefonos: []
      },
      {
        tipo: 'Mercantiles',
        nombre: 'Juzgados Mercantiles y Familiares',
        url: 'http://www.tsjyuc.gob.mx/',
        direccion: 'C. 35 501-A, entre 62 y 62-A, Centro, 97000 Mérida, Yuc.',
        estado: '65d3c9132141bccfaefbd2d1',
        telefonos: []
      },
      {
        tipo: 'Laboral',
        nombre: 'Primer Tribunal Laboral Federal de Asuntos Individuales en el Estado de Yucatán con residencia en Mérida',
        url: 'http://www.tsjyuc.gob.mx/',
        direccion: 'C. 56 330, Itzimná, 97100 Mérida, Yuc.',
        estado: '65d3c9132141bccfaefbd2d1',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgado 1o. de Oralidad Familiar del 1er. Depto. Judicial del Estado de Yucatán',
        url: 'http://www.tsjyuc.gob.mx/',
        direccion: 'Calle 97000, C. 35 501G, Centro, 97000 Yuc.',
        estado: '65d3c9132141bccfaefbd2d1',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgado de Garantía y Tribunal de Juicio Oral Zacatecas',
        url: 'http://www.tsjzac.gob.mx/',
        direccion: 'Calz. Héroes de Chapultepec 2002 - A, 98160 Zacatecas, Zac.',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Palacio de Justicia de Zacatecas',
        url: 'http://www.tsjzac.gob.mx/',
        direccion: 'Blvd. Heroes de Chapultepec #2002, Ciudad Gobierno, 98160 Zacatecas, Zac.',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil, ADMNISTRATIVO',
        nombre: 'Tribunal de Justicia Administrativa del Estado de Zacatecas',
        url: 'http://www.trijazac.gob.mx/',
        direccion: 'Av. Pedro Coronel 120 A, Los Geranios, 98619 Guadalupe, Zac.',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Centro De Justicia Penal Federal',
        url: '',
        direccion: 'Calle Tiro de la Esperanza S/N, entre el Derecho de Vía Antigua Carretera a Fresnillo y Derecho de Vía de Ferrocarril, 98160 Ciudad Administrativa, Zacatecas, Zac.',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil, Penal',
        nombre: 'Casa de Justicia Villanueva, Zacatecas',
        url: 'http://www.tsjzac.gob.mx/',
        direccion: 'Camino al Salto km., Villanueva 1, Pedro Ruiz Gonzalez, 98019 Zacatecas, Zac.',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados Civiles CDMX',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: 'Av. Niños Héroes 132, Doctores, Cuauhtémoc, 06720 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgados Familiares CDMX',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: 'Av. Juarez 8, Colonia Centro, Centro, Cuauhtémoc, 06010 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial de la CDMX, juzgados Civiles de proceso escrito y Civiles de proceso oral.',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: ' Av. Patriotismo 230, San Pedro de los Pinos, Benito Juárez, 03800 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales CDMX',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: ' Dr. Lavista 114, Doctores, Cuauhtémoc, 06720 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados De Distrito Periférico',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: 'Av. Las Flores 242, Tlacopac, Álvaro Obregón, 01049 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Familiar',
        nombre: 'Juzgados Familiares CDMX',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: 'Av. Juarez 8, Colonia Centro, Centro, Cuauhtémoc, 06010 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Poder Judicial de la CDMX, juzgados Civiles de proceso escrito y Civiles de proceso oral.',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: ' Av. Patriotismo 230, San Pedro de los Pinos, Benito Juárez, 03800 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Penal',
        nombre: 'Juzgados Penales CDMX',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: ' Dr. Lavista 114, Doctores, Cuauhtémoc, 06720 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      },
      {
        tipo: 'Civil',
        nombre: 'Juzgados De Distrito Periférico',
        url: 'https://www.poderjudicialcdmx.gob.mx/',
        direccion: 'Av. Las Flores 242, Tlacopac, Álvaro Obregón, 01049 Ciudad de México, CDMX',
        estado: '65d3c9132141bccfaefbd2d2',
        telefonos: []
      }
    ];

    await JuzgadosSchema.insertMany(juzgados);
  } catch (error) {
    console.error('Error al crear juzgados'.red, error);
  }
};

const generateMaterias = async () => {
  const count = await MateriaSchema.countDocuments();
  if (count > 0) return;

  try {
    const materias = [
      {
        nombre: 'Amparo'
      },
      {
        nombre: 'Penal'
      },
      {
        nombre: 'Civil'
      },
      {
        nombre: 'Mercantil'
      },
      {
        nombre: 'Laboral'
      },
      {
        nombre: 'Contencioso Administrativo'
      },
      {
        nombre: 'Familiar'
      },
      {
        nombre: 'Agrario'
      }
    ];

    await MateriaSchema.insertMany(materias);
  } catch (error) {
    console.error('Error al crear materias'.red, error);
  }
};

const generateEtapasProcesales = async () => {
  const count = await EtapasProcesalesSchema.countDocuments();
  if (count > 0) return;

  try {
    const etapas = [
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Presentación de la demanda de amparo.'
      },
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Suspensión del acto reclamado.'
      },
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Hacer valer violaciones procesales.'
      },
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Admisión, prevención o desechamiento de la demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Notificación de las partes.'
      },
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Presentación de alegatos o amparo adhesivo.'
      },
      {
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Litigioso',
        nombre: 'Resolución por mayoría de votos.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Presentación de denuncia o querella.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Realización de carpeta de investigación.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Citatorio o aprehensión por parte del posible imputado.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Audiencia Inicial.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Audiencia intermedia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Audiencia de Juicio Oral.'
      },
      {
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Litigioso',
        nombre: 'Presentación De Demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Litigioso',
        nombre: 'Etapa Expositiva.'
      },
      {
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Litigioso',
        nombre: 'Audiencia Preliminar.'
      },
      {
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Litigioso',
        nombre: 'Etapa Probatoria.'
      },
      {
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Litigioso',
        nombre: 'Alegatos Y Conclusiones.'
      },
      {
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Litigioso',
        nombre: 'Presentación De Demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Litigioso',
        nombre: 'Etapa Expositiva O Postularía Del Juicio Oral Mercantil.'
      },
      {
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Litigioso',
        nombre: 'Audiencia Preliminar Del Juicio Oral Mercantil.'
      },
      {
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Litigioso',
        nombre: 'Audiencia De Juicio, Del Juicio Oral Mercantil.'
      },
      {
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Litigioso',
        nombre: 'Juicio Oral Mercantil.'
      },
      {
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Litigioso',
        nombre: 'Presentación de demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Litigioso',
        nombre: 'Audiencia de Conciliación.'
      },
      {
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Litigioso',
        nombre: 'Ofrecimiento y Excepción de Pruebas.'
      },
      {
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Litigioso',
        nombre: 'Formulación de Dictamen.'
      },
      {
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Litigioso',
        nombre: 'Discusión y Votación del Proyecto de Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Admisión de la Demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Contestación de la Autoridad.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Ofrecimiento y Admisión de Pruebas.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Alegatos.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Audiencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Litigioso',
        nombre: 'Presentación De Demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Litigioso',
        nombre: 'Etapa Expositiva.'
      },
      {
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Litigioso',
        nombre: 'Audiencia Preliminar.'
      },
      {
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Litigioso',
        nombre: 'Etapa Probatoria.'
      },
      {
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Litigioso',
        nombre: 'Alegatos Y Conclusiones.'
      },
      {
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      },
      {
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Litigioso',
        nombre: 'Demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Litigioso',
        nombre: 'Prevención de la demanda.'
      },
      {
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Litigioso',
        nombre: 'Audiencia de Negociación y o Conciliación.'
      },
      {
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Litigioso',
        nombre: 'Audiencia ante el Tribunal Agrario.'
      },
      {
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Litigioso',
        nombre: 'Sentencia.'
      }
    ];

    await EtapasProcesalesSchema.insertMany(etapas);
  } catch (error) {
    console.error('Error al crear etapas procesales'.red, error);
  }
};

const generateRecursosIncidencias = async () => {
  const count = await RecursosIncidencias.countDocuments();
  if (count > 0) return;

  try {
    const recursosIncidenciasArray = [
      {
        nombre: 'Recurso de Revisión.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Queja.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Reclamación.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Impugnación.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Apelación. \r\n',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Queja.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Denegación de Apelación.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de revocación.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Apelación.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de apelación extraordinaria. ',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de queja.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de revocación.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Apelación.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de reposición.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Reclamación.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Reconsideración.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Revisión de Actos.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Revisión.',
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de revocación..',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Apelación.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de reposición.  ',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de apelación extraordinaria.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de queja.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Recurso'
      },
      {
        nombre: 'Recurso de Revisión.',
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Recurso'
      },
      {
        nombre: 'Incidente de Suspensión del Acto Reclamado.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Reposición de Autos.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Incompetencia.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Acumulación.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Falsedad de Documentos.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Reclamación de Daños y Perjuicio.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Cumplimiento Sustituto de Sentencias.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Revocación o Modificación de la Suspensión del Acto Reclamado.',
        materia: '65d3d3a060dc42b618520bba',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Nulidad de Actos Procesales.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Excusa y Reposición.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Acumulación.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Nulidad de Notificaciones.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Medidas Cautelares.',
        materia: '65d3d3a060dc42b618520bbb',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Cuestiones de competencia.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Impedimentos.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Acumulación de procesos.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Separación de procesos.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Suspensión del proceso.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidentes de Suspensión del proceso civil.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidentes diversos.',
        materia: '65d3d3a060dc42b618520bbc',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Integración.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Nulidad de Actuaciones.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Nulidad de Notificaciones.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidentes de Preparación.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de liquidación.',
        materia: '65d3d3a060dc42b618520bbd',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Nulidad.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Competencia.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Personalidad.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Acumulación.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Excusas.',
        materia: '65d3d3a060dc42b618520bbe',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Nulidad de Notificaciones.',
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Competencia.',
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Acumulación de procesos.',
        materia: '65d3d3a060dc42b618520bbf',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Cuestiones de competencia.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Impedimentos.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Acumulación de procesos.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Incidencia'
      },
      {
        nombre: 'Incidente de Separación de procesos.',
        materia: '65d3d3a060dc42b618520bc0',
        tipo: 'Incidencia'
      },
      {
        nombre: 'La ley agraria es omisa al señalar los incidentes que se pueden tramitar en su materia , por tanto se aplican supletoriamente los establecidos en materia civil.',
        materia: '65d3d3a060dc42b618520bc1',
        tipo: 'Incidencia'
      }
    ];

    await RecursosIncidencias.insertMany(recursosIncidenciasArray);
  } catch (error) {
    console.error('Error al crear recursos e incidencias'.red, error);
  }
};

const generateRegimen = async () => {
  const count = await RegimenSchema.countDocuments();
  if (count > 0) return;

  try {
    const regimenes = [
      {
        regimen: '601',
        descripcion: 'General de Ley Personas Morales',
        fisica: 'No',
        moral: 'Si'
      },
      {
        regimen: '603',
        descripcion: 'Personas Morales con Fines no Lucrativos',
        fisica: 'No',
        moral: 'Si'
      },
      {
        regimen: '605',
        descripcion: 'Sueldos y Salarios e Ingresos Asimilados a Salarios',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '606',
        descripcion: 'Arrendamiento',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '608',
        descripcion: 'Demás ingresos',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '610',
        descripcion: 'Residentes en el Extranjero sin Establecimiento Permanente en México',
        fisica: 'Si',
        moral: 'Si'
      },
      {
        regimen: '611',
        descripcion: 'Ingresos por Dividendos (socios y accionistas)',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '612',
        descripcion: 'Personas Físicas con Actividades Empresariales y Profesionales',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '614',
        descripcion: 'Ingresos por intereses',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '616',
        descripcion: 'Sin obligaciones fiscales',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '620',
        descripcion: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
        fisica: 'No',
        moral: 'Si'
      },
      {
        regimen: '621',
        descripcion: 'Incorporación Fiscal',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '622',
        descripcion: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
        fisica: 'Si',
        moral: 'Si'
      },
      {
        regimen: '623',
        descripcion: 'Opcional para Grupos de Sociedades',
        fisica: 'No',
        moral: 'Si'
      },
      {
        regimen: '624',
        descripcion: 'Coordinados',
        fisica: 'No',
        moral: 'Si'
      },
      {
        regimen: '607',
        descripcion: 'Régimen de Enajenación o Adquisición de Bienes',
        fisica: 'No',
        moral: 'Si'
      },
      {
        regimen: '615',
        descripcion: 'Régimen de los ingresos por obtención de premios',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '625',
        descripcion: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
        fisica: 'Si',
        moral: 'No'
      },
      {
        regimen: '626',
        descripcion: 'Régimen Simplificado de Confianza',
        fisica: 'Si',
        moral: 'Si'
      }
    ];

    await RegimenSchema.insertMany(regimenes);
  } catch (error) {
    console.error('Error al crear regimenes'.red, error);
  }
};

const generateBancos = async () => {
  const count = await BancoSchema.countDocuments();
  if (count > 0) return;

  try {
    const bancos = [
      {
        clave: '002',
        banco: 'BANAMEX  '
      },
      {
        clave: '006',
        banco: 'BANCOMEXT  '
      },
      {
        clave: '009',
        banco: 'BANOBRAS  '
      },
      {
        clave: '012',
        banco: 'BBVA BANCOMER '
      },
      {
        clave: '014',
        banco: 'SANTANDER  '
      },
      {
        clave: '019',
        banco: 'BANJERCITO  '
      },
      {
        clave: '021',
        banco: 'HSBC  '
      },
      {
        clave: '030',
        banco: 'BAJIO  '
      },
      {
        clave: '032',
        banco: 'IXE  '
      },
      {
        clave: '036',
        banco: 'INBURSA  '
      },
      {
        clave: '037',
        banco: 'INTERACCIONES  '
      },
      {
        clave: '042',
        banco: 'MIFEL  '
      },
      {
        clave: '044',
        banco: 'SCOTIABANK  '
      },
      {
        clave: '058',
        banco: 'BANREGIO  '
      },
      {
        clave: '059',
        banco: 'INVEX  '
      },
      {
        clave: '060',
        banco: 'BANSI  '
      },
      {
        clave: '062',
        banco: 'AFIRME  '
      },
      {
        clave: '072',
        banco: 'BANORTE  '
      },
      {
        clave: '102',
        banco: 'THE ROYAL BANK'
      },
      {
        clave: '103',
        banco: 'AMERICAN EXPRESS '
      },
      {
        clave: '106',
        banco: 'BAMSA  '
      },
      {
        clave: '108',
        banco: 'TOKYO  '
      },
      {
        clave: '110',
        banco: 'JP MORGAN '
      },
      {
        clave: '112',
        banco: 'BMONEX  '
      },
      {
        clave: '113',
        banco: 'VE POR MAS'
      },
      {
        clave: '116',
        banco: 'ING  '
      },
      {
        clave: '124',
        banco: 'DEUTSCHE  '
      },
      {
        clave: '126',
        banco: 'CREDIT SUISSE '
      },
      {
        clave: '127',
        banco: 'BANCO AZTECA '
      },
      {
        clave: '128',
        banco: 'AUTOFIN  '
      },
      {
        clave: '129',
        banco: 'BARCLAYS  '
      },
      {
        clave: '130',
        banco: 'COMPARTAMOS  '
      },
      {
        clave: '131',
        banco: 'BANCO FAMSA '
      },
      {
        clave: '132',
        banco: 'BMULTIVA  '
      },
      {
        clave: '133',
        banco: 'ACTINVER  '
      },
      {
        clave: '134',
        banco: 'WAL-MART  '
      },
      {
        clave: '135',
        banco: 'NAFIN  '
      },
      {
        clave: '136',
        banco: 'INTERBANCO  '
      },
      {
        clave: '137',
        banco: 'BANCOPPEL  '
      },
      {
        clave: '138',
        banco: 'ABC CAPITAL ABC'
      },
      {
        clave: '139',
        banco: 'UBS BANK '
      },
      {
        clave: '140',
        banco: 'CONSUBANCO  '
      },
      {
        clave: '141',
        banco: 'VOLKSWAGEN  '
      },
      {
        clave: '143',
        banco: 'CIBANCO  '
      },
      {
        clave: '145',
        banco: 'BBASE  '
      },
      {
        clave: '166',
        banco: 'BANSEFI  '
      },
      {
        clave: '168',
        banco: 'HIPOTECARIA FEDERAL '
      },
      {
        clave: '600',
        banco: 'MONEXCB  '
      },
      {
        clave: '601',
        banco: 'GBM  '
      },
      {
        clave: '602',
        banco: 'MASARI  '
      },
      {
        clave: '605',
        banco: 'VALUE  '
      },
      {
        clave: '606',
        banco: 'ESTRUCTURADORES  '
      },
      {
        clave: '607',
        banco: 'TIBER  '
      },
      {
        clave: '608',
        banco: 'VECTOR  '
      },
      {
        clave: '610',
        banco: 'B&B B y'
      },
      {
        clave: '614',
        banco: 'ACCIVAL  '
      },
      {
        clave: '615',
        banco: 'MERRILL LYNCH '
      },
      {
        clave: '616',
        banco: 'FINAMEX  '
      },
      {
        clave: '617',
        banco: 'VALMEX  '
      },
      {
        clave: '618',
        banco: 'UNICA  '
      },
      {
        clave: '619',
        banco: 'MAPFRE  '
      },
      {
        clave: '620',
        banco: 'PROFUTURO  '
      },
      {
        clave: '621',
        banco: 'CB ACTINVER '
      },
      {
        clave: '622',
        banco: 'OACTIN  '
      },
      {
        clave: '623',
        banco: 'SKANDIA  '
      },
      {
        clave: '626',
        banco: 'CBDEUTSCHE  '
      },
      {
        clave: '627',
        banco: 'ZURICH  '
      },
      {
        clave: '628',
        banco: 'ZURICHVI  '
      },
      {
        clave: '629',
        banco: 'SU CASITA '
      },
      {
        clave: '630',
        banco: 'CB INTERCAM '
      },
      {
        clave: '631',
        banco: 'CI BOLSA CI'
      },
      {
        clave: '632',
        banco: 'BULLTICK CB '
      },
      {
        clave: '633',
        banco: 'STERLING  '
      },
      {
        clave: '634',
        banco: 'FINCOMUN  '
      },
      {
        clave: '636',
        banco: 'HDI SEGUROS '
      },
      {
        clave: '637',
        banco: 'ORDER  '
      },
      {
        clave: '638',
        banco: 'AKALA  '
      },
      {
        clave: '640',
        banco: 'CB JPMORGAN '
      },
      {
        clave: '642',
        banco: 'REFORMA  '
      },
      {
        clave: '646',
        banco: 'STP  '
      },
      {
        clave: '647',
        banco: 'TELECOMM  '
      },
      {
        clave: '648',
        banco: 'EVERCORE  '
      },
      {
        clave: '649',
        banco: 'SKANDIA OPERADORA DE'
      },
      {
        clave: '651',
        banco: 'SEGUROS MONTERREY '
      },
      {
        clave: '652',
        banco: 'ASEA  '
      },
      {
        clave: '653',
        banco: 'KUSPIT  '
      },
      {
        clave: '655',
        banco: 'SOFIEXPRESS  '
      },
      {
        clave: '656',
        banco: 'UNAGRA  '
      },
      {
        clave: '659',
        banco: 'OPCIONES EMPRESARIALES DEL'
      },
      {
        clave: '901',
        banco: 'CLS  '
      },
      {
        clave: '902',
        banco: 'INDEVAL SD '
      },
      {
        clave: '670',
        banco: 'LIBERTAD  '
      }
    ];

    await BancoSchema.insertMany(bancos);
  } catch (error) {
    console.error('Error al crear bancos'.red, error);
  }
};

const estados = [
  {
    id: '65d3c9132141bccfaefbd2b4',
    nombre: 'Baja California',
    clave: 'BCN',
    pais: 'MEX',
    estado: '2'
  },
  {
    id: '65d3c9132141bccfaefbd2c6',
    nombre: 'Oaxaca',
    clave: 'OAX',
    pais: 'MEX',
    estado: '20'
  },
  {
    id: '65d3c9132141bccfaefbd2c0',
    nombre: 'Jalisco',
    clave: 'JAL',
    pais: 'MEX',
    estado: '14'
  },
  {
    id: '65d3c9132141bccfaefbd2b6',
    nombre: 'Campeche',
    clave: 'CAM',
    pais: 'MEX',
    estado: '4'
  },
  {
    id: '65d3c9132141bccfaefbd2c9',
    nombre: 'Quintana Roo',
    clave: 'ROO',
    pais: 'MEX',
    estado: '23'
  },
  {
    id: '65d3c9132141bccfaefbd2be',
    nombre: 'Guerrero',
    clave: 'GRO',
    pais: 'MEX',
    estado: '12'
  },
  {
    id: '65d3c9132141bccfaefbd2bf',
    nombre: 'Hidalgo',
    clave: 'HID',
    pais: 'MEX',
    estado: '13'
  },
  {
    id: '65d3c9132141bccfaefbd2c3',
    nombre: 'Morelos',
    clave: 'MOR',
    pais: 'MEX',
    estado: '17'
  },
  {
    id: '65d3c9132141bccfaefbd2bc',
    nombre: 'Durango',
    clave: 'DUR',
    pais: 'MEX',
    estado: '10'
  },
  {
    id: '65d3c9132141bccfaefbd2c5',
    nombre: 'Nuevo León',
    clave: 'NLE',
    pais: 'MEX',
    estado: '19'
  },
  {
    id: '65d3c9132141bccfaefbd2c1',
    nombre: 'Estado de México',
    clave: 'MEX',
    pais: 'MEX',
    estado: '15'
  },
  {
    id: '65d3c9132141bccfaefbd2bb',
    nombre: 'Ciudad de México',
    clave: 'DIF',
    pais: 'MEX',
    estado: '9'
  },
  {
    id: '65d3c9132141bccfaefbd2cd',
    nombre: 'Tabasco',
    clave: 'TAB',
    pais: 'MEX',
    estado: '27'
  },
  {
    id: '65d3c9132141bccfaefbd2ca',
    nombre: 'San Luis Potosí',
    clave: 'SLP',
    pais: 'MEX',
    estado: '24'
  },
  {
    id: '65d3c9132141bccfaefbd2d1',
    nombre: 'Yucatán',
    clave: 'YUC',
    pais: 'MEX',
    estado: '31'
  },
  {
    id: '65d3c9132141bccfaefbd2cc',
    nombre: 'Sonora',
    clave: 'SON',
    pais: 'MEX',
    estado: '26'
  },
  {
    id: '65d3c9132141bccfaefbd2c4',
    nombre: 'Nayarit',
    clave: 'NAY',
    pais: 'MEX',
    estado: '18'
  },
  {
    id: '65d3c9132141bccfaefbd2cb',
    nombre: 'Sinaloa',
    clave: 'SIN',
    pais: 'MEX',
    estado: '25'
  },
  {
    id: '65d3c9132141bccfaefbd2c7',
    nombre: 'Puebla',
    clave: 'PUE',
    pais: 'MEX',
    estado: '21'
  },
  {
    id: '65d3c9132141bccfaefbd2d0',
    nombre: 'Veracruz',
    clave: 'VER',
    pais: 'MEX',
    estado: '30'
  },
  {
    id: '65d3c9132141bccfaefbd2b8',
    nombre: 'Chihuahua',
    clave: 'CHH',
    pais: 'MEX',
    estado: '6'
  },
  {
    id: '65d3c9132141bccfaefbd2b5',
    nombre: 'Baja California Sur',
    clave: 'BCS',
    pais: 'MEX',
    estado: '3'
  },
  {
    id: '65d3c9132141bccfaefbd2b7',
    nombre: 'Chiapas',
    clave: 'CHP',
    pais: 'MEX',
    estado: '5'
  },
  {
    id: '65d3c9132141bccfaefbd2b3',
    nombre: 'Aguascalientes',
    clave: 'AGU',
    pais: 'MEX',
    estado: '1'
  },
  {
    id: '65d3c9132141bccfaefbd2c2',
    nombre: 'Michoacán',
    clave: 'MIC',
    pais: 'MEX',
    estado: '16'
  },
  {
    id: '65d3c9132141bccfaefbd2c8',
    nombre: 'Querétaro',
    clave: 'QUE',
    pais: 'MEX',
    estado: '22'
  },
  {
    id: '65d3c9132141bccfaefbd2bd',
    nombre: 'Guanajuato',
    clave: 'GUA',
    pais: 'MEX',
    estado: '11'
  },
  {
    id: '65d3c9132141bccfaefbd2cf',
    nombre: 'Tlaxcala',
    clave: 'TLA',
    pais: 'MEX',
    estado: '29'
  },
  {
    id: '65d3c9132141bccfaefbd2ba',
    nombre: 'Colima',
    clave: 'COL',
    pais: 'MEX',
    estado: '8'
  },
  {
    id: '65d3c9132141bccfaefbd2b9',
    nombre: 'Coahuila',
    clave: 'COA',
    pais: 'MEX',
    estado: '7'
  },
  {
    id: '65d3c9132141bccfaefbd2ce',
    nombre: 'Tamaulipas',
    clave: 'TAM',
    pais: 'MEX',
    estado: '28'
  },
  {
    id: '65d3c9132141bccfaefbd2d2',
    nombre: 'Zacatecas',
    clave: 'ZAC',
    pais: 'MEX',
    estado: '32'
  }
];

const generateDocumentacion = async () => {
  const count = await DocumentacionModel.countDocuments();
  if (count > 0) return;

  try {
    const documentacion = documentqacionJson.map((doc) => {
      return {
        nombre: doc.nombre.replace(/\r\n/g, ''),
        enlace: doc.liga.replace(/\r\n/g, ''),
        estado: encontrarEstado(doc, estados),
        estatus: 'Activo'
      };
    }).filter((doc) => doc.estado !== null);

    // console.log('Documentacion', documentacion.length);

    await DocumentacionModel.insertMany(documentacion);
  } catch (error) {
    console.error('Error al crear documentacion'.red, error);
  }
};

const encontrarEstado = (doc, estados) => {
  for (const estado of estados) {
    if (estado.estado === doc.id_estado) {
      return estado.id;
    }
  }
  return null;
};

const generateFiscalias = async () => {
  const count = await FiscaliaSchema.countDocuments();
  if (count > 0) return;

  try {
    const fiscalia = [
      {
        id_fiscalia: '1',
        nombre: 'Fiscalía General del Estado de Aguascalientes',
        liga: 'https://www.fiscalia-aguascalientes.gob.mx/',
        direccion: 'Av Héroe de Nacozari 201, Barrio de la Purísima, 20259 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '4494782800',
        estatus: 'activa'
      },
      {
        id_fiscalia: '2',
        nombre: 'Fiscalía General del Estado de Baja California',
        liga: 'http://www.fgebc.gob.mx/',
        direccion: 'Calz. de los Presidentes 1199, Río Nuevo, 21120 Mexicali, B.C.',
        id_estado: '2',
        telefonos: '6869044100',
        estatus: 'activa'
      },
      {
        id_fiscalia: '3',
        nombre: 'FISCALIA GENERAL DEL ESTADO DE BAJA CALIFORNIA SUR',
        liga: 'http://www.pgjebcs.gob.mx/',
        direccion: 'Luis Donaldo Colosio s/n, Emiliano Zapata, 23070 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '01 612 122 2230',
        estatus: 'activa'
      },
      {
        id_fiscalia: '4',
        nombre: 'Fiscalía General del Estado',
        liga: 'http://www.fgecam.campeche.gob.mx/',
        direccion: 'Av López Portillo s/n, Sascalum, 24095 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818119400',
        estatus: 'activa'
      },
      {
        id_fiscalia: '5',
        nombre: 'Fiscalía General del Estado de Chiapas',
        liga: 'http://www.fge.chiapas.gob.mx/',
        direccion: 'Libramiento Norte y Rosa Oriente 2010, El Bosque, 29049 Tuxtla Gutiérrez, Chis.',
        id_estado: '5',
        telefonos: '9616172300',
        estatus: 'activa'
      },
      {
        id_fiscalia: '6',
        nombre: 'Fiscalía General del Estado de Chihuahua',
        liga: 'http://fiscalia.chihuahua.gob.mx/',
        direccion: 'Av. Paseo Bolívar 712, Bolívar, Zona Centro, 31000 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '6144293300',
        estatus: 'activa'
      },
      {
        id_fiscalia: '7',
        nombre: 'Fiscalía General del Estado de Coahuila de Zaragoza',
        liga: 'http://www.fiscaliageneralcoahuila.gob.mx/',
        direccion: 'Humberto Castilla Salas 600, Nuevo Centro Metropolitano de Saltillo, 25050 Saltillo, Coah.',
        id_estado: '7',
        telefonos: '8444380700',
        estatus: 'activa'
      },
      {
        id_fiscalia: '8',
        nombre: 'Fiscalía General del Estado',
        liga: 'http://www.fgecolima.mx/fge_localizamp.php',
        direccion: 'Lib. Ote. Ejército Mexicano #200, Col de los Trabajadores, 28067 Colima, Col.',
        id_estado: '8',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_fiscalia: '9',
        nombre: 'Fiscalía General de la República Delegación Ciudad de Mexico',
        liga: 'https://www.fgjcdmx.gob.mx/',
        direccion: 'C. Dr. Lucio 135, Doctores, Cuauhtémoc, 06720 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '5553463607',
        estatus: 'activa'
      },
      {
        id_fiscalia: '10',
        nombre: 'Fiscalia General Del Estado De Durango',
        liga: 'http://fiscalia.durango.gob.mx/',
        direccion: 'Km 7.5, Durango - Torreon, Cd Industrial, 34208 Durango',
        id_estado: '10',
        telefonos: '6181373730',
        estatus: 'activa'
      },
      {
        id_fiscalia: '11',
        nombre: 'Fiscalía General del Estado de Guanajuato',
        liga: 'https://portal.fgeguanajuato.gob.mx/PortalWebEstatal/Inicio/Formularios/index.aspx',
        direccion: 'Carr. Marfil / San José de Cervera No.140, 36250 San José de Cervera, Gto.',
        id_estado: '11',
        telefonos: '4737352100',
        estatus: 'activa'
      },
      {
        id_fiscalia: '12',
        nombre: 'Fiscalía General del Estado',
        liga: 'https://fiscaliaguerrero.gob.mx/',
        direccion: 'René Juárez Cisneros S/N, El Potrerito, 39098 Chilpancingo de los Bravo, Gro.',
        id_estado: '12',
        telefonos: '7474942999',
        estatus: 'activa'
      },
      {
        id_fiscalia: '13',
        nombre: 'Procuraduría General de Justicia del Estado de Hidalgo',
        liga: 'http://procuraduria.hidalgo.gob.mx/',
        direccion: 'Carretera México Pachuca km 84.5, Centro Cívico, Centro Cívico, 42083 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '7717179000',
        estatus: 'activa'
      },
      {
        id_fiscalia: '14',
        nombre: 'Fiscalía Estatal',
        liga: 'http://fge.jalisco.gob.mx/',
        direccion: 'Nº 2550, C. 14, Colón Industrial, 44940 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3338376000',
        estatus: 'activa'
      },
      {
        id_fiscalia: '15',
        nombre: 'Fiscalía General de Justicia del Estado de México',
        liga: 'http://fgjem.edomex.gob.mx/',
        direccion: 'Av. J. M. Morelos Y P. 4 Ote. 1300, San Sebastián, 50150 Toluca de Lerdo, Méx.',
        id_estado: '15',
        telefonos: '7222261600',
        estatus: 'activa'
      },
      {
        id_fiscalia: '16',
        nombre: 'Fiscalía General del Estado de Michoacán',
        liga: 'http://fiscaliamichoacan.gob.mx/',
        direccion: 'Perif. Paseo de la República #5000, Sentimientos de la Nación, 58170 Morelia, Mich.',
        id_estado: '16',
        telefonos: '4433223600',
        estatus: 'activa'
      },
      {
        id_fiscalia: '17',
        nombre: 'Fiscalía General del Estado de Morelos',
        liga: 'https://www.fiscaliamorelos.gob.mx/',
        direccion: 'Blvd. Apatlaco 165, Campo Del Rayo, 62590 Temixco, Mor.',
        id_estado: '17',
        telefonos: '7773291500',
        estatus: 'activa'
      },
      {
        id_fiscalia: '18',
        nombre: 'Fiscalía General Del Estado De Nayarit.',
        liga: 'http://www.fiscaliageneral.nayarit.gob.mx/',
        direccion: 'Av. Tecnológico 3200, Microindustria, 63173 Tepic, Nay.',
        id_estado: '18',
        telefonos: '3111296000',
        estatus: 'activa'
      },
      {
        id_fiscalia: '19',
        nombre: 'Fiscalía General de Justicia del Estado de Nuevo León',
        liga: 'https://fiscalianl.gob.mx/',
        direccion: 'C. San Luis Potosí 301, Independencia, 64720 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8120204000',
        estatus: 'activa'
      },
      {
        id_fiscalia: '20',
        nombre: 'Fiscalía General del Estado de Oaxaca',
        liga: 'http://fge.oaxaca.gob.mx/',
        direccion: 'Carr. Cdad. Judicial, 71295 Reyes Mantecón, Oax.',
        id_estado: '20',
        telefonos: '9511624083',
        estatus: 'activa'
      },
      {
        id_fiscalia: '21',
        nombre: 'Fiscalía General del Estado (FGE) - Puebla',
        liga: 'http://fiscalia.puebla.gob.mx/',
        direccion: 'Blvd. Héroes del 5 de Mayo 31 Oriente-s/n, Ladrillera de Benítez, 72534 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '2222117900',
        estatus: 'activa'
      },
      {
        id_fiscalia: '22',
        nombre: 'Fiscalía General del Estado de Querétaro',
        liga: 'http://www.fiscaliageneralqro.gob.mx/',
        direccion: 'Autopista México - Querétaro 2060, Centro Sur, 76090 Santiago de Querétaro, Qro.',
        id_estado: '22',
        telefonos: '4422387600',
        estatus: 'activa'
      },
      {
        id_fiscalia: '23',
        nombre: 'Fiscalia General del Estado de Quintana Roo',
        liga: 'https://www.fgeqroo.gob.mx/',
        direccion: 'V. Xcaret esquina Kabah Lote 13, Supermanzana 21, 77500 Cancún, Q.R.',
        id_estado: '23',
        telefonos: '9988817150',
        estatus: 'activa'
      },
      {
        id_fiscalia: '24',
        nombre: 'Fiscalía General del Estado de San Luis Potosí',
        liga: 'http://www.fiscaliaslp.gob.mx/',
        direccion: 'Eje Vial Ponciano Arriaga 100, Zona Centro, 78000 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '4448122624',
        estatus: 'activa'
      },
      {
        id_fiscalia: '25',
        nombre: 'Fiscalia General del Estado de Sinaloa',
        liga: 'http://fiscaliasinaloa.mx/',
        direccion: 'Río Culiacan s/n, Tellería, 82017 Mazatlán, Sin.',
        id_estado: '25',
        telefonos: '6699820020',
        estatus: 'activa'
      },
      {
        id_fiscalia: '26',
        nombre: 'Fiscalía General de Justicia Del Estado De Sonora',
        liga: 'http://fiscalia.sonora.gob.mx/',
        direccion: 'Blvd. Rosales y, Del Canal S/N, Centro, 83000 Hermosillo, Son.',
        id_estado: '26',
        telefonos: '5588031957',
        estatus: 'activa'
      },
      {
        id_fiscalia: '27',
        nombre: 'Fiscalía General del Estado de Tabasco',
        liga: 'https://tabasco.gob.mx/fiscalia-general-del-estado-de-tabasco',
        direccion: 'Prol. P.º Usumacinta 802, Gil y Saenz, 86000 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '9933136550',
        estatus: 'activa'
      },
      {
        id_fiscalia: '28',
        nombre: 'Fiscalía General de Justicia de Tamaulipas',
        liga: 'https://www.fgjtam.gob.mx/',
        direccion: 'Edificio Concorde, Segundo Piso, Altamira No. 611, Zona Centro, Tampico, Tamps.',
        id_estado: '28',
        telefonos: '8332293831',
        estatus: 'activa'
      },
      {
        id_fiscalia: '29',
        nombre: 'Procuraduría General de Justicia del Estado (PGJE) - Tlaxcala',
        liga: 'https://pgjtlaxcala.gob.mx/',
        direccion: 'Liramiento Poniente Sn, La Loma Xicohtencatl, Col. Unitlax, 90000 Tlaxcala de Xicohténcatl, Tlax.',
        id_estado: '29',
        telefonos: '2464650500',
        estatus: 'activa'
      },
      {
        id_fiscalia: '30',
        nombre: 'Fiscalia General del Estado de Veracruz',
        liga: 'https://fiscaliaveracruz.gob.mx/',
        direccion: 'Blvrd Fidel Velázquez S/N, Tecnológico, 91870 de, Ver.',
        id_estado: '30',
        telefonos: '2222112301',
        estatus: 'activa'
      },
      {
        id_fiscalia: '31',
        nombre: 'Fiscalia General Del Estado Yucatán',
        liga: 'http://www.fge.yucatan.gob.mx/',
        direccion: 'Km. 46.5, Periférico Poniente Polígon Susulá - Caucel Planking, Catastral, 20832 Mérida, Yuc.',
        id_estado: '31',
        telefonos: '9999303250',
        estatus: 'activa'
      },
      {
        id_fiscalia: '32',
        nombre: 'Fiscalía General de Justicia del Estado de Zacatecas',
        liga: 'https://www.fiscaliazacatecas.gob.mx/',
        direccion: 'Avenida Circuito Zacatecas No. 401 Col. Ciudad Gobierno, 98160 Zacatecas, Zac.',
        id_estado: '32',
        telefonos: '4929256050',
        estatus: 'activa'
      }
    ];

    const fiscaliasEstado = fiscalia.map((f) => {
      return {
        nombre: f.nombre,
        direccion: f.direccion,
        liga: f.liga,
        estado: encontrarEstado(f, estados),
        estatus: 'Activo'
      };
    }).filter((f) => f.estado !== null);

    await FiscaliaSchema.insertMany(fiscaliasEstado);
  } catch (error) {
    console.error('Error al crear fiscalias'.red, error);
  }
};

const createDependencias = async () => {
  const count = await DependenciaSchema.countDocuments();
  if (count > 0) return;

  try {
    const dependencias = [
      {
        id_dependencia: '1',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado Municipal Secretaría Particular',
        liga: '',
        direccion: 'Plaza Principal 4, Centro, 98700 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '4589440087',
        estatus: 'activa'
      },
      {
        id_dependencia: '2',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Salud del Estado de Aguascalientes',
        liga: 'https:\/\/www.issea.gob.mx\/',
        direccion: 'Margil de Jesús 1501, Las Arboledas, 20020 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '4499107900',
        estatus: 'activa'
      },
      {
        id_dependencia: '3',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Finanzas',
        liga: 'https:\/\/www.aguascalientes.gob.mx\/sefi\/',
        direccion: 'Av. de la Convención de 1914 Ote. 102, Col del Trabajo, 20180 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '4499102525',
        estatus: 'activa'
      },
      {
        id_dependencia: '4',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Economía Social y Turismo Municipal',
        liga: 'http:\/\/www.ags.gob.mx\/turismo',
        direccion: 'Antonio Acevedo Escobedo 133, Zona Centro, 20000 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '4499101030',
        estatus: 'activa'
      },
      {
        id_dependencia: '5',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Administración',
        liga: 'http:\/\/www.aguascalientes.gob.mx\/sae',
        direccion: 'Av. de la Convención de 1914 Ote. 104, Col del Trabajo, 20180 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '4499102500',
        estatus: 'activa'
      },
      {
        id_dependencia: '6',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Servicios Públicos Municipales de Aguascalientes',
        liga: '',
        direccion: 'Silvestre Gómez, Primo Verdad, 20130 Aguascalientes, Ags.',
        id_estado: '1',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '7',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Baja California',
        liga: 'https:\/\/www.gob.mx\/sct\/',
        direccion: 'Ayuntamiento de Ensenada, No. 1600, Carretera. Transpeninsular 6500A, Ex-Ejido Chapultepec, 22880 Ensenada, B.C.',
        id_estado: '2',
        telefonos: '6461723000',
        estatus: 'activa'
      },
      {
        id_dependencia: '8',
        tipo: 'Dependencia',
        nombre: 'SCT Secretaría de Comunicaciones y Transportes',
        liga: 'https:\/\/www.gob.mx\/sct\/',
        direccion: 'C. Dieciséis 1071, Buena Vista, Libertad, 22400 Tijuana, B.C.',
        id_estado: '2',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '9',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Finanzas del Gobierno del Estado de Baja California Sur',
        liga: '',
        direccion: 'Avenida Ignacio Allende SN, Ciudad Insurgentes, 23700 Comondú, B.C.',
        id_estado: '2',
        telefonos: '6131310109',
        estatus: 'activa'
      },
      {
        id_dependencia: '10',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo de Baja California',
        liga: 'http:\/\/www.bajacalifornia.gob.mx\/secture\/',
        direccion: 'Baja California Center, Escénica Tijuana-Ensenada 1029, Ejido Mazatlán, 22170 Playas de Rosarito, B.C.',
        id_estado: '2',
        telefonos: '6646242020',
        estatus: 'activa'
      },
      {
        id_dependencia: '11',
        tipo: 'Dependencia',
        nombre: 'Secretaria Seguridad Pública',
        liga: '',
        direccion: 'Calle Bahía de Los Ángeles Sn, Baja California, 21250 Mexicali, B.C.',
        id_estado: '2',
        telefonos: '6865532120',
        estatus: 'activa'
      },
      {
        id_dependencia: '12',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Bienestar del Estado de Baja California',
        liga: 'https:\/\/www.bajacalifornia.gob.mx\/Secretarias\/Secretaria_Bienestar',
        direccion: 'Calz Independencia 994, Centro Cívico, 21000 Mexicali, B.C.',
        id_estado: '2',
        telefonos: '6865580809',
        estatus: 'activa'
      },
      {
        id_dependencia: '13',
        tipo: 'Dependencia',
        nombre: 'Secretaría General de Gobierno del Estado',
        liga: '',
        direccion: 'Isabel La Católica SN, Centro, 23000 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '6121239424',
        estatus: 'activa'
      },
      {
        id_dependencia: '14',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Seguridad Pública del Estado de Baja California Sur',
        liga: '',
        direccion: 'Emiliano Zapata, 23070 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '15',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Salud del Estado de Baja California Sur',
        liga: '',
        direccion: 'Revolución de 1910 822, Estherito, 23020 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '6121751100',
        estatus: 'activa'
      },
      {
        id_dependencia: '16',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Finanzas del Gobierno del Estado de Baja california Sur',
        liga: '',
        direccion: 'Av. de la Juventud Sn, Downtown, Mariano Matamoros, 23468 Cabo San Lucas, B.C.S.',
        id_estado: '3',
        telefonos: '6241050781',
        estatus: 'activa'
      },
      {
        id_dependencia: '17',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Economía',
        liga: '',
        direccion: 'Politécnico Nacional 325, Playa Palo de Sta Rita, 23096 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '6121221117',
        estatus: 'activa'
      },
      {
        id_dependencia: '18',
        tipo: 'Dependencia',
        nombre: 'Secretaría del Trabajo y Previsión Social - STPS',
        liga: '',
        direccion: 'Ignacio Allende 1486, Perla, 23040 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '526121224248',
        estatus: 'activa'
      },
      {
        id_dependencia: '19',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación Pública Unidad de Jefes de Enseñanza de Educación Secundaria Técnica',
        liga: '',
        direccion: 'Jalisco 1420, Las Garzas, 23079 La Paz, B.C.S.',
        id_estado: '3',
        telefonos: '6121234281',
        estatus: 'activa'
      },
      {
        id_dependencia: '20',
        tipo: 'Dependencia',
        nombre: 'SEGOB Campeche',
        liga: 'http:\/\/segobcampeche.gob.mx\/',
        direccion: '24000, Calle 8 203A, Zona Centro, San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818119200',
        estatus: 'activa'
      },
      {
        id_dependencia: '21',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Protección y Seguridad Ciudadana Estado de Campeche',
        liga: 'http:\/\/www.spsc.campeche.gob.mx\/',
        direccion: 'Av. Lázaro Cárdenas por, Av. López Portillo, Los Laureles, 24096 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818119110',
        estatus: 'activa'
      },
      {
        id_dependencia: '22',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo Campeche',
        liga: '',
        direccion: 'Av. Adolfo Ruiz Cortínez 111, Área Ah, 24014 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9811273300',
        estatus: 'activa'
      },
      {
        id_dependencia: '23',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Contraloría',
        liga: 'http:\/\/www.contraloria.campeche.gob.mx\/',
        direccion: 'C. 63 Nº13, Zona Centro, 24000 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818114002',
        estatus: 'activa'
      },
      {
        id_dependencia: '24',
        tipo: 'Dependencia',
        nombre: 'SEP Delegación Federal Campeche',
        liga: 'http:\/\/www.sep.gob.mx\/',
        direccion: 'Av. Casa de Justicia, Fracciorama 2000, 24090 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9811699494',
        estatus: 'activa'
      },
      {
        id_dependencia: '25',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Agricultura y Recursos Hidráulicos',
        liga: ' ',
        direccion: 'Av. Gobernadores 291, Barrio de Sta. Ana, 24060 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818164735',
        estatus: 'activa'
      },
      {
        id_dependencia: '26',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación Cultura y El Deporte',
        liga: '',
        direccion: 'Av. Maestros Campechanos SN, Sascalum, 24095 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818112402',
        estatus: 'activa'
      },
      {
        id_dependencia: '27',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Modernización Administrativa e Innovación Gubernamental',
        liga: 'http:\/\/www.seplan.campeche.gob.mx\/',
        direccion: 'Avenida Ruiz Cortínez 112, Barrio de San Román, 24040 San Francisco de Campeche, Camp.',
        id_estado: '4',
        telefonos: '9818110864',
        estatus: 'activa'
      },
      {
        id_dependencia: '28',
        tipo: 'Dependencia',
        nombre: 'Secretaria General de Gobierno',
        liga: 'https:\/\/www.sgg.chiapas.gob.mx\/',
        direccion: 'Central Norte s\/n, Centro, 29000 Tuxtla Gutiérrez, CAMP',
        id_estado: '5',
        telefonos: '9616129047',
        estatus: 'activa'
      },
      {
        id_dependencia: '29',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Hacienda del estado de Chiapas',
        liga: 'http:\/\/www.haciendachiapas.gob.mx\/',
        direccion: 'Andrés Serra Rojas 1090, Paso Limón, 29040 Tuxtla Gutiérrez, Chis.',
        id_estado: '5',
        telefonos: '9616914040',
        estatus: 'activa'
      },
      {
        id_dependencia: '30',
        tipo: 'Dependencia',
        nombre: 'Subsecretaría de Ingresos de la Secretaría de Hacienda del estado de Chiapas',
        liga: 'http:\/\/www.ingresos.haciendachiapas.gob.mx\/',
        direccion: 'Boulevard Andrés Serra Rojas No. 1090, Torre Chiapas, Piso 6, Col. El Retiro C.P., Satélite Loma Larga, 29045 Tuxtla Gutiérrez, Chis.',
        id_estado: '5',
        telefonos: '9616914043',
        estatus: 'activa'
      },
      {
        id_dependencia: '31',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Función Pública de Estado de Chiapas',
        liga: '',
        direccion: 'Central 100, Terán, 29000 Tuxtla Gutiérrez, Chis.',
        id_estado: '5',
        telefonos: '9616136697',
        estatus: 'activa'
      },
      {
        id_dependencia: '32',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Honestidad y Función Pública del estado de Chiapas',
        liga: '',
        direccion: 'Boulevard. Belisario Domínguez 1713, Villas Montes Azules, 29000 Tuxtla Gutiérrez, Chis.',
        id_estado: '5',
        telefonos: '9616187530',
        estatus: 'activa'
      },
      {
        id_dependencia: '33',
        tipo: 'Dependencia',
        nombre: 'Coordinación de Asesores de la Secretaría General de Gobierno del Estado de Chiapas',
        liga: '',
        direccion: 'Av. Central Ote. SN, Centro, 29000 Tuxtla Gutiérrez, Chis.',
        id_estado: '5',
        telefonos: '9616132053',
        estatus: 'activa'
      },
      {
        id_dependencia: '34',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Chihuahua',
        liga: '',
        direccion: 'Santa Rosa, 31050 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '35',
        tipo: 'Dependencia',
        nombre: 'Obras Públicas del Gobierno del Estado',
        liga: 'http:\/\/www.chihuahua.gob.mx\/',
        direccion: 'Joaquín Terrazas 300, Santa Rosa, 31050 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '6144397878',
        estatus: 'activa'
      },
      {
        id_dependencia: '36',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Hacienda, Gobierno del Estado',
        liga: '',
        direccion: 'Zona Centro, 31000 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '37',
        tipo: 'Dependencia',
        nombre: 'Dirección de Ecología de la Secretaría de Desarrollo Urbano y Ecología de Gobierno del Estado de Chihuahua',
        liga: 'https:\/\/chihuahua.gob.mx\/sedue',
        direccion: 'Av. Benito Juárez 1108, Zona Centro, 31000 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '6144293300',
        estatus: 'activa'
      },
      {
        id_dependencia: '38',
        tipo: 'Dependencia',
        nombre: 'Gobierno Estado Chihuahua Secretaría de Educación y Cultura',
        liga: '',
        direccion: 'José Esteban Coronado 2701, Obrera, 31350 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '6144293300',
        estatus: 'activa'
      },
      {
        id_dependencia: '39',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Comunicaciones y Obras Públicas',
        liga: 'http:\/\/transparencia.chihuahua.gob.mx\/',
        direccion: 'Beethoven 4000, Herradura la Salle, 31206 Chihuahua, Chih.',
        id_estado: '6',
        telefonos: '6144113084',
        estatus: 'activa'
      },
      {
        id_dependencia: '40',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno',
        liga: 'http:\/\/sgob.sfpcoahuila.gob.mx\/',
        direccion: 'Palacio de Gobierno, Miguel Hidalgo y Juárez S\/N-2° Piso, Zona Centro, 25000 Saltillo, Coah.',
        id_estado: '7',
        telefonos: '8444118529',
        estatus: 'activa'
      },
      {
        id_dependencia: '41',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Fiscalización y Rendición de Cuentas',
        liga: 'https:\/\/www.sefircoahuila.gob.mx\/',
        direccion: 'Periferico Luis Echeverría S\/N, Nuevo Centro Metropolitano de Saltillo, 25020 Saltillo, Coah.',
        id_estado: '7',
        telefonos: '8449869800',
        estatus: 'activa'
      },
      {
        id_dependencia: '42',
        tipo: 'Dependencia',
        nombre: 'Secretaria De Seguridad Pública del Estado de Coahuila',
        liga: '',
        direccion: 'Periferico Luis Echeverría 5402-1, Nuevo Centro Metropolitano de Saltillo, 25022 Saltillo, Coah.',
        id_estado: '7',
        telefonos: '8444389800',
        estatus: 'activa'
      },
      {
        id_dependencia: '43',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura del Gobierno de Coahuila',
        liga: '',
        direccion: 'Juárez Hidalgo 435, Zona Centro, 25000 Saltillo, Coah.',
        id_estado: '7',
        telefonos: '8444100033',
        estatus: 'activa'
      },
      {
        id_dependencia: '44',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado Secretaría de Administración',
        liga: '',
        direccion: 'Centro, Dr. Miguel Galindo 517, Fátima, 72000 Colima, Col.',
        id_estado: '8',
        telefonos: '3123123991',
        estatus: 'activa'
      },
      {
        id_dependencia: '45',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación Colima',
        liga: 'http:\/\/www.secolima.gob.mx\/',
        direccion: 'Av. Gonzalo de Sandoval 760, Las Víboras, 28040 Colima, Col.',
        id_estado: '8',
        telefonos: '3123161500',
        estatus: 'activa'
      },
      {
        id_dependencia: '46',
        tipo: 'Dependencia',
        nombre: 'Secretaría de rentas del gobierno del estado de colima',
        liga: '',
        direccion: 'Complejo administrativo, La Atrevida, 28000 Colima, Col.',
        id_estado: '8',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '47',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Seguridad Pública del Estado de Colima',
        liga: '',
        direccion: 'Calzada Pedro A. Galván Norte 502, Centro, 28000 Colima, Col.',
        id_estado: '8',
        telefonos: '3123145578',
        estatus: 'activa'
      },
      {
        id_dependencia: '48',
        tipo: 'Dependencia',
        nombre: 'SEIDUM Secretaría de Infraestructura, Desarrollo Urbano y Movilidad',
        liga: 'https:\/\/www.col.gob.mx\/desarrollourbano',
        direccion: 'Boulevard Camino Real 435, José María Morelos, 28017 Colima, Col.',
        id_estado: '8',
        telefonos: '3123130150',
        estatus: 'activa'
      },
      {
        id_dependencia: '49',
        tipo: 'Dependencia',
        nombre: 'Secretaria del Trabajo y Previsión Social del Gobierno del Estado de Colima',
        liga: '',
        direccion: 'Complejo Administrativo del Gobierno del Estado de Colima 3er. Anillo Periférico Esq. Ejército Mexicano S\/N. Colonia el Diezmo Código Postal 28010, Col.',
        id_estado: '8',
        telefonos: '3162000',
        estatus: 'activa'
      },
      {
        id_dependencia: '50',
        tipo: 'Dependencia',
        nombre: 'Secretaría General de Gobierno',
        liga: 'http:\/\/secretariageneral.durango.gob.mx\/',
        direccion: '34240 Durango, Dgo.',
        id_estado: '10',
        telefonos: '6181379541',
        estatus: 'activa'
      },
      {
        id_dependencia: '51',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Contraloría',
        liga: 'https:\/\/contraloria.durango.gob.mx\/',
        direccion: 'C. Pino Suárez 1000, Zona Centro, 34000 Durango, Dgo.',
        id_estado: '10',
        telefonos: '6181377200',
        estatus: 'activa'
      },
      {
        id_dependencia: '52',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación del Estado de Durango',
        liga: 'http:\/\/educacion.durango.gob.mx\/',
        direccion: 'Boulevard. Domingo Arrieta 1700, Gral. Domingo Arrieta, 34180 Durango, Dgo.',
        id_estado: '10',
        telefonos: '6181376251',
        estatus: 'activa'
      },
      {
        id_dependencia: '53',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Bienestar Social del Estado de Durango',
        liga: 'http:\/\/bienestarsocial.durango.gob.mx\/',
        direccion: 'Boulevard. Domingo Arrieta 200, Gral. Domingo Arrieta, 34180 Durango, Dgo.',
        id_estado: '10',
        telefonos: '6181379492',
        estatus: 'activa'
      },
      {
        id_dependencia: '54',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Agricultura y Desarrollo Rural',
        liga: 'http:\/\/www.sagdr.gob.mx\/',
        direccion: 'Boulevard. Francisco Villa 5025, Cd Industrial, 34208 Durango, Dgo.',
        id_estado: '10',
        telefonos: '6188291800',
        estatus: 'activa'
      },
      {
        id_dependencia: '55',
        tipo: 'Dependencia',
        nombre: 'Secretaría del Gobierno del Estado de México',
        liga: 'https:\/\/sgg.edomex.gob.mx\/',
        direccion: 'Valentín Gómez Farías 402, Francisco Murguía, 50040 Toluca de Lerdo, Méx.',
        id_estado: '15',
        telefonos: '7221671921',
        estatus: 'activa'
      },
      {
        id_dependencia: '56',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Finanzas',
        liga: 'http:\/\/www.edomex.gob.mx\/',
        direccion: 'Calle Sebastián Lerdo de Tejada 300, Centro, 50000 Toluca de Lerdo, Méx.',
        id_estado: '15',
        telefonos: '7222760040',
        estatus: 'activa'
      },
      {
        id_dependencia: '57',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Desarrollo Social Estado de México',
        liga: 'http:\/\/sedesem.edomex.gob.mx\/',
        direccion: 'Carretera Toluca - México 2077, Delegación Sta. Ana Tlapaltitlán, 50160 Santa Ana Tlapaltitlán, Méx.',
        id_estado: '15',
        telefonos: '7222260182',
        estatus: 'activa'
      },
      {
        id_dependencia: '58',
        tipo: 'Dependencia',
        nombre: 'Secretaría del Trabajo',
        liga: 'https:\/\/strabajo.edomex.gob.mx\/',
        direccion: 'Calle Rafael M. Hidalgo 301, Cuauhtémoc, 50130 Toluca de Lerdo, Méx.',
        id_estado: '15',
        telefonos: '7222760900',
        estatus: 'activa'
      },
      {
        id_dependencia: '59',
        tipo: 'Dependencia',
        nombre: 'SECAMPO Secretaría del Campo EdoMéx',
        liga: 'https:\/\/secampo.edomex.gob.mx\/',
        direccion: 'Conjunto SEDAGRO Rancho San Lorenzo S\/N, San Lorenzo Coacalco, 52140 San Lorenzo Coacalco, Méx.',
        id_estado: '15',
        telefonos: '7222756400',
        estatus: 'activa'
      },
      {
        id_dependencia: '60',
        tipo: 'Dependencia',
        nombre: 'Secretaría De Movilidad',
        liga: 'http:\/\/smovilidad.edomex.gob.mx\/',
        direccion: 'Av. Vía Gustavo Baz 2160, La Loma, 54060 Tlalnepantla, Méx.',
        id_estado: '15',
        telefonos: '5553668200',
        estatus: 'activa'
      },
      {
        id_dependencia: '61',
        tipo: 'Dependencia',
        nombre: 'Secretaría de las Mujeres, Gobierno del Estado de México',
        liga: 'http:\/\/semujeres.edomex.gob.mx\/',
        direccion: 'Av. Miguel Hidalgo Ote. 1031, Barrio de San Bernardino, 50080 Toluca de Lerdo, Méx.',
        id_estado: '15',
        telefonos: '7229342700',
        estatus: 'activa'
      },
      {
        id_dependencia: '62',
        tipo: 'Dependencia',
        nombre: 'Secretaria General De Gobierno',
        liga: 'https:\/\/sgg.jalisco.gob.mx\/',
        direccion: 'Juan de La Barrera 1357, La Guadalupana, 44220 Guadalajara, Jal.',
        id_estado: '11',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '63',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Administración',
        liga: 'https:\/\/administracion.jalisco.gob.mx\/',
        direccion: 'Av. Fray Antonio Alcalde 1221, Miraflores, 44266 Guadalajara, Jal.',
        id_estado: '11',
        telefonos: '3336681804',
        estatus: 'activa'
      },
      {
        id_dependencia: '64',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Servicios Públicos Municipales de Guadalajara',
        liga: '',
        direccion: 'C. Ignacio Zaragoza 39, Zona Centro, 44200 Guadalajara, Jal.',
        id_estado: '11',
        telefonos: '3336157895',
        estatus: 'activa'
      },
      {
        id_dependencia: '65',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Desarrollo Urbano Guadalajara',
        liga: 'https:\/\/info.jalisco.gob.mx\/area\/direccion-de-desarrollo-urbano',
        direccion: 'Fray Antonio Alcalde 1221, Observatorio, Guadalajara, Jal.',
        id_estado: '11',
        telefonos: '3338192300',
        estatus: 'activa'
      },
      {
        id_dependencia: '66',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Hacienda Publica',
        liga: 'https:\/\/hacienda.jalisco.gob.mx\/',
        direccion: 'C. Pedro Moreno 281, Zona Centro, 44100 Guadalajara, Jal.',
        id_estado: '11',
        telefonos: '3330301700',
        estatus: 'activa'
      },
      {
        id_dependencia: '67',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Seguridad',
        liga: '',
        direccion: 'C. Ignacio Herrera y Cairo, 44200 Guadalajara, Jal.',
        id_estado: '11',
        telefonos: '3330307900',
        estatus: 'activa'
      },
      {
        id_dependencia: '68',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Fianzas del Gobierno del Estado',
        liga: '',
        direccion: 'Libertad 56, Centro, 46100 Villa Guerrero, Gro.',
        id_estado: '12',
        telefonos: '4379645121',
        estatus: 'activa'
      },
      {
        id_dependencia: '69',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación Guerrero',
        liga: 'https:\/\/www.guerrero.gob.mx\/dependencia\/sector-central\/secretaria-de-educacion-guerrero\/',
        direccion: 'Acapulco 7, Unidad Guerrerense, 39043 Chilpancingo de los Bravo, Gro.',
        id_estado: '12',
        telefonos: '7474721300',
        estatus: 'activa'
      },
      {
        id_dependencia: '70',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Salud Guerrero',
        liga: '',
        direccion: 'Primer Congreso de Anáhuac Sn, Burócratas, 39000 Chilpancingo de los Bravo, Gro.',
        id_estado: '12',
        telefonos: '7474714795',
        estatus: 'activa'
      },
      {
        id_dependencia: '71',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Finanzas y Administración de Guerrero',
        liga: '',
        direccion: 'Boulevard Rene Juárez Cisneros 62m Col. Cd. de los servicios, 39074 Chilpancingo de los Bravo, Gro.',
        id_estado: '12',
        telefonos: '7474719700',
        estatus: 'activa'
      },
      {
        id_dependencia: '72',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura de Guerrero',
        liga: '',
        direccion: 'Plaza Cívica Primer Congreso de Anáhuac Sn, Centro, 39000 Chilpancingo de los Bravo, Gro.',
        id_estado: '12',
        telefonos: '7474727795',
        estatus: 'activa'
      },
      {
        id_dependencia: '73',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Planeación y Desarrollo Regional de Guerrero',
        liga: 'https:\/\/www.guerrero.gob.mx\/dependencia\/sector-central\/secretaria-de-planeacion-y-desarrollo-regional\/',
        direccion: 'Presa Topiltepec 9, Agua Potable y Alcantarillado, 39070 Chilpancingo de los Bravo, Gro.',
        id_estado: '12',
        telefonos: '7473561312',
        estatus: 'activa'
      },
      {
        id_dependencia: '74',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno del Estado de Hidalgo',
        liga: '',
        direccion: 'Palacio de Gobierno, Plaza Benito Juárez, 2da P S\/N, Centro, Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '75',
        tipo: 'Dependencia',
        nombre: 'Órgano interno de control de la secretaría de salud de hidalgo',
        liga: '',
        direccion: 'Boulevard. Valle de San Javier 110, Valle de San Javier, 42086 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '76',
        tipo: 'Dependencia',
        nombre: 'Secretaría De Seguridad Pública De Hidalgo',
        liga: 'https:\/\/s-seguridad.hidalgo.gob.mx\/',
        direccion: 'sobre Carretera, Boulevard Luis Donaldo Colosio, Pachuca - Actopan S\/N-II, Colosio II, 42039 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '7714731300',
        estatus: 'activa'
      },
      {
        id_dependencia: '77',
        tipo: 'Dependencia',
        nombre: 'Subsecretaria De Salud Publica Secretaria De Salud De Hidalgo',
        liga: '',
        direccion: 'Boulevard Luis Donaldo Colosio, Calabazas, Canutillo, 42182 Santiago Jaltepec, Hgo.',
        id_estado: '13',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '78',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Desarrollo Humano y Social',
        liga: 'https:\/\/www.pachuca.gob.mx\/portal\/desarrollo-humano-y-social\/',
        direccion: 'Parque Hidalgo, Ex Hacienda de Guadalupe, 42050 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '7717178600',
        estatus: 'activa'
      },
      {
        id_dependencia: '79',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Servicios Municipales',
        liga: '',
        direccion: 'Lirio 100, Nueva Francisco I Madero, Francisco I. Madero, 42070 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '7717177930',
        estatus: 'activa'
      },
      {
        id_dependencia: '80',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo de Hidalgo',
        liga: '',
        direccion: 'Camino Real de La Plata 340, Zona Plateada, 42084 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '7717184489',
        estatus: 'activa'
      },
      {
        id_dependencia: '81',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Obras Públicas y Ordenamiento Territorial (SOPOT)',
        liga: 'https:\/\/s-obraspublicas.hidalgo.gob.mx\/',
        direccion: 'Venta Prieta, 42083 Pachuca de Soto, Hgo.',
        id_estado: '13',
        telefonos: '7717178000',
        estatus: 'activa'
      },
      {
        id_dependencia: '82',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación del Estado de Jalisco',
        liga: 'http:\/\/portalsej.jalisco.gob.mx\/',
        direccion: 'Av. Central Guillermo González Camarena 615, Poniente, 45136 Zapopan, Jal.',
        id_estado: '14',
        telefonos: '3330307500',
        estatus: 'activa'
      },
      {
        id_dependencia: '83',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Administración',
        liga: 'https:\/\/administracion.jalisco.gob.mx\/',
        direccion: 'Av. Fray Antonio Alcalde 1221, Miraflores, 44266 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3336681804',
        estatus: 'activa'
      },
      {
        id_dependencia: '84',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura Jalisco',
        liga: 'http:\/\/sc.jalisco.gob.mx\/',
        direccion: 'C. Ignacio Zaragoza 244, Zona Centro, 44100 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3330304500',
        estatus: 'activa'
      },
      {
        id_dependencia: '85',
        tipo: 'Dependencia',
        nombre: 'Secretaría General de Gobierno. ',
        liga: '',
        direccion: 'Calle Francisco I. Madero 110, Zona Centro, 44100 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3336681800',
        estatus: 'activa'
      },
      {
        id_dependencia: '86',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Planeación y Participación Ciudadana',
        liga: '',
        direccion: 'C. Magisterio 1499-1er Piso, Miraflores, 44270 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3338192374',
        estatus: 'activa'
      },
      {
        id_dependencia: '87',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Salud del Estado de Jalisco',
        liga: 'http:\/\/ssj.jalisco.gob.mx\/',
        direccion: 'Dr. Baeza Alzaga 107, Zona Centro, 44100 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3330305000',
        estatus: 'activa'
      },
      {
        id_dependencia: '88',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Transporte de Jalisco',
        liga: 'https:\/\/setrans.jalisco.gob.mx\/',
        direccion: 'Av. Pról.. Alcalde S\/N, Jardines Alcalde, 44290 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3338192400',
        estatus: 'activa'
      },
      {
        id_dependencia: '89',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo del Estado de Jalisco',
        liga: '',
        direccion: 'C. José María Morelos 102, Zona Centro, 44100 Guadalajara, Jal.',
        id_estado: '14',
        telefonos: '3336888155',
        estatus: 'activa'
      },
      {
        id_dependencia: '90',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno',
        liga: 'http:\/\/www.michoacan.gob.mx\/',
        direccion: 'Avenida Madero Poniente 63, Centro histórico de Morelia, 58000 Morelia, Mich.',
        id_estado: '16',
        telefonos: '4433130175',
        estatus: 'activa'
      },
      {
        id_dependencia: '91',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Enlace Legislativo',
        liga: 'https:\/\/segob.michoacan.gob.mx\/',
        direccion: 'C. Juan José de Lejarza 49, Centro histórico de Morelia, 58000 Morelia, Mich.',
        id_estado: '16',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '92',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación en el Estado de Michoacán de Ocampo',
        liga: 'https:\/\/educacion.michoacan.gob.mx\/',
        direccion: 'Av. Siervo de La Nación 845, Lomas del Valle, 58170 Morelia, Mich.',
        id_estado: '16',
        telefonos: '4432997741',
        estatus: 'activa'
      },
      {
        id_dependencia: '93',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Finanzas y Administración del Gobierno del Estado de Michoacán',
        liga: 'http:\/\/www.secfinanzas.michoacan.gob.mx\/consulta-y-pago-de-tenencia\/',
        direccion: 'Calzada Ventura Puente 112, Chapultepec Norte, 58260 Morelia, Mich.',
        id_estado: '16',
        telefonos: '4433229933',
        estatus: 'activa'
      },
      {
        id_dependencia: '94',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Comunicaciones y Obras Públicas del Estado de Michoacán de Ocampo',
        liga: '',
        direccion: 'Avenida Universidad 581, Alberto Oviedo Mota, 58060 Morelia, Mich.',
        id_estado: '16',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '95',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura de Michoacán',
        liga: 'http:\/\/cultura.michoacan.gob.mx\/',
        direccion: 'C. Isidro Huarte 545, Cuauhtémoc, 58020 Morelia, Mich.',
        id_estado: '16',
        telefonos: '4433228900',
        estatus: 'activa'
      },
      {
        id_dependencia: '96',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo del Estado de Michoacán',
        liga: 'http:\/\/michoacan.gob.mx\/',
        direccion: 'Av. Tata Vasco 80, Vasco de Quiroga, 58230 Morelia, Mich.',
        id_estado: '16',
        telefonos: '4433178032',
        estatus: 'activa'
      },
      {
        id_dependencia: '97',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Desarrollo Urbano y Movilidad',
        liga: 'https:\/\/sedum.michoacan.gob.mx\/',
        direccion: 'Escarcha 272, Prados del Campestre, 58297 Morelia, Mich.',
        id_estado: '16',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '98',
        tipo: 'Dependencia',
        nombre: 'Secretaria De Hacienda Morelos',
        liga: '',
        direccion: 'Miguel Hidalgo, 62040 Cuernavaca, Mor.',
        id_estado: '17',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '99',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Morelos Secretaría del Trabajo',
        liga: 'http:\/\/morelos.gob.mx\/',
        direccion: 'Boulevard. Lic. Benito Juárez 73, Cuernavaca Centro, Centro, 62050 Cuernavaca, Mor.',
        id_estado: '17',
        telefonos: '7733100985',
        estatus: 'activa'
      },
      {
        id_dependencia: '100',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Morelos - Secretaría de Seguridad Pública',
        liga: '',
        direccion: 'Autopista México Acapulco Kilometro 102 + 900, Poblado de Acatitla, 62580 Temixco, Mor.',
        id_estado: '17',
        telefonos: '7773853667',
        estatus: 'activa'
      },
      {
        id_dependencia: '101',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Obras Publicas del Estado de Morelos',
        liga: 'https:\/\/obraspublicas.morelos.gob.mx\/',
        direccion: 'Av. Universidad 25, Santa María Ahuacatitlán, 62130 Cuernavaca, Mor.',
        id_estado: '17',
        telefonos: '7773137057',
        estatus: 'activa'
      },
      {
        id_dependencia: '102',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Movilidad y Transporte',
        liga: 'http:\/\/www.hacienda.morelos.gob.mx\/',
        direccion: ' Cuauhtemotzin 1, Club de Golf de Cuernavaca, 62030 Cuernavaca, Mor.',
        id_estado: '17',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '103',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Desarrollo Social',
        liga: '',
        direccion: 'Pino 99-int 1, Teopanzolco, 62350 Cuernavaca, Mor.',
        id_estado: '17',
        telefonos: '7773100640',
        estatus: 'activa'
      },
      {
        id_dependencia: '104',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Administración y Finanzas',
        liga: 'http:\/\/www.hacienda-nayarit.gob.mx\/',
        direccion: 'Av. México Norte s\/n, Centro, 63000 Tepic, Nay.',
        id_estado: '18',
        telefonos: '3112152200',
        estatus: 'activa'
      },
      {
        id_dependencia: '105',
        tipo: 'Dependencia',
        nombre: 'Secretaría General de Gobierno',
        liga: '',
        direccion: 'Av. México Norte Av. México y Abasolo S\/N Col. Centro, Centro, 63000 Tepic, Nay.',
        id_estado: '18',
        telefonos: '3112152102',
        estatus: 'activa'
      },
      {
        id_dependencia: '106',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Cultura de Nayarit',
        liga: '',
        direccion: 'Oaxaca Sur 122, Centro, 63000 Tepic, Nay.',
        id_estado: '18',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '107',
        tipo: 'Dependencia',
        nombre: 'Secretaría De Seguridad Pública Nayarit',
        liga: '',
        direccion: 'Veracruz Sur 141, Centro, 63000 Tepic, Nay.',
        id_estado: '18',
        telefonos: '3112134114',
        estatus: 'activa'
      },
      {
        id_dependencia: '108',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Desarrollo Sustentable',
        liga: 'https:\/\/sds.nayarit.gob.mx\/',
        direccion: 'Av. Insurgentes, Cd del Valle, 63157 Tepic, Nay.',
        id_estado: '18',
        telefonos: '3112119200',
        estatus: 'activa'
      },
      {
        id_dependencia: '109',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo del Gobierno del Estado de Nayarit',
        liga: 'http:\/\/www.visitnayarit.com\/',
        direccion: 'Avenida México y Calzada del Ejército Nacional sin número, Tepic, Nay.',
        id_estado: '18',
        telefonos: '3112148071',
        estatus: 'activa'
      },
      {
        id_dependencia: '110',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación',
        liga: '',
        direccion: 'Nueva Jersey, Industrial Hab Abraham Lincoln, 64310 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8120205000',
        estatus: 'activa'
      },
      {
        id_dependencia: '111',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Seguridad de Nuevo León',
        liga: 'http:\/\/www.nl.gob.mx\/dependencias\/seguridad\/organigrama',
        direccion: 'Av. Félix U. Gómez 2223, Reforma, 64550 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8120203600',
        estatus: 'activa'
      },
      {
        id_dependencia: '112',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura de Nuevo León',
        liga: 'https:\/\/www.nl.gob.mx\/cultura',
        direccion: 'C. Washington S\/N, Centro, 64000 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8120330103',
        estatus: 'activa'
      },
      {
        id_dependencia: '113',
        tipo: 'Dependencia',
        nombre: 'Secretaría General del Estado de Nuevo León',
        liga: 'https:\/\/www.nl.gob.mx\/generaldegobierno',
        direccion: 'Severiano Martínez 1, Centro de Dr. Arroyo, Centro 4to Sector, 67900 Dr. Arroyo, N.L.',
        id_estado: '19',
        telefonos: '4888880420',
        estatus: 'activa'
      },
      {
        id_dependencia: '114',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Desarrollo Social de Nuevo León',
        liga: '',
        direccion: 'Michoacán 907, Independencia, 64720 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8181308300',
        estatus: 'activa'
      },
      {
        id_dependencia: '115',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Participación Ciudadana',
        liga: '',
        direccion: 'Av. Junco de la Vega 143, Roma, 64700 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8120332751',
        estatus: 'activa'
      },
      {
        id_dependencia: '116',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Igualdad e Inclusión del Estado de Nuevo León',
        liga: '',
        direccion: 'Torre Ciudadana, C. Washington, Obrera, 64018 Monterrey, N.L.',
        id_estado: '19',
        telefonos: '8120330086',
        estatus: 'activa'
      },
      {
        id_dependencia: '117',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Economía',
        liga: 'https:\/\/www.gob.mx\/se\/',
        direccion: 'Priv. Oaxaca 68050, Reforma, 68050 Oaxaca de Juárez, Oax.',
        id_estado: '20',
        telefonos: '9515159669',
        estatus: 'activa'
      },
      {
        id_dependencia: '118',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Finanzas del Estado',
        liga: '',
        direccion: 'República 118, Centro, 68000 Oaxaca de Juárez, Oax.',
        id_estado: '20',
        telefonos: '9515025360',
        estatus: 'activa'
      },
      {
        id_dependencia: '119',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Hacienda y Crédito Público',
        liga: '',
        direccion: 'Gral. Manuel García Vigila (García Vigil) 709, Centro, 68000 Oaxaca de Juárez',
        id_estado: '20',
        telefonos: '9515016010',
        estatus: 'activa'
      },
      {
        id_dependencia: '120',
        tipo: 'Dependencia',
        nombre: ' Secretaria de Seguridad Pública',
        liga: '',
        direccion: 'Pinos Sn, Eucaliptos, 68274 Oaxaca de Juárez, Oax.',
        id_estado: '20',
        telefonos: '9515152752',
        estatus: 'activa'
      },
      {
        id_dependencia: '121',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Oaxaca',
        liga: '',
        direccion: 'C. de Carlos María Bustamante 319, OAX_RE_BENITO JUAREZ, Centro, 68000 Oaxaca de Juárez, Oax.',
        id_estado: '20',
        telefonos: '9515144423',
        estatus: 'activa'
      },
      {
        id_dependencia: '122',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Servicios a la comunidad',
        liga: '',
        direccion: 'Av. Ferol 110, Cinco Señores, 68050 Oaxaca de Juárez, Oax.',
        id_estado: '20',
        telefonos: '9511326959',
        estatus: 'activa'
      },
      {
        id_dependencia: '123',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Desarrollo Económico',
        liga: '',
        direccion: 'Faustino G. Olivera 108, RUTA INDEPENDENCIA, Luis Jiménez Figueroa, 68070 Oaxaca de Juárez, Oax.',
        id_estado: '20',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '124',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobernación',
        liga: 'http:\/\/sg.puebla.gob.mx\/',
        direccion: 'Calle 18 Nte # 406, La Acocota, 72377 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '2222138900',
        estatus: 'activa'
      },
      {
        id_dependencia: '125',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Trabajo',
        liga: 'http:\/\/www.st.puebla.gob.mx\/',
        direccion: 'Callejón de la 10 Norte, P.º de San Francisco 806, Barrio del Alto, 72290 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '2222465776',
        estatus: 'activa'
      },
      {
        id_dependencia: '126',
        tipo: 'Dependencia',
        nombre: 'Gobierno Del Estado De Puebla Secretaria De Cultura',
        liga: '',
        direccion: 'Av. 7 Ote 6, Centro histórico de Puebla, 72000 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '127',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Igualdad Sustantiva del Gobierno del Estado de Puebla',
        liga: '',
        direccion: 'C. 2 Sur 902, Centro histórico de Puebla, 72000 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '2224635875',
        estatus: 'activa'
      },
      {
        id_dependencia: '128',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gestión y Desarrollo Urbano',
        liga: '',
        direccion: 'Calle 3 Sur 1508, Centro histórico de Puebla, 72530 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '2223094600',
        estatus: 'activa'
      },
      {
        id_dependencia: '129',
        tipo: 'Dependencia',
        nombre: 'Secretaria General De Gobierno. ',
        liga: '',
        direccion: 'Av. 29 Ote. 620, Ladrillera de Benítez, 72530 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '130',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Salud del Estado de Puebla',
        liga: 'http:\/\/ss.pue.gob.mx\/',
        direccion: 'C. 6 Nte 603, Centro histórico de Puebla, 72000 Heroica Puebla de Zaragoza, Pue.',
        id_estado: '21',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '131',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno del Estado de Querétaro',
        liga: 'http:\/\/www.queretaro.gob.mx\/',
        direccion: 'C. 5 de Mayo 45, Centro, 76000 Santiago de Querétaro, Qro.',
        id_estado: '22',
        telefonos: '4422385000',
        estatus: 'activa'
      },
      {
        id_dependencia: '132',
        tipo: 'Dependencia',
        nombre: 'Secretaría del Trabajo del Estado de Querétaro',
        liga: 'http:\/\/www.queretaro.gob.mx\/transparencia\/contenidodependencia.aspx?q=Q1SajNL\/6MDbgggA5OpHaQ==',
        direccion: '76000, Centro, 76000 Santiago de Querétaro, Qro.',
        id_estado: '22',
        telefonos: '4422271806',
        estatus: 'activa'
      },
      {
        id_dependencia: '133',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación',
        liga: '',
        direccion: 'Av. Pról.. Luis Pasteur 23, Centro, 76000 Santiago de Querétaro, Qro.',
        id_estado: '22',
        telefonos: '4422385086',
        estatus: 'activa'
      },
      {
        id_dependencia: '134',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Planeación y Participación Ciudadana del Poder Ejecutivo del Estado de Querétaro',
        liga: '',
        direccion: 'Pasteur #45 norte esquina, C\/ 15 de Mayo, Centro Histórico, 76000 Santiago de Querétaro, Qro.',
        id_estado: '22',
        telefonos: '4422441617',
        estatus: 'activa'
      },
      {
        id_dependencia: '135',
        tipo: 'Dependencia',
        nombre: 'Secretaria De Obras Publicas Del Estado',
        liga: '',
        direccion: 'C. Francisco I. Madero 78A, Centro, 76000 Santiago de Querétaro, Qro.',
        id_estado: '22',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '136',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación de Quintana Roo',
        liga: 'https:\/\/qroo.gob.mx\/seq\/',
        direccion: 'Bonampak 31, Supermanzana 2a, 77500 Cancún, Q.R.',
        id_estado: '23',
        telefonos: '9984932681',
        estatus: 'activa'
      },
      {
        id_dependencia: '137',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Desarrollo Económico Quintana Roo',
        liga: '',
        direccion: 'Centro Comercial Las Palmas, altos, local A28 Ave. Xcaret, sm. 36, mz 2 lote 2, 77520 Cancun,Benito Juárez, Q.R.',
        id_estado: '23',
        telefonos: '9988840560',
        estatus: 'activa'
      },
      {
        id_dependencia: '138',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno',
        liga: '',
        direccion: 'C. 22 de Enero 1, Centro, 77000 Chetumal, Q.R.',
        id_estado: '23',
        telefonos: '9838350550',
        estatus: 'activa'
      },
      {
        id_dependencia: '139',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Seguridad Ciudadana del Estado de Quintana Roo',
        liga: '',
        direccion: 'Km 12.5 Carreteártela Chetumal-Bacalar Col, Industrial, 77049 Chetumal, Q.R.',
        id_estado: '23',
        telefonos: '9838350904',
        estatus: 'activa'
      },
      {
        id_dependencia: '140',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno',
        liga: '',
        direccion: 'Av. Ignacio Zaragoza 233, Centro, 77000 Chetumal, Q.R.',
        id_estado: '23',
        telefonos: '9838320913',
        estatus: 'activa'
      },
      {
        id_dependencia: '141',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Turismo de Quintana Roo',
        liga: '',
        direccion: 'Centro de Convenciones Anexo A, Boulevard Bahía, Ignacio Comonfort esquina, Colonia 5 de Abril, 77018 Chetumal, Q.R.',
        id_estado: '23',
        telefonos: '9838350860',
        estatus: 'activa'
      },
      {
        id_dependencia: '142',
        tipo: 'Dependencia',
        nombre: 'Secretaría de finanzas de San Luis Potosí, Comercio Exterior',
        liga: '',
        direccion: 'Eje 118 220, Industrial San Luis, 78395 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '143',
        tipo: 'Dependencia',
        nombre: 'Secretaria De Desarrollo Urbano Y Obras Publicas',
        liga: '',
        direccion: 'Pascual M. Hernández 380, Centro Histórico, 78000 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '4448145382',
        estatus: 'activa'
      },
      {
        id_dependencia: '144',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Seguridad Pública San Luis Potosí',
        liga: '',
        direccion: '78384 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '145',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobernación',
        liga: '',
        direccion: 'Av. Venustiano Carretera Anzá 707, De Tequisquiapan, 78000 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '146',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura',
        liga: '',
        direccion: '78000 CENTRO, 78000 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '4448129014',
        estatus: 'activa'
      },
      {
        id_dependencia: '147',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación de General de San Luis Potosí',
        liga: '',
        direccion: 'Calle Av. Mariano Jiménez 1240, Estadio, 78280 San Luis Potosí, S.L.P.',
        id_estado: '24',
        telefonos: '4448208121',
        estatus: 'activa'
      },
      {
        id_dependencia: '148',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Sinaloa Poder Ejecutivo Secretaría de Administración',
        liga: '',
        direccion: 'Calle Gral. Juan José Ríos 1017, Jorge Almada, 80200 Culiacán Rosales, Sin.',
        id_estado: '25',
        telefonos: '6677160679',
        estatus: 'activa'
      },
      {
        id_dependencia: '149',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Bienestar y Desarrollo Sustentable',
        liga: '',
        direccion: 'Av. Insurgentes S\/N Tercer Piso, Centro Sinaloa, 80020 Culiacán Rosales, Sin.',
        id_estado: '25',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '150',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Sinaloa Comunicaciones y Obras Públicas',
        liga: '',
        direccion: 'De Los Insurgentes 1, Centro Sinaloa, 80129 Culiacán Rosales, Sin.',
        id_estado: '25',
        telefonos: '6677143312',
        estatus: 'activa'
      },
      {
        id_dependencia: '151',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Turismo del Estado de Sinaloa',
        liga: 'https:\/\/sinaloa.travel\/',
        direccion: 'Boulevard Alfonso Zaragoza Maytorena 2204, Fracc. Bonanza, 80020 Culiacán Rosales, Sin.',
        id_estado: '25',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '152',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Desarrollo Sustentable del Estado de Sinaloa (SEDESU)',
        liga: '',
        direccion: 'Centro Sinaloa, 80000 Culiacán Rosales, Sin.',
        id_estado: '25',
        telefonos: '6677587296',
        estatus: 'activa'
      },
      {
        id_dependencia: '153',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Sonora Secretaría de Hacienda',
        liga: 'https:\/\/hacienda.sonora.gob.mx\/',
        direccion: 'Xavi Cultura SN, Villa de Seris, 83078 Hermosillo, Son.',
        id_estado: '26',
        telefonos: '6621084090',
        estatus: 'activa'
      },
      {
        id_dependencia: '154',
        tipo: 'Dependencia',
        nombre: 'Gobierno del Estado de Sonora Secretaría de Desarrollo',
        liga: 'https:\/\/www.sonora.gob.mx\/',
        direccion: 'C. Hidalgo 35, Centenario, 83260 Hermosillo, Son.',
        id_estado: '26',
        telefonos: '6622121790',
        estatus: 'activa'
      },
      {
        id_dependencia: '155',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Hacienda',
        liga: '',
        direccion: 'C. Comonfort 36, Proyecto Rio Sonora Hermosillo XXI, 83000 Hermosillo, Son.',
        id_estado: '26',
        telefonos: '6622120004',
        estatus: 'activa'
      },
      {
        id_dependencia: '156',
        tipo: 'Dependencia',
        nombre: 'Secretaria de la Contraloría General del Gobierno del Estado de Sonora',
        liga: 'https:\/\/contraloria.sonora.gob.mx\/',
        direccion: 'Avenida Comonfort SN, Villa de Seris, 83280 Hermosillo, Son.',
        id_estado: '26',
        telefonos: '8004663786',
        estatus: 'activa'
      },
      {
        id_dependencia: '157',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Contraloría',
        liga: 'https:\/\/contraloria.sonora.gob.mx\/',
        direccion: 'California 159, Proyecto Rio Sonora Hermosillo XXI, 83270 Hermosillo, Son.',
        id_estado: '26',
        telefonos: '6622120696',
        estatus: 'activa'
      },
      {
        id_dependencia: '158',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno',
        liga: 'http:\/\/segob.tabasco.gob.mx\/',
        direccion: 'Av. Gregorio Méndez Magaña s\/n, Centro Delegación Cuatro, 86077 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '9933383000',
        estatus: 'activa'
      },
      {
        id_dependencia: '159',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación de Tabasco',
        liga: 'https:\/\/tabasco.gob.mx\/educacion',
        direccion: 'Av. Gregorio Méndez Magaña s\/n, Gil y Sáenz, 86080 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '9934270161',
        estatus: 'activa'
      },
      {
        id_dependencia: '160',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Asentamiento y Obras Públicas',
        liga: '',
        direccion: 'Macayo SN, El Recreo, 86020 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '9933574911',
        estatus: 'activa'
      },
      {
        id_dependencia: '161',
        tipo: 'Dependencia',
        nombre: 'Secretaría para el Desarrollo Económico y la Competitividad del Estado de Tabasco',
        liga: 'https:\/\/tabasco.gob.mx\/sedec',
        direccion: 'Avenida Paseo Tabasco 1504 Piso 2 Desarrollo Urbano Tabasco 2000, 86035 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '9933109760',
        estatus: 'activa'
      },
      {
        id_dependencia: '162',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Movilidad del Estado de Tabasco',
        liga: 'https:\/\/tabasco.gob.mx\/movilidad',
        direccion: 'Periférico Carlos Pellicer Cámara 3020, Pages Llergo, 86125 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '9933503999',
        estatus: 'activa'
      },
      {
        id_dependencia: '163',
        tipo: 'Dependencia',
        nombre: 'Secretaría del Trabajo',
        liga: 'http:\/\/www.tabasco.gob.mx\/',
        direccion: 'Av. 27 de Febrero, Centro Delegación Uno, 86077 Villahermosa, Tab.',
        id_estado: '27',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '164',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Salud',
        liga: 'https:\/\/www.gob.mx\/',
        direccion: 'Belisario Domínguez Sn, Del Pueblo, 89190 Tampico, Tamps.',
        id_estado: '28',
        telefonos: '8332192841',
        estatus: 'activa'
      },
      {
        id_dependencia: '165',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Cultura',
        liga: '',
        direccion: 'Av. Miguel Hidalgo 306, Campbell, 89270 Tampico, Tamps.',
        id_estado: '28',
        telefonos: '8333052860',
        estatus: 'activa'
      },
      {
        id_dependencia: '166',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Finanzas',
        liga: '',
        direccion: 'Miguel Hidalgo 1302, Petrolera, 89250 Tampico, Tamps.',
        id_estado: '28',
        telefonos: '8332147394',
        estatus: 'activa'
      },
      {
        id_dependencia: '167',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Agricultura y Ganadería',
        liga: '',
        direccion: 'Calle Heriberto Jara 1064, Morelos, 89290 Tampico, Tamps.',
        id_estado: '28',
        telefonos: '8332125852',
        estatus: 'activa'
      },
      {
        id_dependencia: '168',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Marina',
        liga: '',
        direccion: 'Héroes del Cañonero Sn, Cascajal, 89000 Tampico, Tamps.',
        id_estado: '28',
        telefonos: '8332123079',
        estatus: 'activa'
      },
      {
        id_dependencia: '169',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Trabajo y Competitividad',
        liga: 'http:\/\/trabajoycompetitividad.gob.mx\/',
        direccion: 'C. 27 220, La Loma Xicohtencatl, Xicohténcatl, 90070 Tlaxcala de Xicohténcatl, Tlax.',
        id_estado: '29',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '170',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Turismo del Estado de Tlaxcala',
        liga: 'http:\/\/www.visitatlaxcala.com.mx\/',
        direccion: 'Av. Juarez esq, Av. Miguel de Lardizábal y Uribe NÚM. 18, Centro, 90000 Tlaxcala de Xicohténcatl, Tlax.',
        id_estado: '29',
        telefonos: '8005096557',
        estatus: 'activa'
      },
      {
        id_dependencia: '171',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Salud Tlaxcala',
        liga: '',
        direccion: 'Vía Corta Puebla-Santa Ana 204, Apetatitlán Centro, 90605 Apetatitlán, Tlax.',
        id_estado: '29',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '172',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Bienestar Tlaxcala',
        liga: '',
        direccion: 'C. Miguel Hidalgo y Costilla 36, Centro, 90000 Tlaxcala de Xicohténcatl, Tlax.',
        id_estado: '29',
        telefonos: '2464661740',
        estatus: 'activa'
      },
      {
        id_dependencia: '173',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Economía',
        liga: '',
        direccion: 'Porfirio Díaz 20, Centro, 90000 Tlaxcala de Xicohténcatl, Tlax.',
        id_estado: '29',
        telefonos: '2464621065',
        estatus: 'activa'
      },
      {
        id_dependencia: '174',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Función Pública del Estado de Tlaxcala',
        liga: '',
        direccion: '90600 Apetatitlán, Tlax.',
        id_estado: '29',
        telefonos: '528332147394',
        estatus: 'activa'
      },
      {
        id_dependencia: '175',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación Publica',
        liga: '',
        direccion: 'Bv. Adolfo Ruíz Cortines 1270, Costa de Oro, 91700 Veracruz, Ver.',
        id_estado: '30',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '176',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Marina',
        liga: 'https:\/\/www.gob.mx\/semar',
        direccion: 'Carretera Veracruz-Xalapa Kilómetro 13.5, Las Bajadas, 91698 Veracruz, Ver.',
        id_estado: '30',
        telefonos: '2299252670',
        estatus: 'activa'
      },
      {
        id_dependencia: '177',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Seguridad Pública',
        liga: '',
        direccion: 'Bv. Adolfo Ruíz Cortines, Costa Verde, 94294 Veracruz, Ver.',
        id_estado: '30',
        telefonos: '2299224148',
        estatus: 'activa'
      },
      {
        id_dependencia: '178',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Comunicaciones y Transportes',
        liga: 'https:\/\/www.gob.mx\/',
        direccion: 'Adolfo López Mateos 3210, Centro, 72000 Veracruz, Ver.',
        id_estado: '30',
        telefonos: '2383922933',
        estatus: 'activa'
      },
      {
        id_dependencia: '179',
        tipo: 'Dependencia',
        nombre: 'Secretaria de desarrollo social',
        liga: '',
        direccion: 'Vía Muerta, Playa de Oro, 94293 Veracruz, Ver.',
        id_estado: '30',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '180',
        tipo: 'Dependencia',
        nombre: 'Secretaría General',
        liga: '',
        direccion: 'Benito Juárez 56, Centro, 91700 Veracruz, Ver.',
        id_estado: '30',
        telefonos: '9232750096',
        estatus: 'activa'
      },
      {
        id_dependencia: '181',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación del Gobierno del Estado de Yucatán',
        liga: 'http:\/\/www.educacion.yucatan.gob.mx\/',
        direccion: '101-A, Calle 25, Calle 34, García Ginerés, 97070 Mérida, Yuc.',
        id_estado: '31',
        telefonos: '9999303950',
        estatus: 'activa'
      },
      {
        id_dependencia: '182',
        tipo: 'Dependencia',
        nombre: 'Secretaría de la Contraloría General del Estado de Yucatán',
        liga: 'http:\/\/www.contraloria.yucatan.gob.mx\/',
        direccion: 'Calle 20 -A No 284- B, Xcumpich, 97204 Mérida, Yuc.',
        id_estado: '31',
        telefonos: '9999303800',
        estatus: 'activa'
      },
      {
        id_dependencia: '183',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Gobierno',
        liga: 'https:\/\/www.secgob.cdmx.gob.mx\/',
        direccion: 'Calle 61 497, Centro, 97000 Mérida, Yuc.',
        id_estado: '31',
        telefonos: '9999242395',
        estatus: 'activa'
      },
      {
        id_dependencia: '184',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Administración y Finanzas',
        liga: 'http:\/\/www.yucatan.gob.mx\/gobierno\/ver_dependencia.php?id=3',
        direccion: 'Calle 59 poniente x, Av. Itzáes, Centro, 97000 Mérida, Yuc.',
        id_estado: '31',
        telefonos: '9999303340',
        estatus: 'activa'
      },
      {
        id_dependencia: '185',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Salud del Estado de Yucatán',
        liga: 'http:\/\/salud.yucatan.gob.mx\/',
        direccion: 'C. 72 Nº463, Barrio de Santiago, Centro, 97000 Mérida, Yuc.',
        id_estado: '31',
        telefonos: '9999303050',
        estatus: 'activa'
      },
      {
        id_dependencia: '186',
        tipo: 'Dependencia',
        nombre: 'Secretaría General de Gobierno',
        liga: 'http:\/\/www.zacatecas.gob.mx\/',
        direccion: 'Av. Hidalgo 602, Zacatecas Centro, 98000 Zacatecas, Zac.',
        id_estado: '32',
        telefonos: '4929239576',
        estatus: 'activa'
      },
      {
        id_dependencia: '187',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Economía ',
        liga: '',
        direccion: 'C. Pachuca 189, Colonia Condesa, Cuauhtémoc, 06140 Ciudad de México, CDMX',
        id_estado: '32',
        telefonos: '5557299100',
        estatus: 'activa'
      },
      {
        id_dependencia: '188',
        tipo: 'Dependencia',
        nombre: 'Secretaría del Trabajo y Previsión Social Delegación Zacatecas',
        liga: '',
        direccion: 'Calzada Revolución Mexicana 303, Fraccionamiento de las Dependencias Federales, 98618 Guadalupe, Zac.',
        id_estado: '32',
        telefonos: '4929231838',
        estatus: 'activa'
      },
      {
        id_dependencia: '189',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Educación de Zacatecas',
        liga: 'http:\/\/www.seduzac.gob.mx\/',
        direccion: 'José López Portillo, Fraccionamiento de las Dependencias Federales, 98618 Guadalupe, Zac.',
        id_estado: '32',
        telefonos: '4929239600',
        estatus: 'activa'
      },
      {
        id_dependencia: '190',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Finanzas del Estado de Zacatecas',
        liga: 'http:\/\/finanzas.gob.mx\/',
        direccion: 'Calzada Héroes de Chapultepec No. 1902, Ciudad Administrativa, 98160 Zacatecas, Zac.',
        id_estado: '32',
        telefonos: '4929256220',
        estatus: 'activa'
      },
      {
        id_dependencia: '191',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Educación Publica',
        liga: 'http:\/\/www.sep.gob.mx\/',
        direccion: 'Edificio Público, Fray Servando Teresa de Mier 81, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '5536011000',
        estatus: 'activa'
      },
      {
        id_dependencia: '192',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Seguridad Ciudadana de la Ciudad de México',
        liga: '',
        direccion: 'Liverpool 136, Juárez, Cuauhtémoc, 06600 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '5552425000',
        estatus: 'activa'
      },
      {
        id_dependencia: '193',
        tipo: 'Dependencia',
        nombre: 'Secretaria de Obras y Servicios',
        liga: 'https:\/\/www.obras.cdmx.gob.mx\/',
        direccion: 'P.za de la Constitución 1, Centro Histórico de la Cdad. de México, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '5553458000',
        estatus: 'activa'
      },
      {
        id_dependencia: '194',
        tipo: 'Dependencia',
        nombre: 'Secretaria De Gobernación',
        liga: '',
        direccion: 'Abraham González 48, Juárez, Cuauhtémoc, 06600 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '5552098800',
        estatus: 'activa'
      },
      {
        id_dependencia: '195',
        tipo: 'Dependencia',
        nombre: 'Secretaría de Economía',
        liga: 'http:\/\/www.gob.mx\/se\/',
        direccion: 'C. Pachuca 189, Colonia Condesa, Cuauhtémoc, 06140 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '5557299100',
        estatus: 'activa'
      },
      {
        id_dependencia: '196',
        tipo: 'Dependencia',
        nombre: 'Subsecretaria de Coordinación Metropolitana y Enlace Gubernamental',
        liga: 'https:\/\/metropolitanos.cdmx.gob.mx\/',
        direccion: 'Fernando de Alva Ixtlilxóchitl 185, Tránsito, Cuauhtémoc, 06820 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '',
        estatus: 'activa'
      },
      {
        id_dependencia: '197',
        tipo: 'Dependencia',
        nombre: 'Secretaria De Comunicación Y Obras Publicas',
        liga: '',
        direccion: 'C. de Tacuba 17, Centro Histórico de la Cdad. de México, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX',
        id_estado: '9',
        telefonos: '',
        estatus: 'activa'
      }
    ];

    const dependenciasEstados = dependencias.map((dependencia) => {
      return {
        nombre: dependencia.nombre,
        direccion: dependencia.direccion,
        liga: dependencia.liga.replace(/\r\n/g, ''),
        estado: encontrarEstado(dependencia, estados),
        estatus: 'Activo',
        telefonos: dependencia.telefonos.split(',').filter((telefono) => telefono !== '')
      };
    });

    // console.log(dependenciasEstados);
    await DependenciaSchema.insertMany(dependenciasEstados);
  } catch (error) {
    console.error(error);
  }
};
(async () => {
  await generateModules();
  await generateTipoUsuarios();
  await generateFormaPagos();
  await generateProductos();
  await generateEstatos();
  await generateJuzgados();
  await generateMaterias();
  await generateEtapasProcesales();
  await generateRecursosIncidencias();
  await generateRegimen();
  await generateBancos();
  await generateDocumentacion();
  await generateFiscalias();
  await createDependencias();
})();
