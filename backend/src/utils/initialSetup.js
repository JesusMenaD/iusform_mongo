import ModulosSchema from '../models/Modulos.js';
import TipoUsuarioModel from '../models/TipoUsuarios.js';
import FormaPagoSchema from '../models/FomaPago.js';
import ProductosSchema from '../models/Productos.js';
import EstadoSchema from '../models/Estados.js';
import JuzgadosSchema from '../models/Juzgados.js';
import MateriaSchema from '../models/Materias.js';
import EtapasProcesalesSchema from '../models/EtapasProcesales.js';

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
        nombre: 'Directorios',
        enlace: '/directorios',
        imagen: 'iconos_principales_150x150_consultas.svg',
        orden: 4,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Plantillas',
        enlace: '/plantillas',
        imagen: 'iconos_principales_150x150_plantillas.svg',
        orden: 5,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Reportes',
        enlace: '/reportes',
        imagen: 'iconos_principales_150x150_reportes.svg',
        orden: 6,
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
        nombre: 'Legislaciones y reglamentos',
        enlace: '/legislaciones-reglamentos',
        imagen: 'iconos_principales_150x150_legislacion_reglamentos.svg',
        orden: 8,
        estatus: 'Activo',
        padre: '',
        tipo: 'despacho'
      },
      {
        nombre: 'Legislación y Reglamentos',
        enlace: '/legislacion-reglamentos',
        imagen: 'iconos_principales_150x150_legislacion_reglamentos.svg',
        orden: 9,
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
        nombre: 'Permisos',
        enlace: '/permisos',
        imagen: 'iconos_principales_150x150_configuraciones.svg',
        orden: 2,
        estatus: 'Activo',
        padre: '/configuraciones',
        tipo: 'despacho'
      },
      {
        nombre: 'Datos fiscales',
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
        nombre: 'Historial compras',
        enlace: '/historial-compras',
        imagen: 'iconos_principales_150x150_reportes.svg',
        orden: 8,
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
      },
      {
        nombre: 'Paquetes de expedientes',
        enlace: '/paquetes-expedientes',
        imagen: 'iconos_principales_150x150_declaraciones.svg',
        orden: 10,
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
(async () => {
  await generateModules();
  await generateTipoUsuarios();
  await generateFormaPagos();
  await generateProductos();
  await generateEstatos();
  await generateJuzgados();
  await generateMaterias();
  await generateEtapasProcesales();
})();
