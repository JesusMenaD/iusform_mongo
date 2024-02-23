/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import { TextField, Chip, Divider, Typography, Backdrop, CircularProgress, Button, FormControl, InputLabel, InputAdornment, Select, Tooltip, MenuItem, Grid, Box, LinearProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Add } from '@mui/icons-material' // Importa el icono de "Add"
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { useField } from '../../hooks/useField'
import Swal from 'sweetalert2'
import AlertExpedientes from '../../components/AlertExpedientes'
import { Calendar, Edit, Users, User, AlignJustify, DollarSign, File, TrendingUp, Briefcase } from 'react-feather'
import Boxes from 'react-feather/dist/icons/box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

const title = 'Editar Expediente'
const sx = { mb: 4 }

const EditarExpediente = ({ usuarioC }) => {
  const location = useLocation()
  const [expediente, setExpediente] = useState(location.state?.expediente || {})

  const fechaActual = new Date().toISOString().split('T')[0]
  const navigate = useNavigate()
  const usuario = usuarioC._id
  const despacho = usuarioC.despacho._id
  const _id = location.pathname.split('/')[3]

  const back = `../${usuarioC.clave}/expedientes` // Regresar a la lista de expedientes

  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname.split('/').slice(0, 3).join('/')
  const [loadingGlobal, setLoadingGlobal] = useState(false)

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
      console.log('data:', data)
      if (!data) {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró el expediente',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        navigate(`/${usuarioC.clave}/expedientes`)
      }
      setExpediente(data)
      setLoadingGlobal(false)
    })
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
  }

  const handleDateClickEvent = (arg) => {
    alert(arg.dateStr)
  }

  const toExpedientes = usuarioC?.clave ? `/${usuarioC?.clave}/expedientes` : '/expedientes'

  const [tabs, settabs] = useState('1')

  const handleChangeTabs = (event, newValue) => {
    settabs(newValue)
  }

  return (
    <>
      <ButtonAction child={[{ title: 'Expedientes', to: toExpedientes }]} actual={title} back={back} />

      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          m: {
            xs: 0,
            sm: 2
          },
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'white',
          width: '100%'
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
                <Grid item xs={12} mt={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography variant='body1' mb={2} >
                        Información general
                      </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" justifyContent="flex-end">
                      <EstatusaRender estatus={expediente?.estatus} /> {/* Renderiza el estatus del expediente */}
                    </Grid>
                    <Grid item xs={12}>
                      <DataLine label='No. Expediente:' value={expediente?.numeroExpediente} />
                      <DataLine label='Titulo:' value={expediente?.titulo} />
                      <DataLine label='Juicio:' value={expediente?.asunto?.nombre} />
                      <DataLine label='Último movimiento:' value={new Date(expediente?.ultimoMovimiento).toLocaleDateString()} />
                      <DataLine label='Folio interno:' value={expediente?.numeroExpedienteInterno} />
                      <DataLine label='Fecha inicio:' value={new Date(expediente?.fechaInicio).toLocaleDateString()} />
                      {expediente?.fechaTermino && <DataLine label='Fecha termino:' value={new Date(expediente?.fechaTermino).toLocaleDateString()} />}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <Typography variant='body1' mb={2} >
                        Información Adicional
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <DataLine label='Cliente:' value={expediente?.cliente?.nombre} />
                      <DataLine label='Procedimiento:' value={expediente?.procedimiento} />
                      <DataLine label='Juzgado:' value={expediente?.juzgado?.nombre} />
                      {expediente?.materia?._id && <DataLine label='Materia:' value={expediente?.materia?.nombre} />}
                      {expediente?.etapaProcesal?._id && <DataLine label='Etapa procesal:' value={expediente?.etapaProcesal?.nombre} />}
                      {/* <DataLine label='Etapa procesal:' value={expediente?.etapaProcesal?.nombre} /> */}
                      {/* <DataLine label='Etapa del proceso:' value={expediente?.numeroExpedienteInterno} /> */}
                    </Grid>

                    <Grid item xs={12}>
                      <Divider variant='fullWidth' sx={{ borderBottomWidth: '1px' }} />
                    </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                  <Box sx={{ width: '100%', overflowX: 'auto' }} >
                    <TabContext value={tabs}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display={'flex'} justifyContent={'center'}>
                        <TabList onChange={handleChangeTabs}>
                          <Tab sx={{ fontSize: '12px' }} label="AGENDA" value="1" icon={<Calendar />} />
                          <Tab sx={{ fontSize: '12px' }} label="USUARIOS" value="2" icon={<User />} />
                          <Tab sx={{ fontSize: '12px' }} label="PARTES INVOLUCRADAS" value="3" icon={<Users />} />
                          <Tab sx={{ fontSize: '12px' }} label="NOTAS" value="4" icon={<AlignJustify />} />
                          <Tab sx={{ fontSize: '12px' }} label="GASTOS E INGRESOS" value="5" icon={<DollarSign />} />
                          <Tab sx={{ fontSize: '12px' }} label="DOCUMENTOS" value="6" icon={<File />} />
                          <Tab sx={{ fontSize: '12px' }} label="MOVIMIENTOS" value="7" icon={<TrendingUp />} />
                          <Tab sx={{ fontSize: '12px' }} label="RECURSOS E INCIDENCIAS" value="8" icon={<Boxes />} />
                          <Tab sx={{ fontSize: '12px' }} label="PAUTAS" value="9" icon={<Briefcase />} />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <Box sx={{ mt: 2 }} width='100%'>
                          <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={[
                              { title: 'event 1', date: '2024-02-04' },
                              { title: 'event 2', date: '2024-02-20' }
                            ]}
                            locale={'es'}
                            direction='ltr'
                            firstDay={1}
                            dateClick={handleDateClickEvent}
                          />
                        </Box>
                      </TabPanel>
                      <TabPanel value="2">Item Two</TabPanel>
                      <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                  </Box>
                </Grid>

              </Grid>
            }
          </Box>
        }

      </Box >
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

export default memo(EditarExpediente)

const getExpediente = async (despacho, usuario, expediente) => {
  try {
    const { data } = await apiAuth().get(`/expedientes/${despacho}/${usuario}/${expediente}`)
    console.log('expe:', data)
    return data?.expediente
  } catch (error) {
    console.error('Error fetching expediente:', error)
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
      {/* <Divider /> */}
    </>
  )
}

const EstatusaRender = ({ estatus, handleDelete = () => { } }) => {
  if (estatus === 'Activo') {
    return <Chip label={estatus} color="primary" deleteIcon={<Edit color="white" size={15} />} onDelete={handleDelete} />
  }
  if (estatus === 'Inactivo') {
    return <Chip label={estatus} color='secondary' deleteIcon={<Edit size={14} color="white" />} onDelete={handleDelete} />
  }
  if (estatus === 'Concluido') {
    return <Chip label={estatus} color='success' deleteIcon={<Edit size={14} color="white" />} onDelete={handleDelete} />
  }
  return <Chip label={estatus} color='warning' deleteIcon={<Edit size={14} color="white" />} onDelete={handleDelete} />
}
