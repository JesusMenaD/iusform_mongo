/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField, Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  DialogActions, Paper, Chip, Divider, Typography, Button, FormControl, InputLabel, Select, Tooltip, MenuItem, Grid, Box, LinearProgress, Alert
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { useField } from '../../hooks/useField'
import Swal from 'sweetalert2'
import { Calendar, Edit, Users, User, AlignJustify, DollarSign, File, TrendingUp, Briefcase } from 'react-feather'
import Boxes from 'react-feather/dist/icons/box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import PartesInvolucradas from './partes'
// import Tabss from '@mui/material/Tabs'
import MovimientosTable from './movimientos'
import UsuariosTable from './usuarios'
import DocumetosList from './documentos'
import Agenda from './Agenda'
import Notas from './Notas'
import Gastos from './gastos'
import Ingresos from './ingresos'
import Balance from './balance'
import Pautas from './Pautas'
const formatFechaHora12H = (fecha) => {
  fecha = new Date(fecha)

  // Obtener los componentes de la fecha y hora
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1 // Los meses en JavaScript son 0-indexados, por lo que necesitas sumar 1
  const año = fecha.getFullYear()
  let hora = fecha.getHours()
  const minutos = fecha.getMinutes()
  const segundos = fecha.getSeconds()

  // Convertir la hora a formato de 12 horas
  const ampm = hora >= 12 ? 'PM' : 'AM'
  hora = hora % 12
  hora = hora || 12 // '0' horas se muestran como '12'

  // Formatear la fecha y hora
  const fechaHoraFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos} ${ampm}`

  return fechaHoraFormateada
}

const title = 'Editar Expediente'
const sx = { mb: 4 }

const EditarExpediente = ({ usuarioC }) => {
  const [cargarMov, setCargasMov] = useState(0)
  // const [cargaUsuario, setCargaUsuario] = useState(0)

  const location = useLocation()
  const [expediente, setExpediente] = useState(location.state?.expediente || {})
  const [permisosExpediente, setPermisosExpediente] = useState(null)

  const navigate = useNavigate()
  const usuario = usuarioC._id
  const despacho = usuarioC.despacho._id
  const _id = location.pathname.split('/')[3]

  const back = `../${usuarioC.clave}/expedientes` // Regresar a la lista de expedientes

  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname.split('/').slice(0, 3).join('/')
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalNoExpediente, setOpenModalNoExpediente] = useState(false)
  const [openModalTitulo, setOpenModalTitulo] = useState(false)
  const [openModalJuicio, setOpenModalJuicio] = useState(false)
  // const [value, setValue] = useState(0)
  const [usuariosExpedientes, setUsuariosExpedientes] = useState([])
  // const [currentPageMovimientos, setCurrentPageMovimientos] = useState(0)

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        setPermisos(modulo.permisos)
      }
    })
  }, [modulosC])

  useEffect(() => {
    setLoadingGlobal(true)
    getExpediente(despacho, usuario, _id).then(data => {
      if (!data) {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró el expediente',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        navigate(`/${usuarioC.clave}/expedientes`)
      }
      setExpediente(data.expediente)
      setPermisosExpediente(data.permisos)

      setLoadingGlobal(false)
    })
    getUsuariosSinPaginate(despacho, _id, usuario).then(data => {
      setUsuariosExpedientes(data)
    })
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
  }

  const toExpedientes = usuarioC?.clave ? `/${usuarioC?.clave}/expedientes` : '/expedientes'

  const [tabs, settabs] = useState('1')
  const [tabsGastos, settabsGastos] = useState('2')
  const [tabsRecursos, settabsRecursos] = useState('1')

  const handleChangeTabs = (event, newValue) => {
    settabs(newValue)
  }

  // function CustomTabPanel(props) {
  //   const { children, value, index, ...other } = props

  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`simple-tabpanel-${index}`}
  //       aria-labelledby={`simple-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && (
  //         <Box sx={{ p: 3 }}>
  //           <Typography>{children}</Typography>
  //         </Box>
  //       )}
  //     </div>
  //   )
  // }

  return (
    <>
      <ButtonAction child={[{ title: 'Expedientes', to: toExpedientes }]} actual={title} back={back} />

      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          m: {
            xs: -1.3,
            sm: 2
          },
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'white'
        }}
      >
        {permisos?.update === false
          ? <Grid item xs={12}>
            <Alert severity='error'>No tienes permisos para editar un expediente</Alert>
          </Grid>
          : <Box
            component='form'
            autoComplete='off'
            onSubmit={handleCreate}
          >
            {loadingGlobal
              ? <LinearProgress sx={sx} />
              : <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant='h5' mb={2} component='h2'>
                        {/* {expediente?.numeroExpedienteInterno !== '' && expediente?.numeroExpedienteInterno + ' - '} */}
                        {expediente?.titulo}
                        {/* {expediente?.numeroExpediente !== '' && '(' + expediente?.numeroExpediente + ')'} */}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} textAlign={{ xs: 'right', md: 'left' }} display="flex" justifyContent="flex-end">
                      <Typography variant='h6' mb={2} component='h2'>
                        {expediente?.numeroExpediente}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider variant='fullWidth' sx={{ borderBottomWidth: '3px', borderBottomColor: 'primary.main' }} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={4} bgcolor={'#f9f9f9'}>
                  <Grid container spacing={2} >
                    <Grid item xs={8}>
                      <Typography variant='body1' mb={2} >
                        Información general
                      </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" justifyContent="flex-end" pr={2}>
                      <EstatusaRender estatus={expediente?.estatus} handleDelete={() => setOpenModal(true)} />
                    </Grid>
                    <Grid item xs={12}>
                      <DataLine label='No. Expediente:' onHandEdit={() => setOpenModalNoExpediente(true)} value={expediente?.numeroExpediente} />
                      <DataLine label='Titulo:' value={expediente?.titulo} onHandEdit={() => { setOpenModalTitulo(true) }} />
                      <DataLine label='Juicio:' value={expediente?.asunto?.nombre} onHandEdit={() => { setOpenModalJuicio(true) }} />
                      <DataLine label='Folio interno:' isEdit={false} value={expediente?.numeroExpedienteInterno} />
                      <DataLine label='Fecha inicio:' isEdit={false} value={new Date(expediente?.fechaInicio).toLocaleDateString()} />
                      {expediente?.fechaTermino !== undefined && <DataLine label='Fecha termino:' isEdit={false} value={formatFechaHora12H(expediente?.fechaTermino)} />}
                      <DataLine label='Último movimiento:' isEdit={false} value={formatFechaHora12H(expediente?.ultimoMovimiento)} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={4} bgcolor={'#f9f9f9'}>
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <Typography variant='body1' mb={2} >
                        Información Adicional
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {expediente?.cliente?.nombre ? <DataLine isEdit={false} label='Cliente:' value={expediente?.cliente?.nombre} /> : <DataLine label='Cliente:' value='No asignado' isEdit={false} />}
                      <DataLine label='Procedimiento:' isEdit={false} value={expediente?.procedimiento} />
                      <DataLine label='Juzgado:' isEdit={false} value={expediente?.juzgado?.nombre} />
                      {expediente?.materia?.nombre && <DataLine isEdit={false} label='Materia:' value={expediente?.materia?.nombre} />}
                      <DataLine isEdit={true} label='Etapa procesal:' value={expediente?.etapaProcesal?.nombre} />
                      {/* <DataLine label='Etapa procesal:' value={expediente?.etapaProcesal?.nombre} /> */}
                      {/* <DataLine label='Etapa del proceso:' value={expediente?.numeroExpedienteInterno} /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                  <Box sx={{ mb: 14 }} >
                    <TabContext value={tabs}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display={'flex'} justifyContent={'center'} bgcolor={'#f9f9f9'}>
                        <TabList onChange={handleChangeTabs} >
                          {/* <Tabss
                            scrollButtons
                            value={tabs}
                            indicator={true}
                            variant="scrollable"
                            allowScrollButtonsMobile> */}
                          <Tab sx={{ fontSize: '10px' }} label="AGENDA" value="1" icon={<Calendar />} />
                          <Tab sx={{ fontSize: '10px' }} label="USUARIOS" value="2" icon={<User />} />
                          <Tab sx={{ fontSize: '10px' }} label="PARTES INVOLUCRADAS" value="3" icon={<Users />} />
                          <Tab sx={{ fontSize: '10px' }} label="NOTAS" value="4" icon={<AlignJustify />} />
                          <Tab sx={{ fontSize: '10px' }} label="GASTOS E INGRESOS" value="5" icon={<DollarSign />} />
                          <Tab sx={{ fontSize: '10px' }} label="DOCUMENTOS" value="6" icon={<File />} />
                          <Tab sx={{ fontSize: '10px' }} label="MOVIMIENTOS" value="7" icon={<TrendingUp />} />
                          <Tab sx={{ fontSize: '10px' }} label="RECURSOS E INCIDENCIAS" value="8" icon={<Boxes />} />
                          <Tab sx={{ fontSize: '10px' }} label="PAUTAS" value="9" icon={<Briefcase />} />
                        </TabList>
                      </Box>
                      <TabPanel sx={{ p: 0 }} value="9">
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <Briefcase /></Avatar>} title='Pautas' />
                        <Pautas despacho={despacho} usuario={usuario} _id={_id} permisos={permisosExpediente} clave={usuarioC?.clave} />

                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="1">
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <Calendar /></Avatar>} title='Agenda' />
                        <Agenda despacho={despacho} usuario={usuario} usuarios={usuariosExpedientes} expediente={_id} permisos={permisosExpediente} />
                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="2">
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <User /></Avatar>} title='Usuarios' />
                        <UsuariosTable despacho={despacho} usuario={usuario} _id={_id} permisos={permisosExpediente} />
                      </TabPanel>
                      <TabPanel value="7" sx={{ p: 0 }}>
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <TrendingUp /></Avatar>} title='Movimientos' />
                        <MovimientosTable despacho={despacho} usuario={usuario} _id={_id} cargas={cargarMov} />
                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="6" >
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <File /></Avatar>} title='Documentos' />
                        <DocumetosList expediente={_id} despacho={despacho} usuario={usuario} permisos={permisosExpediente} />
                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="4" >
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <AlignJustify /></Avatar>} title='Notas' />
                        <Notas expediente={_id} despacho={despacho} usuario={usuario} permisos={permisosExpediente} />
                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="3" >
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <Users /></Avatar>} title='Partes involucradas' />
                        <PartesInvolucradas expediente={_id} despacho={despacho} usuario={usuario} permisos={permisosExpediente} _id={_id}
                        />
                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="5" >
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <Boxes /></Avatar>} title='Gastos e ingresos' />
                        <TabContext value={tabsGastos}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display={'flex'} justifyContent={'center'} bgcolor={'#f9f9f9'}>
                            <TabList onChange={(event, newValue) => settabsGastos(newValue)} >
                              <Tab sx={{ fontSize: '10px' }} label="GASTOS" value="1" icon={<Calendar />} />
                              <Tab sx={{ fontSize: '10px' }} label="BALANCE" value="2" icon={<User />} />
                              <Tab sx={{ fontSize: '10px' }} label="INGRESOS" value="3" icon={<Briefcase />} />
                            </TabList>
                          </Box>
                          <TabPanel sx={{ p: 0 }} value="1">
                            <Gastos despacho={despacho}
                              usuario={usuario} _id={_id} cargas={cargarMov}
                              permisos={permisosExpediente} />
                          </TabPanel>
                          <TabPanel sx={{ p: 0 }} value="2">
                            <Balance despacho={despacho} _id={_id} cargas={cargarMov} />
                          </TabPanel>
                          <TabPanel sx={{ p: 0 }} value="3">
                            <Ingresos despacho={despacho}
                              usuario={usuario} _id={_id} cargas={cargarMov}
                              permisos={permisosExpediente} />
                          </TabPanel>
                        </TabContext>
                      </TabPanel>
                      <TabPanel sx={{ p: 0 }} value="8" >
                        <IconModule iconModule={<Avatar sx={{ bgcolor: 'primary.main' }}> <Boxes /></Avatar>} title='Recursos e incidencias' />
                        <TabContext value={tabsRecursos}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display={'flex'} justifyContent={'center'} bgcolor={'#f9f9f9'}>
                            <TabList onChange={(event, newValue) => settabsRecursos(newValue)} >
                              <Tab sx={{ fontSize: '10px' }} label="RECURSOS" value="1" icon={<Calendar />} />
                              <Tab sx={{ fontSize: '10px' }} label="INCIDENCIAS" value="3" icon={<Briefcase />} />
                            </TabList>
                          </Box>
                          <TabPanel sx={{ p: 0 }} value="1">
                          </TabPanel>
                          <TabPanel sx={{ p: 0 }} value="2">
                          </TabPanel>
                        </TabContext>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Grid>
              </Grid>
            }
          </Box>
        }

      </Paper >
      {/* <Backdrop
        color='inherit'
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingGlobal}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <ModalEstatus _id={_id} open={openModal} handleClose={() => setOpenModal(false)} handleEstatus={(estatus) => {
        setCargasMov(cargarMov + 1)

        const copy = { ...expediente }
        copy.estatus = estatus
        if (estatus === 'Concluido' || estatus === 'Inactivo' || estatus === 'Suspendido') {
          const fecha = new Date()
          copy.fechaTermino = fecha
        }

        if (estatus === 'Activo') {
          copy.fechaTermino = null
        }

        return setExpediente({ ...copy })
      }} usuarioC={usuarioC} estatusExped={expediente?.estatus} />

      <ModalNoExpediente
        _id={_id}
        open={openModalNoExpediente}
        handleClose={() => setOpenModalNoExpediente(false)}
        handleNoExpediente={(noExpediente) => {
          setCargasMov(cargarMov + 1)
          return setExpediente({ ...expediente, numeroExpediente: noExpediente })
        }}
        usuarioC={usuarioC}
        noExpedienteE={expediente?.numeroExpediente}
      />

      <ModalTitulo
        _id={_id}
        open={openModalTitulo}
        handleClose={() => setOpenModalTitulo(false)}
        handleTitulo={(titulo) => {
          setCargasMov(cargarMov + 1)
          return setExpediente({ ...expediente, titulo })
        }}
        usuarioC={usuarioC}
        tituloExp={expediente?.titulo}
      />

      <ModalJuicio
        _id={_id}
        open={openModalJuicio}
        handleClose={() => setOpenModalJuicio(false)}
        handleJuicio={(juicio) => {
          setCargasMov(cargarMov + 1)
          const copy = { ...expediente }
          copy.asunto.nombre = juicio
          return setExpediente({ ...copy })
        }}
        usuarioC={usuarioC}
        juicioExp={expediente?.asunto?.nombre}
      />

    </>
  )
}

export default memo(EditarExpediente)

const getExpediente = async (despacho, usuario, expediente) => {
  try {
    const { data } = await apiAuth().get(`/expedientes/${despacho}/${usuario}/${expediente}`)
    return { expediente: data?.expediente, permisos: data?.permios }
  } catch (error) {
    return null
  }
}

const DataLine = ({ label = '', value = '', onHandEdit = () => { }, isEdit = true }) => {
  return (
    <>
      <Grid container ml={{
        xs: 0,
        sm: 2
      }} alignItems='center'>
        <Grid item xs={3.5}>
          <Typography variant='subtitle1' mb={2} color='primary'>
            {label}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant='body2' mb={2} >
            {value}
            {isEdit && <>
              <Tooltip title='Editar'>
                <Button variant="text" onClick={onHandEdit} startIcon={<Edit size={14} />}>
                </Button>
              </Tooltip>
            </>}

          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

const EstatusaRender = ({ estatus, handleDelete = () => { } }) => {
  if (estatus === 'Activo') {
    return <Chip sx={{ p: 1.5 }} label={estatus} color="primary" deleteIcon={<Edit color="white" size={15} />} onDelete={handleDelete} />
  }
  if (estatus === 'Inactivo') {
    return <Chip sx={{ p: 1.5 }} label={estatus} color='secondary' deleteIcon={<Edit size={14} color="white" />} onDelete={handleDelete} />
  }
  if (estatus === 'Concluido') {
    return <Chip sx={{ p: 1.5 }} label={estatus} color='success' deleteIcon={<Edit size={14} color="white" />} onDelete={handleDelete} />
  }
  return <Chip sx={{ p: 1.5 }} label={estatus} color='warning' deleteIcon={<Edit size={14} color="white" />} onDelete={handleDelete} />
}

const ModalEstatus = ({ _id, open, handleClose, handleEstatus, usuarioC, estatusExped = 'Activo' }) => {
  const [estatus, setEstatus] = useState(estatusExped)

  useEffect(() => {
    setEstatus(estatusExped)
  }, [estatusExped])

  const listaEstatus = ['Activo', 'Inactivo', 'Concluido', 'Suspendido']

  const descripcion = useField({ type: 'text', state: '' })

  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const despacho = usuarioC?.despacho?._id
      const usuario = usuarioC?._id

      const url = `/expedientes/${despacho}/${usuario}/${_id}/estatus`

      const payload = {
        estatus,
        descripcion: descripcion.value
      }

      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).patch(url, payload)

      const { message } = data

      if (message) {
        Swal.fire({
          icon: 'success',
          title: message
        })
      }

      setLoading(false)
      handleClose()

      setEstatus('Activo')
      descripcion.onReset()

      handleEstatus(estatus)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el estatus',
        text: error.message
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>
        Cambiar estatus
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <FormControl fullWidth sx={sx}>
            <InputLabel id='select-estatus'>Estatus *</InputLabel>
            <Select
              labelId='select-estatus'
              value={estatus}
              label='Estatus'
              onChange={e => setEstatus(e.target.value)}
              required
            >
              {listaEstatus.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

const ModalNoExpediente = ({ _id, open, handleClose, handleNoExpediente, usuarioC, noExpedienteE = '' }) => {
  const noExpediente = useField({ type: 'text', state: noExpedienteE })
  const descripcion = useField({ type: 'text', state: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    noExpediente.onSetValue(noExpedienteE)
  }, [noExpedienteE])

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const despacho = usuarioC?.despacho?._id
      const usuario = usuarioC?._id

      const url = `/expedientes/${despacho}/${usuario}/${_id}/numero`

      const payload = {
        numeroExpediente: noExpediente.value,
        descripcion: descripcion.value
      }

      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).patch(url, payload)

      const { message } = data

      if (message) {
        Swal.fire({
          icon: 'success',
          title: message
        })
      }

      setLoading(false)
      handleClose()

      noExpediente.onReset()
      descripcion.onReset()

      handleNoExpediente(noExpediente.value)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el número de expediente',
        text: error.message
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>
        Cambiar número de expediente
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField fullWidth label='No. Expediente' {...noExpediente} sx={{ mb: 2 }} />

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

const ModalTitulo = ({ _id, open, handleClose, handleTitulo, usuarioC, tituloExp = '' }) => {
  const titulo = useField({ type: 'text', state: tituloExp })
  const descripcion = useField({ type: 'text', state: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    titulo.onSetValue(tituloExp)
  }, [tituloExp])

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const despacho = usuarioC?.despacho?._id
      const usuario = usuarioC?._id

      const url = `/expedientes/${despacho}/${usuario}/${_id}/titulo`

      const payload = {
        titulo: titulo.value,
        descripcion: descripcion.value
      }

      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).patch(url, payload)

      const { message } = data

      if (message) {
        Swal.fire({
          icon: 'success',
          title: message
        })
      }

      setLoading(false)
      handleClose()

      titulo.onReset()
      descripcion.onReset()

      handleTitulo(titulo.value)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el estatus',
        text: error.message
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>
        Cambiar título
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField fullWidth label='Titulo' {...titulo} sx={{ mb: 2 }} />

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

const ModalJuicio = ({ _id, open, handleClose, handleJuicio, usuarioC, juicioExp = '' }) => {
  const titulo = useField({ type: 'text', state: juicioExp })
  const descripcion = useField({ type: 'text', state: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    titulo.onSetValue(juicioExp)
  }, [juicioExp])

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const despacho = usuarioC?.despacho?._id
      const usuario = usuarioC?._id

      const url = `/expedientes/${despacho}/${usuario}/${_id}/juicio`

      const payload = {
        nombreJuicio: titulo.value,
        descripcion: descripcion.value
      }

      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).patch(url, payload)

      const { message } = data

      if (message) {
        Swal.fire({
          icon: 'success',
          title: message
        })
      }

      setLoading(false)
      handleClose()

      titulo.onReset()
      descripcion.onReset()

      handleJuicio(titulo.value)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el estatus',
        text: error.message
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>
        Cambiar juicio
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField fullWidth label='Juicio' {...titulo} sx={{ mb: 2 }} />

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

const IconModule = ({ iconModule, title }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Box display='flex' justifyContent='center' mb={2}>
        {iconModule}
      </Box>
      <Box display='flex' justifyContent='center' mb={2}>
        <Typography variant='title2' component='h4'>
          {title}
        </Typography>
      </Box>
      <Divider
        sx={{
          backgroundColor: 'primary.main',
          height: 1.3, // Ajustar el grosor del Divider
          mt: 2, // Ajustar el margen superior
          mb: 2 // Ajustar el margen inferior
        }}
      >
      </Divider>
    </Box>
  )
}

const getUsuariosSinPaginate = async (despacho, expediente, usuario) => {
  if (!despacho) return []
  if (!expediente) return []
  if (!usuario) return []

  try {
    const { data } = await apiAuth().get(`/expedientes-usuarios/${despacho}/${expediente}/sin-paginar?sin=${usuario}`)
    return data?.usuarios
  } catch (error) {
    return []
  }
}
