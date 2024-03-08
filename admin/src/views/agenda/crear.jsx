/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Checkbox,
  ListItemText,
  Paper, Backdrop, CircularProgress, Button, FormControl, OutlinedInput, InputLabel, Select, MenuItem, Box, Alert
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TimeField } from '@mui/x-date-pickers/TimeField'
import moment from 'moment-timezone'

const fecha = moment().tz('America/Mexico_City')
const title = 'Crear evento'
const sx = { mb: 4 }

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

const CreateAgenda = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id
  const usuario = usuarioC?._id

  const back = `../${usuarioC.clave}/agenda`

  const [loadingGlobal, setLoadingGlobal] = useState(false)
  // Estado para controlar la apertura y el cierre del modal

  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname.split('/').slice(0, 3).join('/')

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        setPermisos(modulo.permisos)
      }
    })
  }, [modulosC])

  useEffect(() => {
    if (usuarioC) {
      getUusuarios(usuarioC?.despacho?._id).then((usuarios) => {
        setUsuarios(usuarios)
      })
    }
  }, [usuarioC])

  const handleSave = async (e) => {
    setLoadingGlobal(true)
    try {
      e.preventDefault()

      const fecha12 = (fecha = '20:20') => {
        console.log(fecha)
        if (!fecha) return ''
        const [horaStr, minutos] = fecha.split(':')
        const horaInt = parseInt(horaStr)
        const ampm = horaInt >= 12 ? 'PM' : 'AM'
        const hora12 = horaInt % 12 || 12
        return `${hora12}:${minutos} ${ampm}`
      }
      console.log(nuevoEvento.fecha)
      const horaIni = fecha12(moment(nuevoEvento.fecha).format('HH:mm'))
      const fechaSolo = moment(nuevoEvento.fecha).format('YYYY-MM-DD')

      // nuevoEvento.horaFin = fecha12(nuevoEvento.horaFin)

      const eventNuevoob = {
        titulo: nuevoEvento.titulo,
        descripcion: nuevoEvento.descripcion ?? '',
        horaInicio: horaIni,
        fecha: fechaSolo,
        // expediente,
        horaFin: fecha12(nuevoEvento.horaFin) === '' ? undefined : fecha12(nuevoEvento.horaFin),
        recordar: nuevoEvento.recordar ?? 0,
        fechaRecordatorio: nuevoEvento?.recordar !== 0 ? fecha.subtract(nuevoEvento?.recordar, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
        usuarios: nuevoEvento.usuarios
      }

      const { data } = await apiAuth().post(`/agenda/${despacho}/${usuario}`, eventNuevoob)
      const { message } = data

      navigate(`/${usuarioC?.clave}/agenda`)
      console.log('message', message)
      setNuevoEvento(null)
    } catch (error) {
      const { response } = error
      console.log('error', response)
    } finally {
      setLoadingGlobal(false)
    }
  }
  const toExpedientes = usuarioC?.clave ? `/${usuarioC?.clave}/agenda` : '/agenda'

  // estados pare crear un evento nuevo
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: '',
    descripcion: '',
    fecha,
    horaFin: '',
    usuarios: [],
    recordar: '0'
  })

  const [usuarios, setUsuarios] = useState([])

  return (

    <>
      <ButtonAction child={[{ title: 'Agenda', to: toExpedientes }]} actual={title} back={back} />

      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          m: { xs: -1.2, md: 2 },
          mt: 5,
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: 'white'
        }}
      >

        {permisos?.create === false
          ? <Alert severity='error'>
            No tienes permisos para crear un evento en la agenda
          </Alert>
          : <Box
            component='form'
            autoComplete='off'
            onSubmit={handleSave}
          >

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
                <DateTimeField
                  // defaultValue={fecha}
                  label='Fecha'
                  format='DD/MM/YYYY HH:mm A'
                  required
                  typeof='datetime-local'
                  // value={nuevoEvento?.fecha}
                  onChange={(date) => setNuevoEvento({ ...nuevoEvento, fecha: date })}
                  sx={{
                    mb: 2,
                    width: '100%'
                  }} />

              </FormControl>
              <TimeField
                label='Hora Fin'
                onChange={(date) => setNuevoEvento({ ...nuevoEvento, horaFin: date.format('HH:mm') })}
                sx={{
                  mb: 2,
                  width: '100%'
                }} />

            </LocalizationProvider>
            <MultipleSelectCheckmarks handUsuarioSeleccionado={(usuariosSeleccionados) => {
              setNuevoEvento({ ...nuevoEvento, usuarios: usuariosSeleccionados })
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

            <Button variant='contained' type='submit'>
              Guardar
            </Button>
          </Box>
        }
      </Paper >
      <Backdrop
        color='inherit'
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingGlobal}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>

  )
}

export default memo(CreateAgenda)

const MultipleSelectCheckmarks = ({ handUsuarioSeleccionado, usuarios = [] }) => {
  const [usuariosSinAsignar, setusuarionSinAsignar] = useState(usuarios)
  const [usuarioSeleccionados, setUsuarioSeleccionados] = useState([])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setUsuarioSeleccionados(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  useEffect(() => {
    setusuarionSinAsignar(usuarios)
  }, [usuarios])

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
              const usuario = usuariosSinAsignar.find((usuario) => usuario?._id === userId)
              return `${usuario?.nombre} ${usuario?.apellidoPaterno} ${usuario?.apellidoMaterno}`
            }).join(', ')
          }
          MenuProps={MenuProps}
          onClose={() => handUsuarioSeleccionado(usuarioSeleccionados)}
        >
          {usuariosSinAsignar.map((usuario) => (
            <MenuItem key={usuario?._id} value={usuario?._id}>
              <Checkbox checked={usuarioSeleccionados.indexOf(usuario?._id) > -1} />
              <ListItemText primary={`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno} - ${usuario.email}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const getUusuarios = async (despacho) => {
  let allUsuario = [] // Almacena todas las etapas
  let hasNextPage = true // Indica si hay más páginas disponibles
  let page = 1 // Página inicial

  try {
    while (hasNextPage) {
      const uri = `/usuario/${despacho}?page=${page}&estatus=Activo`

      const { data } = await apiAuth().get(uri)
      const etapas = data.usuarios.docs

      allUsuario = [...allUsuario, ...etapas]

      hasNextPage = data.usuarios.hasNextPage ?? false

      page++
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return allUsuario
}
