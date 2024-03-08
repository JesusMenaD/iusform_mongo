/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField,
  Paper, Backdrop, CircularProgress, Button, Box, Alert
  , FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormControlLabel, FormGroup
} from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import Swal from 'sweetalert2'
import TableIUS from '../../components/TableIUS'
const title = 'Editar usuario'
const sx = { mb: 4 }

const EditarPermisos = ({ usuarioC = null }) => {
  const handleChange = (_id, value) => {
    console.log(_id, value)
  }

  const columns = [
    {
      id: 'nombre',
      label: 'Nombre',
      render: (row) => (
        row?.modulo?.nombre
      )
    },
    {
      id: 'modulos.modulo.nombre',
      label: 'Permisos',
      render: (row) => {
        return (
          <FormGroup sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <FormControlLabel
              control={
                <Checkbox checked={row?.permisos?.read}
                  onChange={(e) => handleChange(row._id, e.target.checked)} />
              }
              label="Leer"
            />
            <FormControlLabel
              control={
                <Checkbox checked={row?.permisos?.create}
                  onChange={handleChange} />
              }
              label="Crear"
            />
            <FormControlLabel
              control={
                <Checkbox checked={row?.permisos?.update} onChange={handleChange} />
              }
              label="Editar"
            />
            <FormControlLabel
              control={
                <Checkbox checked={row?.permisos?.delete} onChange={handleChange} />
              }
              label="Eliminar"
            />
          </FormGroup>
        )
      }
    }
  ]

  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id

  const back = `../${usuarioC.clave}/usuarios`

  const [loadingGlobal, setLoadingGlobal] = useState(false)
  // Estado para controlar la apertura y el cierre del modal

  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname.split('/').slice(0, 3).join('/')
  const { _id } = useParams()

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        setPermisos(modulo.permisos)
      }
    })
  }, [modulosC])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/tipos-usuarios-despachos/${_id}/by-id`
        const { data } = await apiAuth().get(url)
        const tipo = data.tipoUsuario
        setNombre(tipo.nombre)
        setModulos(tipo.modulos)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [])

  const handleSave = async (e) => {
    setLoadingGlobal(true)
    try {
      e.preventDefault()

      const url = `/usuario/${_id}`

      const data = {

      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).patch(url, data)

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
  const [modulos, setModulos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/tipo-usuario/${despacho}/sin-paginar`
        const { data } = await apiAuth().get(url)
        // setTipoUsuarios(data)
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
              placeholder='Nombre'
              required
              title='Nombre'
              type='text'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <TableIUS
              columns={columns}
              rows={modulos}
              onPageChange={() => console.log('cambio de pagina')}
              currentPage={1}
              totalRows={modulos.length}
              limit={20}
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

export default memo(EditarPermisos)
