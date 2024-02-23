/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import { TextField, Backdrop, CircularProgress, Button, FormControl, InputLabel, InputAdornment, Select, Tooltip, MenuItem, Grid, Box, LinearProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Add } from '@mui/icons-material' // Importa el icono de "Add"
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { useField } from '../../hooks/useField'
import Swal from 'sweetalert2'
import AlertExpedientes from '../../components/AlertExpedientes'
const title = 'Crear expediente'
const sx = { mb: 4 }

const handleCreateExpediente = async ({
  noExpediente = '',
  titulo = '',
  fechaInicio = '',
  clienteP,
  procedimientoP,
  juicio,
  juzgado,
  materia,
  etapa,
  estapaOpcional,
  despacho,
  usuario
}) => {
  const url = `/expedientes/${despacho}`

  const payload = {
    titulo: titulo.value,
    cliente: clienteP,
    noExpediente: noExpediente.value,
    fechaInicio: fechaInicio.value,
    procedimiento: procedimientoP,
    juzgado,
    usuario,
    asunto: juicio,
    materia,
    etapa,
    estapaOpcional: estapaOpcional.value
  }
  const { data } = await apiAuth({ 'Content-Type': 'application/json' }).post(url, payload)

  const { expediente } = data
  const { message } = data

  if (message) {
    Swal.fire({
      icon: 'success',
      title: message
    })
  }
  return expediente
}

const CreateExpedientes = ({ usuarioC = null }) => {
  const fechaActual = new Date().toISOString().split('T')[0]
  const navigate = useNavigate()

  const back = `../${usuarioC.clave}/expedientes` // Regresar a la lista de expedientes
  const noExpediente = useField({ type: 'text', state: '' })
  const titulo = useField({ type: 'text', state: '' })
  const fechaInicio = useField({ type: 'date', state: fechaActual })
  const estapaOpcional = useField({ type: 'text', state: '' })

  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState('')
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  // Estado para controlar la apertura y el cierre del modal
  const [openModalCliente, setOpenModalCliente] = useState(false)
  const [openModalAsunto, setOpenModalAsunto] = useState(false)

  const [procidimientos] = useState(['Litigioso', 'No litigioso'])
  const [procedimiento, setProcedimiento] = useState('Litigioso')
  const [juicios, setJuicios] = useState([])
  const [juicio, setJuicio] = useState('')
  const [juzgados, setJuzgados] = useState([])
  const [juzgado, setJuzgado] = useState('')
  const [materias, setMaterias] = useState([])
  const [materia, setMateria] = useState('')
  const [etapas, setEtapas] = useState([])
  const [etapa, setEtapa] = useState('')

  const handleCreateCliente = (cliente) => {
    const { _id, nombre } = cliente
    setClientes([...clientes, { _id, nombre }])
    setCliente(_id)
  }

  const handleCreateAsunto = (asunto) => {
    const { _id, nombre } = asunto
    setJuicios([...juicios, { _id, nombre }])
    setJuicio(_id)
  }

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
    getClientes(usuarioC?.despacho?._id).then(data => {
      const clientesData = data.map(item => {
        const cliente = {
          _id: item._id,
          nombre: item.nombre
        }
        return cliente
      })
      setClientes(clientesData)
    })

    getJuzgados(usuarioC?.despacho?.estado).then(data => {
      const juzgadosData = data.map(item => {
        const juzgado = {
          _id: item._id,
          nombre: `${item.tipo} - ${item.nombre} - ${item.estado.nombre} `
        }
        return juzgado
      })
      setJuzgados(juzgadosData)
    })

    getMaterias().then(data => {
      const materiasData = data.map(item => {
        const materia = {
          _id: item._id,
          nombre: item.nombre
        }
        return materia
      })
      setMaterias(materiasData)
    })

    getAsuntos(usuarioC?.despacho?._id).then(data => {
      const asuntosData = data.map(item => {
        const asunto = {
          _id: item._id,
          nombre: item.nombre
        }
        return asunto
      })
      setJuicios(asuntosData)
    })
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setLoadingGlobal(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const expediente = handleCreateExpediente({
        noExpediente,
        titulo,
        fechaInicio,
        clienteP: cliente,
        procedimientoP: procedimiento,
        juicio,
        juzgado,
        materia,
        etapa,
        estapaOpcional,
        despacho: usuarioC?.despacho?._id,
        usuario: usuarioC._id
      })

      const { _id } = expediente
      const clave = usuarioC.clave
      const url = `/${clave}/expedientes/${_id}/editar`
      navigate(url, {
        state: { expediente }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el expediente',
        text: error.message
      })
    } finally {
      setLoadingGlobal(false)
    }
  }

  const toExpedientes = usuarioC?.clave ? `/${usuarioC?.clave}/expedientes` : '/expedientes'

  return (

    <>
      <ButtonAction child={[{ title: 'Expedientes', to: toExpedientes }]} actual={title} back={back} />

      <Box
        sx={{
          p: 4,
          m: 2,
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'white'
        }}
      >

        {permisos?.create === false
          ? <Grid item xs={12}>
            <Alert severity='error'>No tienes permisos para crear expedientes</Alert>
          </Grid>
          : <Box
            component='form'
            autoComplete='off'
            onSubmit={handleCreate}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AlertExpedientes despacho={usuarioC?.despacho} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  sx={sx}
                  fullWidth
                  label='No. de expediente'
                  {...noExpediente}
                />
              </Grid>
              <Grid item xs={12} md={6}>

                <TextField
                  sx={sx}
                  fullWidth
                  required
                  label='Título'
                  {...titulo}
                />
              </Grid>
              <Grid item xs={12} md={6}>

                <TextField
                  sx={sx}
                  fullWidth
                  required
                  label='Fecha de inicio'
                  {...fechaInicio}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>

                  <InputLabel id='select-cliente'>Cliente *</InputLabel>
                  <Select
                    labelId='select-cliente'
                    value={cliente}
                    label='Cliente +'
                    onChange={e => setCliente(e.target.value)}
                    required
                    startAdornment={(
                      <InputAdornment position="start" sx={{
                        color: 'primary.main'
                      }}>
                        <Tooltip title='Agregar cliente' arrow>
                          <Button
                            variant='contained'
                            onClick={() => setOpenModalCliente(true)}
                            sx={{
                              p: 0.2,
                              minWidth: 0,
                              minHeight: 0,
                              ml: 1
                            }}
                          >
                            <Add />
                          </Button>
                        </Tooltip>
                      </InputAdornment>
                    )}
                  >
                    {clientes.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={sx}>
                  <InputLabel id='select-procedimiento'>Procedimiento *</InputLabel>
                  <Select
                    labelId='select-procedimiento'
                    value={procedimiento}
                    label='Estatus'
                    onChange={e => setProcedimiento(e.target.value)}
                    required
                  >
                    {procidimientos.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={sx}>
                  <InputLabel id='select-Juicio'>Juicio *</InputLabel>
                  <Select
                    labelId='select-Juicio'
                    value={juicio}
                    label='Juicio'
                    onChange={e => setJuicio(e.target.value)}
                    required
                    startAdornment={(
                      <InputAdornment position="start" sx={{
                        color: 'primary.main'
                      }}>
                        <Tooltip title='Agregar juicio' arrow>
                          <Button
                            variant='contained'
                            onClick={() => setOpenModalAsunto(true)}
                            sx={{
                              p: 0.2,
                              minWidth: 0,
                              minHeight: 0,
                              ml: 1
                            }}
                          >
                            <Add />
                          </Button>
                        </Tooltip>
                      </InputAdornment>
                    )}
                  >
                    {juicios.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={sx}>
                  <InputLabel id='select-juzgado'>Juzgado *</InputLabel>
                  <Select
                    labelId='select-juzgado'
                    value={juzgado}
                    label='Juzgado'
                    required
                    onChange={e => setJuzgado(e.target.value)}
                  >
                    {juzgados.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {
                procedimiento === 'Litigioso' &&
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={sx}>
                      <InputLabel id='select-materia'>Materia</InputLabel>
                      <Select
                        labelId='select-materia'
                        value={materia}
                        label='Materia'
                        required
                        onChange={e => {
                          setMateria(e.target.value)
                          getEtapas(e.target.value).then(data => {
                            const etapasData = data.map(item => {
                              const etapa = {
                                _id: item._id,
                                nombre: item.nombre
                              }
                              return etapa
                            })
                            setEtapas(etapasData)
                          })
                        }}
                      >
                        {materias.map((item, index) => (
                          <MenuItem key={index} value={item._id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={sx}>
                      <InputLabel id='select-etapa'>Etapa Procesal</InputLabel>
                      <Select
                        labelId='select-etapa'
                        value={etapa}
                        label='Etapa Procesal'
                        onChange={e => setEtapa(e.target.value)}
                      >
                        {etapas.map((item, index) => (
                          <MenuItem key={index} value={item._id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                        <MenuItem value='otro'>
                          Otro (Opcional)
                        </MenuItem>
                      </Select>

                    </FormControl>
                  </Grid>
                  {
                    etapa === 'otro' &&
                    <Grid item xs={12} md={6}>
                      <TextField
                        sx={sx}
                        fullWidth
                        label='Etapa opcional'
                        {...estapaOpcional}
                      />
                    </Grid>
                  }
                </>
              }
              <Grid item xs={12}>
                <Button variant='contained' type='submit'>
                  Guardar expediente
                </Button>
              </Grid>
            </Grid>
          </Box>
        }

      </Box >
      <ModalCliente open={openModalCliente} handleClose={() => setOpenModalCliente(false)} handleCreateCliente={handleCreateCliente} usuarioC={usuarioC} />
      <ModalAsunto open={openModalAsunto} handleClose={() => setOpenModalAsunto(false)} handleCreateAsunto={handleCreateAsunto} usuarioC={usuarioC} />
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

export default memo(CreateExpedientes)

const ModalAsunto = ({ open, handleClose, handleCreateAsunto, usuarioC }) => {
  const nombreAsunto = useField({ type: 'text', state: '' })
  const descripcion = useField({ type: 'text', state: '' })

  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const despacho = usuarioC?.despacho?._id
      const url = `/asuntos/${despacho}`

      const payload = {
        nombre: nombreAsunto.value,
        descripcion: descripcion.value,
        creadoPor: usuarioC._id
      }
      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).post(url, payload)

      const { asunto } = data
      const { message } = data

      if (message) {
        Swal.fire({
          icon: 'success',
          title: message
        })
      }

      setLoading(false)
      handleClose()

      nombreAsunto.onReset()
      descripcion.onReset()

      return handleCreateAsunto(asunto)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el cliente',
        text: error.message
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo Juicio</DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField fullWidth label='Nombre del juicio' required {...nombreAsunto} sx={{ mb: 2 }} />
          <TextField multiline fullWidth label='Descripción' {...descripcion} sx={{ mb: 2 }} minRows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancelar
          </Button>
          <Button type='submit' variant='contained'>
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

const ModalCliente = ({ open, handleClose, handleCreateCliente, usuarioC }) => {
  const nombreCliente = useField({ type: 'text', state: '' })
  const correoCliente = useField({ type: 'email', state: '' })
  const telefonoCliente = useField({ type: 'text', state: '' })
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const despacho = usuarioC?.despacho?._id
      const url = `/clientes/${despacho}`

      const payload = {
        nombre: nombreCliente.value,
        correo: correoCliente.value,
        telefono: telefonoCliente.value,
        creadoPor: usuarioC._id
      }
      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).post(url, payload)

      const { cliente } = data
      const { message } = data

      if (message) {
        Swal.fire({
          icon: 'success',
          title: message
        })
      }

      setLoading(false)
      handleClose()

      nombreCliente.onReset()
      correoCliente.onReset()
      telefonoCliente.onReset()

      return handleCreateCliente(cliente)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el cliente',
        text: error.message
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo cliente</DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField fullWidth label='Nombre del cliente' required {...nombreCliente} sx={{ mb: 2 }} />
          <TextField fullWidth label='Correo' {...correoCliente} sx={{ mb: 2 }} />
          <TextField fullWidth label='Teléfono' {...telefonoCliente} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancelar
          </Button>
          <Button type='submit' variant='contained'>
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

const getClientes = async (despacho) => {
  if (!despacho) {
    return []
  }
  let allClientes = [] // Almacena todos los clientes
  let hasNextPage = true // Indica si hay más páginas disponibles
  let page = 1 // Página inicial

  try {
    while (hasNextPage) {
      const uri = `/clientes/${despacho}?page=${page}&estatus=Activo`

      const { data } = await apiAuth().get(uri)
      const clientes = data.clientes.docs

      allClientes = [...allClientes, ...clientes]

      hasNextPage = data.clientes.hasNextPage ?? false

      page++
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return allClientes
}

const getJuzgados = async (estado = '') => {
  let dataCollection = [] // Almacena todos los clientes
  let hasNextPage = true // Indica si hay más páginas disponibles
  let page = 1 // Página inicial

  try {
    while (hasNextPage) {
      const uri = `/juzgados?page=${page}&estatus=Activo&estado=${estado}`

      const { data } = await apiAuth().get(uri)
      const collects = data.juzgados.docs

      dataCollection = [...dataCollection, ...collects]

      hasNextPage = data.juzgados.hasNextPage ?? false

      page++
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return dataCollection
}

const getMaterias = async () => {
  let allMaterias = [] // Almacena todas las materias
  let hasNextPage = true // Indica si hay más páginas disponibles
  let page = 1 // Página inicial

  try {
    while (hasNextPage) {
      const uri = `/materias?page=${page}&estatus=Activo`

      const { data } = await apiAuth().get(uri)
      const materias = data.materias.docs

      allMaterias = [...allMaterias, ...materias]

      hasNextPage = data.materias.hasNextPage ?? false

      page++
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return allMaterias
}

const getEtapas = async (materia = '') => {
  let allEtapas = [] // Almacena todas las etapas
  let hasNextPage = true // Indica si hay más páginas disponibles
  let page = 1 // Página inicial

  try {
    while (hasNextPage) {
      const uri = `/etapas-procesales?page=${page}&estatus=Activo&materia=${materia}`

      const { data } = await apiAuth().get(uri)
      const etapas = data.etapasProcesales.docs

      allEtapas = [...allEtapas, ...etapas]

      hasNextPage = data.etapasProcesales.hasNextPage ?? false

      page++
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return allEtapas
}

const getAsuntos = async (despacho) => {
  let allAsuntos = [] // Almacena todas las etapas
  let hasNextPage = true // Indica si hay más páginas disponibles
  let page = 1 // Página inicial

  try {
    while (hasNextPage) {
      const uri = `/asuntos/${despacho}?page=${page}&estatus=Activo`

      const { data } = await apiAuth().get(uri)
      const asuntos = data.asuntos.docs

      allAsuntos = [...allAsuntos, ...asuntos]

      hasNextPage = data.asuntos.hasNextPage ?? false

      page++
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return allAsuntos
}
