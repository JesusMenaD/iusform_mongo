/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Paper, Backdrop, CircularProgress, Button, Box, Alert
  , FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import Swal from 'sweetalert2'
const title = 'Editar cuenta bancaria'
const sx = { mb: 4 }

const EditarCuentaBancaria = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const { _id } = useParams()

  const back = `../${usuarioC.clave}/cuentas-bancarias`

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

      const url = `/cuentas-bancarias/${_id}`

      const data = {
        nombre,
        banco,
        numeroCuenta,
        clave: claveIn
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).patch(url, data)

      navigate(`/${usuarioC?.clave}/cuentas-bancarias`)
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
  const to = usuarioC?.clave ? `/${usuarioC?.clave}/cuentas-bancarias` : '/'

  const [nombre, setNombre] = useState('')
  const [saldoInicial, setSaldoInicial] = useState(0)
  const [banco, setBanco] = useState('')
  const [numeroCuenta, setNumeroCuenta] = useState('')
  const [claveIn, setClaveIn] = useState('')

  const [bancos, setBancos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = '/bancos'
        const { data } = await apiAuth().get(url)
        setBancos(data)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()

    const fetchDatabanco = async () => {
      try {
        const url = `/cuentas-bancarias/${_id}/by-id`
        const { data } = await apiAuth().get(url)
        const fetch = data.cuenta
        console.log('fetch', fetch)

        setBanco(fetch.banco)
        setNombre(fetch.nombre)
        setNumeroCuenta(fetch.numeroCuenta)
        setSaldoInicial(fetch.saldoInicial)
        setClaveIn(fetch.clave)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchDatabanco()
  }, [])

  return (

    <>
      <ButtonAction child={[{ title: 'Cuentas bancarias', to }]} actual={title} back={back} />

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

            <TextField
              label="Nombre de la cuenta"
              fullWidth
              sx={sx}
              required
              title='Nombre de la cuenta'
              type='text'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <TextField
              label="Número de cuenta"
              fullWidth
              sx={sx}
              title='Número de cuenta'
              type='text'
              value={numeroCuenta}
              onChange={(e) => setNumeroCuenta(e.target.value)}
            />

            <TextField
              label="Saldo inicial"
              fullWidth
              sx={sx}
              required
              title='Saldo inicial'
              type='number'
              value={saldoInicial}
              disabled
              InputProps={{
                inputComponent: 'input',
                endAdornment: <span>{saldoInicial ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'MXN' }).format(saldoInicial) : ''}</span>
              }}
              onChange={(e) => setSaldoInicial(e.target.value)}
            />

            <TextField
              label="Clave"
              fullWidth
              sx={sx}
              title='Clave'
              type='text'
              value={claveIn}
              onChange={(e) => setClaveIn(e.target.value)}
            />

            <FormControl fullWidth sx={sx}
              required
            >
              <InputLabel id="bancos">
                Banco
              </InputLabel>
              <Select
                labelId="bancos"
                value={banco}
                label="Banco"
                onChange={(e) => setBanco(e.target.value)}
              >
                <MenuItem value=''>Selecciona un banco</MenuItem>
                {
                  bancos.map((tipo) => (
                    <MenuItem key={tipo._id} value={tipo._id}>{tipo.banco}</MenuItem>
                  ))
                }
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

export default memo(EditarCuentaBancaria)
