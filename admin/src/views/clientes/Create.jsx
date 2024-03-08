/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Paper, Backdrop, CircularProgress, Button, Box, Alert
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'

const title = 'Crear clientes'
const sx = { mb: 4 }

const CreateCliente = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id
  const usuario = usuarioC?._id

  const back = `../${usuarioC.clave}/clientes`

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

      const url = `/clientes/${despacho}`

      const data = {
        nombre,
        telefono,
        correo,
        observaciones,
        creadoPor: usuario
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).post(url, data)

      navigate(`/${usuarioC?.clave}/clientes`)
    } catch (error) {
      const { response } = error
      console.log('error', response)
    } finally {
      setLoadingGlobal(false)
    }
  }
  const to = usuarioC?.clave ? `/${usuarioC?.clave}/clientes` : '/'

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [observaciones, setObservaciones] = useState('')

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

export default memo(CreateCliente)
