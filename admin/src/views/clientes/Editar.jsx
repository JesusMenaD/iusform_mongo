/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Divider,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import Swal from 'sweetalert2'

const title = 'Editar clientes'
const sx = { mb: 4 }

const EditarCliente = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id
  const usuario = usuarioC?._id
  const { _id } = useParams()
  const [, setCliente] = useState(null)

  useEffect(() => {
    const getCliente = async () => {
      setLoadingGlobal(true)
      const url = `/clientes/${despacho}/${_id}`
      const { data } = await apiAuth().get(url)

      setLoadingGlobal(false)
      if (data?.cliente === null) {
        navigate(`/${usuarioC?.clave}/clientes`)
        Swal.fire({
          title: 'Cliente no encontrado',
          text: 'El cliente que buscas no existe',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
      setCliente(data?.cliente)
      setNombre(data?.cliente?.nombre)
      setTelefono(data?.cliente?.telefono)
      setCorreo(data?.cliente?.correo)
      setObservaciones(data?.cliente?.observaciones)
      setDireccion(data?.cliente?.direccion)
      setEstado(data?.cliente?.estado ?? '')
      setRfc(data?.cliente?.rfc)
      setRazonSocial(data?.cliente?.razonSocial)
      setRegimenFiscal(data?.cliente?.regimenFiscal)
      setDomicilioFiscal(data?.cliente?.domicilioFiscal)
      setEstatus(data?.cliente?.estatus)
    }

    const getRegimenFiscal = async () => {
      const url = '/regimen-fiscal'
      const { data } = await apiAuth().get(url)
      setRegimenFiscales(data)
    }

    const getEstados = async () => {
      const url = '/estados'
      const { data } = await apiAuth().get(url)
      setEstados(data)
    }
    getRegimenFiscal()
    getEstados()
    getCliente()
  }, [usuarioC])

  const back = `../${usuarioC.clave}/clientes`

  const [loadingGlobal, setLoadingGlobal] = useState(false)
  // Estado para controlar la apertura y el cierre del modal

  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname.split('/').slice(0, 3).join('/')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const [estados, setEstados] = useState([])
  const [direccion, setDireccion] = useState('')
  const [estado, setEstado] = useState('')
  const [rfc, setRfc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [regimenFiscales, setRegimenFiscales] = useState([])
  const [regimenFiscal, setRegimenFiscal] = useState('')
  const [domicilioFiscal, setDomicilioFiscal] = useState('')
  const [estatus, setEstatus] = useState('Activo')

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        setPermisos(modulo.permisos)
      }
    })
  }, [modulosC])

  const handleSave = async (e) => {
    setLoadingGlobal(true)
    try {
      e.preventDefault()

      const url = `/clientes/${despacho}/${_id}`

      const data = {
        nombre,
        telefono,
        correo,
        direccion,
        estado: estado || null,
        rfc,
        razonSocial,
        regimenFiscal,
        domicilioFiscal,
        observaciones,
        estatus,
        creadoPor: usuario
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).patch(url, data)

      navigate(`/${usuarioC?.clave}/clientes`)
    } catch (error) {
      const { response } = error
      console.log('error', response)
    } finally {
      setLoadingGlobal(false)
    }
  }

  const to = usuarioC?.clave ? `/${usuarioC?.clave}/clientes` : '/'

  return (

    <>
      <ButtonAction child={[{ title: 'Clientes', to }]} actual={title} back={back} />

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
            No tienes permisos para crear clientes
          </Alert>
          : <Box
            component='form'
            autoComplete='off'
            onSubmit={handleSave}
          >

            <Divider sx={{ my: 2 }}>
              <Typography>
                Datos personales
              </Typography>
            </Divider>

            <TextField
              label="Nombre completo"
              fullWidth
              sx={sx}
              placeholder='Nombre completo'
              required
              title='Nombre completo'
              type='text'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              label="Teléfono"
              fullWidth
              sx={sx}
              type='tel'
              placeholder='Teléfono'
              title='Teléfono'
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <TextField
              label="Correo"
              fullWidth
              sx={sx}
              placeholder='Correo'
              title='Correo'
              type='email'
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <TextField
              label="Observaciones"
              fullWidth
              sx={sx}
              placeholder='Observaciones'
              title='Observaciones'
              type='text'
              multiline
              minRows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />

            <Divider sx={{ my: 2 }}>
              <Typography >
                Datos fiscales
              </Typography>
            </Divider>

            <TextField
              label="Dirección"
              fullWidth
              sx={sx}
              placeholder='Dirección'
              title='Dirección'
              type='text'
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />

            <TextField
              label="RFC"
              fullWidth
              sx={sx}
              placeholder='RFC'
              title='RFC'
              type='text'
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
            />
            <TextField
              label="Razón social"
              fullWidth
              sx={sx}
              placeholder='Razón social'
              title='Razón social'
              type='text'
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />

            <FormControl fullWidth sx={sx}>
              <InputLabel id="regimen-fiscal">Regimen Fiscal</InputLabel>
              <Select
                labelId="regimen-fiscal"
                value={regimenFiscal}
                label="Regimen Fiscal"
                onChange={(e) => setRegimenFiscal(e.target.value)}
              >
                <MenuItem value=''>Selecciona un regimen fiscal</MenuItem>
                {regimenFiscales.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Domicilio fiscal"
              fullWidth
              sx={sx}
              placeholder='Domicilio fiscal'
              title='Domicilio fiscal'
              type='text'
              value={domicilioFiscal}
              onChange={(e) => setDomicilioFiscal(e.target.value)}
            />

            <FormControl fullWidth sx={sx}>
              <InputLabel id="estado">Estado</InputLabel>
              <Select
                labelId="estado"
                value={estado}
                label="Estado"
                onChange={(e) => setEstado(e.target.value)}
              >
                <MenuItem value=''>Selecciona un estado</MenuItem>
                {estados.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={sx}>
              <InputLabel id="estatus">Estatus</InputLabel>
              <Select
                labelId="estatus"
                value={estatus}
                label="Estatus"
                onChange={(e) => setEstatus(e.target.value)}
              >
                <MenuItem value='Activo'>Activo</MenuItem>
                <MenuItem value='Inactivo'>Inactivo</MenuItem>
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

export default memo(EditarCliente)
