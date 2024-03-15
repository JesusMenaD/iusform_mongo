/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Paper, Backdrop, CircularProgress, Button, Box, Alert
  , FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import Swal from 'sweetalert2'
const title = 'Crear usuario'
const sx = { mb: 4 }

const CreateUsuario = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id

  const back = `../${usuarioC.clave}/usuarios`

  const [loadingGlobal, setLoadingGlobal] = useState(false)
  // Estado para controlar la apertura y el cierre del modal

  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname.split('/').slice(0, 3).join('/')
  const clave = usuarioC?.clave

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

      const url = `/usuario/${despacho}`

      const data = {
        email: correo,
        telefono,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        tipoUsuario,
        clave
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).post(url, data)

      navigate(`/${usuarioC?.clave}/usuarios`)
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
  const to = usuarioC?.clave ? `/${usuarioC?.clave}/usuarios` : '/'

  const [nombre, setNombre] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')

  const [tipoUsuarios, setTipoUsuarios] = useState([])
  const [tipoUsuario, setTipoUsuario] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/tipo-usuario/${despacho}/sin-paginar`
        const { data } = await apiAuth().get(url)
        setTipoUsuarios(data)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [])

  return (

    <>
      <ButtonAction child={[{ title: 'Usuarios', to }]} actual={title} back={back} />

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
              label="Nombre"
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
              label="Apellido paterno"
              fullWidth
              sx={sx}
              placeholder='Apellido paterno'
              title='Apellido paterno'
              type='text'
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />
            <TextField
              label="Apellido materno"
              fullWidth
              sx={sx}
              placeholder='Apellido materno'
              title='Apellido materno'
              type='text'
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
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
              required
              onChange={(e) => setCorreo(e.target.value)}
            />
            <FormControl fullWidth sx={sx}>
              <InputLabel id="tipo-usuario">Tipo Usuario</InputLabel>
              <Select
                labelId="tipo-usuario"
                value={tipoUsuario}
                label="Tipo usuario"
                onChange={(e) => setTipoUsuario(e.target.value)}
                required
              >
                <MenuItem value=''>Selecciona un tipo de usuario</MenuItem>
                {
                  tipoUsuarios.map((tipo) => (
                    <MenuItem key={tipo._id} value={tipo._id}>{tipo.nombre}</MenuItem>
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

export default memo(CreateUsuario)
