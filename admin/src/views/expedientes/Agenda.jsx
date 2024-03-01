/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  Button,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  ButtonGroup, Box, LinearProgress, FormControl, InputLabel, MenuItem, Select
  , Checkbox, ListItemText
} from '@mui/material'
import { Plus, Clock, Edit, Check } from 'react-feather' // Asegúrate de tener estos íconos
import Timeline from '@mui/lab/Timeline'
import EventAvailable from '@mui/icons-material/EventAvailable'
import EventBusy from '@mui/icons-material/EventBusy'
import HelpOutline from '@mui/icons-material/HelpOutline'
// Plus, Clock, EventAvailable, EventBusy, HelpOutline
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import { apiAuth } from '../../api' // Asegúrate de que este es el camino correcto
import Scheduler from './prueba' // Asegúrate de que este es el camino correcto
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import ButtonIcon from '@mui/material/Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

const sx = {
  mb: 2
}
const state = {
  options: {
    transitionMode: 'fade',
    startWeekOn: 'mon',
    defaultMode: 'month',
    minWidth: 540,
    maxWidth: 540,
    minHeight: 540,
    maxHeight: 540
  },
  toolbarProps: {
    showSearchBar: true,
    showSwitchModeButtons: false,
    showDatePicker: true,
    showTodayButton: false
  }
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const Agenda = ({ despacho, usuario, usuarios, expediente, permisos }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [isTimeline, setIsTimeline] = useState(true)
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [render, setRender] = useState(0)
  const [error, setError] = useState('')

  const [nuevoEvento, setNuevoEvento] = useState(null)
  const [modalNuevoEvento, setModalNuevoEvento] = useState(false)

  const openModal = (event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setModalOpen(false)
  }

  // const handleSaveChanges = (e) => {

  // }

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const data = await getEvents(despacho, usuario)
        const eventosLocal = data.eventos.map((event) => ({
          _id: event._id,
          id: event.id,
          label: event.title,
          groupLabel: event.descripcion,
          color: event.color,
          startHour: event.horaInicio,
          endHour: event.horaFin,
          date: event.fecha.split('T')[0],
          creadoPor: event.creadoPor,
          fechaCreacion: event.fechaCreacion,
          estatus: event.estatus,
          comentario: event.comentario,
          fechaRecordatorio: event.fechaRecordatorio,
          recordar: event.recordar
        }))
        const sortedEvents = eventosLocal
        setTimeline(sortedEvents)
        setEvents(sortedEvents)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching events:', error)
        setError('No se pudieron cargar los eventos.')
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [despacho, usuario, render])

  const handleEventsChange = (newEvents) => {
    setEvents(newEvents)
    console.log('handleEventsChange')
  }

  const handleCellClick = (cell) => {
    console.log('Celda seleccionada:', cell)
  }

  const handleEventClick = (event) => {
    console.log('Evento seleccionado:', event)
    // setModalOpen(true)
    // const id = event.id
    // console.log('ID:', id)
  }

  const getIconByStatus = (status) => {
    switch (status) {
      case 'Aceptada':
        return <Check style={{ color: 'green' }} />
      case 'Rechazada':
        return <HelpOutline style={{ color: 'red' }} />
      case 'Pendiente':
        return <Clock style={{ color: 'blue' }} />
      case 'Cancelada':
        return <EventBusy style={{ color: 'red' }} />
      case 'Realizada':
        return <EventAvailable style={{ color: 'green' }} />
      default:
        return null
    }
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()
    const { date, startHour, recordar = 0, comentario, _id, estatus } = selectedEvent
    // 10:30 AM
    const fechaRecordatorio = new Date(`${date}T${startHour.slice(0, 5)}`)

    let recordarFecha = null

    if (recordar !== 0) {
      recordarFecha = new Date(fechaRecordatorio.getTime() - recordar * 60000)
    }

    await editEvento(_id, estatus, comentario, recordar, recordarFecha)
    setRender(render + 1)
    closeModal()
  }

  const handleSave = async (e) => {
    try {
      e.preventDefault()

      const hora24to12 = (hora) => {
        const [horaStr, minutos] = hora.split(':')
        const horaInt = parseInt(horaStr)
        const ampm = horaInt >= 12 ? 'PM' : 'AM'
        const hora12 = horaInt % 12 || 12
        return `${hora12}:${minutos} ${ampm}`
      }

      // hay que hacer un obj Date con la fecha y hora juntando nuevoEvento.fecha(2023-10-10) y nuevoEvento.horaInicio(10:30 AM)
      const fechaRecordatorio = new Date(`${nuevoEvento.fecha}T${nuevoEvento.horaInicio.slice(0, 5)}`).toISOString()
      console.log(fechaRecordatorio)
      nuevoEvento.horaInicio = hora24to12(nuevoEvento.horaInicio)

      if (nuevoEvento.horaFin) {
        nuevoEvento.horaFin = hora24to12(nuevoEvento.horaFin)
      }
      const eventNuevo = {
        titulo: nuevoEvento.titulo,
        descripcion: nuevoEvento.descripcion ?? '',
        horaInicio: nuevoEvento.horaInicio,
        fecha: nuevoEvento.fecha,
        expediente,
        horaFin: nuevoEvento.horaFin,
        recordar: nuevoEvento.recordar,
        fechaRecordatorio: nuevoEvento.recordar !== 0 ? fechaRecordatorio : null,
        usuarios: nuevoEvento.usuarios
      }
      console.log(nuevoEvento.horaInicio)

      const { data } = await apiAuth().post(`/agenda/${despacho}/${usuario}`, eventNuevo)
      const { message } = data
      console.log('message', message)
      setRender(render + 1)
      setNuevoEvento(null)
      setModalNuevoEvento(false)
    } catch (error) {
      console.log(error)
      const { response } = error
      console.log('error', response)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <ButtonGroup variant="outlined" >
          <Button
            variant={isTimeline ? 'outlined' : 'contained'}
            onClick={() => setIsTimeline(false)}
          >
            Mes
          </Button >
          <Button
            variant={isTimeline ? 'contained' : 'outlined'}
            onClick={() => setIsTimeline(true)}
          >
            Cronología
          </Button>
        </ButtonGroup >
        {permisos?.rol === 'Creador' || permisos?.rol === 'Editor' && (
          <Button
            variant="contained"
            title="Agregar usuario al expediente"
            onClick={() => setModalNuevoEvento(true)}
            sx={{ backgroundColor: '#c89211', color: 'white' }}
          >
            <Plus />
          </Button>
        )}

      </Box>

      {isLoading
        ? <LinearProgress />
        : error
          ? <Typography variant="h6" color="error">{error}</Typography>

          : isTimeline
            // eslint-disable-next-line indent
            ? <Timeline position="alternate">
              {timeline.map((event) => (
                <TimelineItem key={event.id}>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {
                      event.date
                    }
                    <br />
                    {event.startHour} - {event.endHour}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot sx={{ bgcolor: event.color }}>
                      {/* ['Aceptada', 'Rechazada', 'Pendiente', 'Cancelada', 'Realizada'], */}
                      {event.estatus === 'Aceptada' && <Check style={{ color: 'white' }} />
                      }
                      {event.estatus === 'Cancelada' && <EventBusy style={{ color: 'white' }} />
                      }
                      {event.estatus === 'Pendiente' && <Clock style={{ color: 'white' }} />
                      }
                      {event.estatus === 'Realizada' && <EventAvailable style={{ color: 'white' }} />
                      }
                      {event.estatus === 'Rechazada' && <HelpOutline style={{ color: 'white' }} />
                      }
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  {/* <Tooltip title={event.comentario || ''} placement="top"> */}
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {event.label}
                    </Typography>
                    <Typography>{event.groupLabel}</Typography>
                    {/* Asumiendo que tienes una manera de obtener y mostrar avatares */}
                    {/* <Box display="flex" alignItems="center" mt={2}>
                        <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} />
                        <Typography variant="caption">{event.creadoPor}</Typography>
                      </Box> */}
                    <Box mt={1}>
                      {getIconByStatus(event.estatus)}
                      <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
                        {event.estatus}
                      </Typography>
                      {event?.recordar !== 0 && event?.recordar !== '0' && event?.recordar !== null
                        ? <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
                          Recordar {event.recordar === 1440 ? '1 día ' : event.recordar + ' minutos '} antes
                        </Typography>

                        : null
                      }

                      {event.estatus === 'Realizada' || event.estatus === 'Cancelada' || event.estatus === 'Rechazada'
                        ? null
                        : permisos?.rol === 'Creador' || permisos?.rol === 'Editor' && (<ButtonIcon
                          color="primary"
                          size="small"
                          onClick={() => openModal(event)}
                        >
                          <Edit size={17} />
                        </ButtonIcon>
                        )

                      }

                      {event.comentario !== '' && event.comentario !== null && event.comentario !== undefined && (
                        <Typography variant="body2" sx={{ display: 'block', mt: 1 }} style={{
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word'
                        }}>
                          {event.comentario}
                        </Typography>
                      )
                      }
                    </Box>
                  </TimelineContent>
                  {/* </Tooltip> */}
                </TimelineItem>
              ))}
            </Timeline >
            // eslint-disable-next-line indent
            : <Scheduler
              locale="es"
              events={events}
              legacyStyle={false}
              options={state?.options}
              toolbarProps={state?.toolbarProps}
              onEventsChange={handleEventsChange}
              onCellClick={handleCellClick}
              onTaskClick={handleEventClick}
            />
      }
      {/* Modal de edición */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 14, p: 4 }}
          component={'form'}
          onSubmit={handleSaveChanges}
        >
          <FormControl fullWidth sx={sx}>
            <InputLabel id="recordar">Recordar</InputLabel>
            <Select
              labelId="recordar"
              id="recordar"
              value={selectedEvent ? selectedEvent.recordar : '0'}
              label="Recordar"
              onChange={(e) => setSelectedEvent({ ...selectedEvent, recordar: e.target.value })}
            >
              <MenuItem value="0">
                No recordar
              </MenuItem>
              <MenuItem value="10">
                10 minutos antes
              </MenuItem>
              <MenuItem value="15">
                15 minutos antes
              </MenuItem>
              <MenuItem value="30">
                30 minutos antes
              </MenuItem>
              <MenuItem value="60">
                1 hora antes
              </MenuItem>
              <MenuItem value="1440">
                1 día antes
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={sx}>
            <InputLabel id="estatus_modal">Estatus</InputLabel>
            <Select
              labelId="estatus_modal"
              id="estatus_modal"
              value={selectedEvent ? selectedEvent.estatus : 'Pendiente'}
              label="Estatus"
              onChange={(e) => {
                console.log(e.target.value)
                return setSelectedEvent({ ...selectedEvent, estatus: e.target.value })
              }}
            >
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Aceptada">Aceptar</MenuItem>
              <MenuItem value="Realizada">Completada</MenuItem>
              <MenuItem value="Rechazada">Rechazar</MenuItem>
            </Select>
          </FormControl>
          <TextField
            multiline
            minRows={3}
            label="Descripción"
            value={selectedEvent ? selectedEvent.comentario : ''}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, comentario: e.target.value })}
            fullWidth
            sx={sx}
          />
          {/* Resto de los campos de entrada para editar */}
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Guardar
          </Button>
        </Box>
      </Modal>

      {/* Modal de nuevo evento */}
      <Dialog open={modalNuevoEvento} onClose={() => setModalNuevoEvento(false)} fullWidth>
        <DialogTitle>
          Nuevo evento
        </DialogTitle>
        <Box
          component={'form'}
          onSubmit={handleSave}
        >
          <DialogContent>
            <TextField
              label="Título"
              fullWidth
              sx={sx}
              id='titulo'
              placeholder='Título del evento'
              required
              value={setNuevoEvento?.titulo}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })}
              title='Título del evento'
              type='text'
            />
            <TextField
              label="Descripción"
              fullWidth
              sx={sx}
              id='descripcion'
              type='text'
              multiline
              minRows={3}
              value={nuevoEvento ? setNuevoEvento.descripcion : ''}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl fullWidth required>
                <DatePicker
                  label='Fecha *'
                  onChange={(date) => setNuevoEvento({ ...nuevoEvento, fecha: date.format('YYYY-MM-DD') })}
                  sx={{
                    mb: 2,
                    width: '100%'
                  }} />

              </FormControl>
              <TimePicker
                label='Hora inicio *'
                ampm={false}
                required
                onChange={(date) => setNuevoEvento({ ...nuevoEvento, horaInicio: date.format('HH:mm') })}
                sx={{
                  mb: 2,
                  width: '100%'
                }} />

              <TimePicker
                label='Hora Final'
                ampm={false}
                onChange={(date) => setNuevoEvento({ ...nuevoEvento, horaFin: date.format('HH:mm') })}
                sx={{
                  mb: 2,
                  width: '100%'
                }} />
            </LocalizationProvider>
            <MultipleSelectCheckmarks handUsuarioSeleccionado={(usuariosSeleccionados) => {
              setNuevoEvento({ ...nuevoEvento, usuarios: usuariosSeleccionados })
              console.log(nuevoEvento)
            }} usuarios={usuarios} />
            <FormControl fullWidth sx={sx}>
              <InputLabel id="recordar">Recordar</InputLabel>
              <Select
                labelId="recordar"
                id="recordar"
                value={nuevoEvento ? nuevoEvento?.recordar : '0'}
                label="Recordar"
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, recordar: e.target.value })}
              >
                <MenuItem value="0">
                  No recordar
                </MenuItem>
                <MenuItem value="10">
                  10 minutos antes
                </MenuItem>
                <MenuItem value="15">
                  15 minutos antes
                </MenuItem>
                <MenuItem value="30">
                  30 minutos antes
                </MenuItem>
                <MenuItem value="60">
                  1 hora antes
                </MenuItem>
                <MenuItem value="1440">
                  1 día antes
                </MenuItem>
              </Select>
            </FormControl>
            <DialogActions>

              <Button variant="contained" color="primary" type='submit'>
                Guardar
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog >
    </>
  )
}

export default Agenda
const getEvents = async (despacho, usuario, expediente = null) => {
  try {
    if (!usuario) return []
    if (!despacho) return []
    const url = `/agenda/${despacho}/${usuario}`
    const { data } = await apiAuth().get(url)
    return data
  } catch (error) {
    console.error('Error fetching events:', error.response)
    return []
  }
}

const editEvento = async (_id, estatus, comentario, recordar, fechaRecordatorio) => {
  try {
    const url = `/agenda/${_id}`
    const { data } = await apiAuth().put(url, { estatus, fechaRecordatorio, comentario, recordar })
    return data
  } catch (error) {
    console.error('Error fetching events:', error.response)
  }
}

const MultipleSelectCheckmarks = ({ handUsuarioSeleccionado, usuarios = [] }) => {
  console.log('usuarios', usuarios)
  const [usuariosSinAsignar] = useState(usuarios)
  const [usuarioSeleccionados, setUsuarioSeleccionados] = useState([])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    console.log('value', value)
    setUsuarioSeleccionados(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl sx={sx} fullWidth >
        <InputLabel id="demo-multiple-checkbox-label">
          Selecciona los usuarios a asignar al evento
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={usuarioSeleccionados}
          onChange={handleChange}
          input={<OutlinedInput label="Usuarios" />}
          renderValue={(selected) =>
            // Muestra solo los nombres de los usuarios seleccionados
            selected.map((userId) => {
              const usuario = usuariosSinAsignar.find((usuario) => usuario?.usuario?._id === userId)
              return `${usuario?.usuario?.nombre} ${usuario?.usuario?.apellidoPaterno} ${usuario?.usuario?.apellidoMaterno}`
            }).join(', ')
          }
          MenuProps={MenuProps}
          onClose={() => handUsuarioSeleccionado(usuarioSeleccionados)}
        >
          {usuariosSinAsignar.map((usuario) => (
            <MenuItem key={usuario?.usuario?._id} value={usuario?.usuario?._id}>
              <Checkbox checked={usuarioSeleccionados.indexOf(usuario?.usuario._id) > -1} />
              <ListItemText primary={`${usuario.usuario.nombre} ${usuario.usuario.apellidoPaterno} ${usuario.usuario.apellidoMaterno} - ${usuario.usuario.email}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
