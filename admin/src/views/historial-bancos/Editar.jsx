/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Paper, Backdrop, CircularProgress, Button, Box, Alert
  , FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import Swal from 'sweetalert2'
const title = 'Crear historial bancos'
const sx = { mb: 4 }

const EditarHistorial = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const { _id } = useParams()
  const despacho = usuarioC?.despacho?._id

  const back = `../${usuarioC.clave}/historial-bancos`

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

  const handleSave = async (e) => {
    setLoadingGlobal(true)
    try {
      e.preventDefault()

      const url = `/historial-bancos/${_id}`

      const data = {
        creadoPor: usuarioC._id,
        estatus,
        concepto,
        importe,
        tipo,
        banco: cuenta || null
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).patch(url, data)

      navigate(`/${usuarioC?.clave}/historial-bancos`)
    } catch (error) {
      const { response } = error
      console.log('error', response)
      if (response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message
        })
      }
    } finally {
      setLoadingGlobal(false)
    }
  }
  const to = usuarioC?.clave ? `/${usuarioC?.clave}/historial-bancos` : '/'

  const [estatus, setEstatus] = useState('')
  const [concepto, setConcepto] = useState('')
  const [importe, setImporte] = useState('')
  const [tipo, setTipo] = useState('')

  const [cuenta, setCuenta] = useState('')
  const [cuentas, setCuentas] = useState([])

  useEffect(() => {
    const fetchCuentas = async () => {
      const url = `/cuentas-bancarias/${despacho}/sin-paginar`
      const { data } = await apiAuth().get(url)
      setCuentas(data.bancos)
    }

    const getMovimiento = async () => {
      const url = `/historial-bancos/${_id}/by-id`
      const { data } = await apiAuth().get(url)
      console.log('data', data)
      setEstatus(data.estatus)
      setConcepto(data.concepto)
      setImporte(data.importe)
      setTipo(data.afectacion)
      setCuenta(data.cuentaBancaria || '')
    }
    getMovimiento()
    fetchCuentas()
  }, [])

  return (

    <>
      <ButtonAction child={[{ title: 'Historial bancos', to }]} actual={title} back={back} />
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
            <FormControl fullWidth sx={sx} required>
              <InputLabel id="tipo">Tipo</InputLabel>
              <Select
                labelId="tipo"
                value={tipo}
                label="Tipo"
                onChange={(e) => setTipo(e.target.value)}
              >
                <MenuItem value=''>
                  Seleccione una opción
                </MenuItem>
                <MenuItem value='Cargo'>
                  Cargo
                </MenuItem>
                <MenuItem value='Abono'>
                  Abono
                </MenuItem>

              </Select>
            </FormControl>
            <TextField
              label="Concepto"
              fullWidth
              sx={sx}
              required
              title='Concepto'
              type='text'
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
            />
            <TextField
              label="Importe"
              fullWidth
              sx={sx}
              title='Importe'
              type='number'
              value={importe}
              InputProps={{
                inputComponent: 'input',
                endAdornment: <span>{importe ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'MXN' }).format(importe) : ''}</span>
              }}
              onChange={(e) => setImporte(e.target.value)}
              required
            />

            <Alert severity='info' sx={{
              mb: 2
            }}>
              Si no selecciona una cuenta, el movimiento se guardará sin ligar a una cuenta
            </Alert>

            {
              cuentas.length === 0
                ? <Alert severity='warning' sx={{ mb: 2 }}>
                  No se encontraron cuentas bancarias &nbsp;
                  <Link to={`/${usuarioC?.clave}/cuentas-bancarias/crear`}>
                    Crear cuenta bancaria
                  </Link>

                </Alert>
                : <FormControl fullWidth sx={sx} >
                  <InputLabel id="cuenta">Cuenta</InputLabel>
                  <Select
                    labelId="cuenta"
                    value={cuenta}
                    label="Cuenta"

                    onChange={(e) => setCuenta(e.target.value)}
                  >
                    <MenuItem value=''>
                      Seleccione una opción
                    </MenuItem>
                    {
                      cuentas.map((cuenta) => (
                        <MenuItem key={cuenta._id} value={cuenta._id}>
                          {cuenta.nombre} - {cuenta.banco.banco}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
            }

            <FormControl fullWidth sx={sx} required>
              <InputLabel id="estatus">Estatus</InputLabel>
              <Select
                labelId="estatus"
                value={estatus}
                label="Estatus"
                onChange={(e) => setEstatus(e.target.value)}
              >
                <MenuItem value=''>
                  Seleccione una opción
                </MenuItem>
                <MenuItem value='Aplicado'>
                  Aplicado
                </MenuItem>
                <MenuItem value='Pendiente'>
                  Pendiente
                </MenuItem>
                <MenuItem value='Cancelado'>
                  Cancelado
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

export default memo(EditarHistorial)
