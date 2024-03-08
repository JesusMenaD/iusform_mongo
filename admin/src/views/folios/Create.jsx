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
const title = 'Crear Folio'
const sx = { mb: 4 }

const CreateFolio = ({ usuarioC = null }) => {
  const navigate = useNavigate()
  const despacho = usuarioC?.despacho?._id

  const back = `../${usuarioC.clave}/folios`

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

      const url = `/expedientes-folios/${despacho}`

      const data = {
        materia,
        clave: claveFolio,
        folio,
        creadoPor: usuarioC._id
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).post(url, data)

      navigate(`/${usuarioC?.clave}/folios`)
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
  const to = usuarioC?.clave ? `/${usuarioC?.clave}/folios` : '/'

  const [folio, setFolio] = useState('')
  const [claveFolio, setClaveFolio] = useState('')
  const [materia, setMateria] = useState('')
  const [materias, setMaterias] = useState([])

  useEffect(() => {
    const getMaterias = async () => {
      try {
        const url = `/expedientes-folios/${despacho}/sin-asignar`
        const { data } = await apiAuth().get(url)
        setMaterias(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getMaterias()
  }, [])

  return (

    <>
      <ButtonAction child={[{ title: 'Folios', to }]} actual={title} back={back} />
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
            <FormControl fullWidth sx={sx}>
              <InputLabel id="materia">Materia</InputLabel>
              <Select
                labelId="materia"
                value={materia}
                label="Tipo usuario"
                onChange={(e) => setMateria(e.target.value)}
                required
              >
                <MenuItem value=''>
                  Seleccione una materia
                </MenuItem>
                {
                  materias.map((tipo) => (
                    <MenuItem key={tipo._id} value={tipo._id}>{tipo.nombre}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <TextField
              label="Clave"
              fullWidth
              sx={sx}
              placeholder='Clave'
              required
              title='Clave'
              type='text'
              value={claveFolio}
              onChange={(e) => setClaveFolio(e.target.value)}
            />
            <TextField
              label="Folio"
              fullWidth
              sx={sx}
              placeholder='Folio'
              title='Folio'
              type='number'
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              required
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

export default memo(CreateFolio)
