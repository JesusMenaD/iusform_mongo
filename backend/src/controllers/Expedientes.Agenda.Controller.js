import ExpedientesAgenda from '../models/ExpedientesAgenda.js';
import UsuariosAgenda from '../models/ExpedientesAgendaUsuarios.js';
import moment from 'moment';
export const getEvents = async (req, res) => {
  const { despacho, usuario } = req.params;
  const { expediente = null } = req.query;

  try {
    if (!usuario) { return res.status(400).json({ message: 'Usuario no especificado' }); }

    if (!despacho) { return res.status(400).json({ message: 'Despacho no especificado' }); }

    const query = { despacho, usuario };

    if (expediente) query.expediente = expediente;

    const events = await UsuariosAgenda.find(query).populate('agenda').exec();
    // ordenar por fecha ASC
    const orderedEvents = events.sort((a, b) => {
      const fechaHoraInicioA = moment(a.agenda.fecha);
      const fechaHoraInicioB = moment(b.agenda.fecha);
      const horaInicioA = a.agenda.horaInicio;
      const horaInicioB = b.agenda.horaInicio;

      if (fechaHoraInicioA.isBefore(fechaHoraInicioB)) {
        return -1;
      } else if (fechaHoraInicioA.isAfter(fechaHoraInicioB)) {
        return 1;
      } else {
        if (horaInicioA < horaInicioB) {
          return -1;
        } else if (horaInicioA > horaInicioB) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    const formattedEvents = orderedEvents.map((event) => {
      const { agenda, estatus, fechaRecordatorio, comentario } = event;
      const fechaRecordatorioMoment = fechaRecordatorio ? moment(fechaRecordatorio) : null;
      const fechaHoraInicio_ = moment(agenda.fecha);
      const fechaI = fechaHoraInicio_.format('YYYY-MM-DD');
      const solohoraInicio = agenda.horaInicio.split(' ')[0];

      const unirFechaHora = moment(`${fechaI} ${solohoraInicio}`, 'YYYY-MM-DD hh:mm');
      console.log(unirFechaHora, fechaRecordatorioMoment);
      let recordatorioDescripcion = '';

      if (fechaRecordatorioMoment) {
        const fechaHoraRecordatorio = moment(fechaRecordatorioMoment);

        // Verificar si las fechas son válidas antes de calcular la diferencia
        if (unirFechaHora.isValid() && fechaHoraRecordatorio.isValid()) {
          const diferencia = unirFechaHora.diff(fechaHoraRecordatorio);
          console.log(diferencia, 'diferencia');
          if (diferencia <= 0) {
            recordatorioDescripcion = '';
          } else {
            const duracion = moment.duration(diferencia);

            const dias = duracion.days();
            const horas = duracion.hours();
            const minutos = duracion.minutes();

            let descripcion = '';
            if (dias > 0) {
              descripcion += `${dias} día(s) `;
            }
            if (horas > 0) {
              descripcion += `${horas} hora(s) `;
            }
            if (minutos > 0) {
              descripcion += `${minutos} minuto(s) `;
            }

            recordatorioDescripcion = descripcion.trim();
          }
        } else {
          console.error('Las fechas no son válidas');
        }
      }

      return {
        id: agenda._id,
        _id: event._id,
        title: agenda.title,
        descripcion: agenda.descripcion,
        fecha: agenda.fecha,
        horaInicio: agenda.horaInicio,
        horaFin: agenda.horaFin,
        creadoPor: agenda.creadoPor,
        fechaCreacion: agenda.fechaCreacion,
        estatus,
        color: estatusColors(estatus),
        fechaRecordatorio: recordatorioDescripcion,
        comentario,
        recordar: event.recordar
      };
    });

    return res.status(200).json({ eventos: formattedEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { despacho, usuario } = req.params;
  const { expediente = null, titulo, descripcion = '', fecha = new Date(), horaInicio, horaFin = null, usuarios = [], fechaRecordatorio = null, recordar = 0 } = req.body;

  if (!usuario) { return res.status(400).json({ message: 'Usuario no especificado' }); }

  if (!despacho) { return res.status(400).json({ message: 'Despacho no especificado' }); }

  if (!titulo) { return res.status(400).json({ message: 'Título no especificado' }); }

  if (!horaInicio) { return res.status(400).json({ message: 'Hora de inicio no especificada' }); }

  try {
    const obj = {
      despacho,
      title: titulo,
      descripcion,
      fecha,
      horaInicio,
      horaFin,
      creadoPor: usuario,
      fechaCreacion: new Date()
    };

    if (expediente) obj.expediente = expediente;

    const event = await ExpedientesAgenda.create(obj);

    UsuariosAgenda.create({ despacho, expediente, usuario, fechaRecordatorio, agenda: event._id, recordar });

    if (usuarios.length > 0) {
      usuarios.forEach(async (_id) => {
        await UsuariosAgenda.create({ despacho, expediente, usuario: _id, fechaRecordatorio, agenda: event._id, recordar });
      });
    }

    return res.status(201).json({ evento: event, message: 'Evento creado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const estatusColors = (estatus) => {
  switch (estatus) {
    case 'Aceptada':
      return '#4caf50';
    case 'Rechazada':
      return '#f44336';
    case 'Pendiente':
      return '#ff9800';
    case 'Cancelada':
      return '#607d8b';
    case 'Realizada':
      return '#2196f3';
    default:
      return '#000000';
  }
};

export const updateEvent = async (req, res) => {
  const { _id } = req.params;
  const { estatus, fechaRecordatorio, comentario, recordar } = req.body;

  try {
    const event = await UsuariosAgenda.findById(_id);

    if (!event) { return res.status(404).json({ message: 'Evento no encontrado' }); }

    event.estatus = estatus;
    event.fechaRecordatorio = fechaRecordatorio;
    event.comentario = comentario;
    event.recordar = recordar;
    if (event.recordar === 0) {
      event.fechaRecordatorio = null;
    }

    if (estatus === 'Cancelada' || estatus === 'Realizada' || estatus === 'Rechazada') {
      event.fechaRecordatorio = null;
      event.recordar = 0;
    }

    await event.save();

    return res.status(200).json({ evento: event, message: 'Evento actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
