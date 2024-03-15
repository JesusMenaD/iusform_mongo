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
const title = 'Crear Declaración Fiscal'
const sx = { mb: 4 }

const CreateDeclaraciones = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id

  const back = `../${usuarioC.clave}/declaraciones-fiscales`

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

      const url = `/declaraciones-fiscales/${despacho}`

      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('tipo', tipo)
      formData.append('estatus', estatus)
      formData.append('archivo', archivo)
      formData.append('creadoPor', usuarioC._id)

      await apiAuth({
        'Content-Type': 'multipart/form-data'
      }).post(url, formData)

      navigate(`/${usuarioC?.clave}/declaraciones-fiscales`)
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
  const to = usuarioC?.clave ? `/${usuarioC?.clave}/declaraciones-fiscales` : '/'

  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('Mensual')

  const [estatus, setEstatus] = useState('Pendiente')
  const [archivo, setArchivo] = useState(null)

  return (

    <>
      <ButtonAction child={[{
        title: 'Declaraciones Fiscales',
        to
      }]} actual={title} back={back} />

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
              placeholder='Nombre de la declaración fiscal'
              required
              title='Nombre de la declaración fiscal'
              type='text'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <TextField
              sx={sx}
              fullWidth
              type='file'
              name='archivo'
              onChange={(r) => {
                setArchivo(r.target.files[0])
              }}
            />

            <FormControl fullWidth sx={sx}>
              <InputLabel id="tipo">Tipo</InputLabel>
              <Select
                labelId="tipo"
                value={tipo}
                label="Tipo"
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <MenuItem value='Mensual'>
                  Mensual
                </MenuItem>
                <MenuItem value='Anual'>
                  Anual
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={sx}>
              <InputLabel id="estatus">Estatus</InputLabel>
              <Select
                labelId="estatus"
                value={estatus}
                label="Estatus"
                onChange={(e) => setEstatus(e.target.value)}
                required
              >
                <MenuItem value='Pendiente'>
                  Pendiente
                </MenuItem>
                <MenuItem value='Aceptado'>
                  Aceptado
                </MenuItem>
                <MenuItem value='Rechazado'>
                  Rechazado
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

export default memo(CreateDeclaraciones)
