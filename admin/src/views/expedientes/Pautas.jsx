/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  Checkbox,
  FormGroup,
  FormControlLabel,
  ListItemText,
  Avatar,
  DialogActions, IconButton, Chip, Button, FormControl, InputLabel, Select, MenuItem, Box, LinearProgress
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { apiAuth } from '../../api'
import TableIUS from '../../components/TableIUS'
import Swal from 'sweetalert2'
import { Plus } from 'react-feather'
const sx = {
  mb: 2
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const MultipleSelectCheckmarks = ({ despacho, expediente, handUsuarioSeleccionado }) => {
  const [usuariosSinAsignar, setUsuariosSinAsignar] = useState([])
  const [usuarioSeleccionados, setUsuarioSeleccionados] = useState([])

  useEffect(() => {
    getUsuariosSinAsignar(despacho, expediente).then(data => {
      setUsuariosSinAsignar(data)
    }).catch(error => {
      console.error('Error fetching data:', error)
    })
  }, [])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event
    setUsuarioSeleccionados(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl sx={sx} fullWidth >
        <InputLabel id="demo-multiple-checkbox-label">Selecciona los usuarios que deseas agregar al expediente *</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          placeholder='Selecciona los usuarios que deseas agregar al expediente'
          value={usuarioSeleccionados}
          onChange={handleChange}
          required
          input={<OutlinedInput label="Usuarios" />}
          renderValue={(selected) =>
            // Muestra solo los nombres de los usuarios seleccionados
            selected.map((userId) => {
              const selectedUser = usuariosSinAsignar.find((usuario) => usuario._id === userId)
              return `${selectedUser.nombre} ${selectedUser.apellidoPaterno}`
            }).join(', ')
          }
          MenuProps={MenuProps}
          onClose={() => handUsuarioSeleccionado(usuarioSeleccionados)} // Envia los usuarios seleccionados
        >
          {usuariosSinAsignar.map((usuario) => (
            <MenuItem key={usuario._id} value={usuario._id}>
              <Checkbox checked={usuarioSeleccionados.indexOf(usuario._id) > -1} />
              <ListItemText primary={`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno} - ${usuario.email}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const Pautas = ({ despacho, usuario, _id, cargas = 0, permisos = null }) => {
  console.log(permisos?.rol)
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [cargaAsignada, setCargaAsignada] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    getUsuarios(despacho, _id, currentPage).then(data => {
      setUsuarios(data.docs)
      const { totalDocs, limit } = data
      setTotalDocs(totalDocs)
      setLimit(limit)
      setIsLoading(false)
    })
  }, [currentPage, cargas, cargaAsignada])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const columns = [
    {
      id: 'usuario.foto',
      label: 'Foto',
      render: (row) => {
        return <Avatar alt={row.usuario.nombre} src={row.usuario.foto} />
      }
    },
    {
      id: 'usuario.nombre',
      label: 'Usuario',
      render: (row) => {
        if (row.usuario._id === usuario) { return <Chip label={'Tú'} color='primary' /> }
        return `${row.usuario.nombre} ${row.usuario.apellidoPaterno} ${row.usuario.apellidoMaterno}`
      }
    },
    {
      id: 'usuario.email',
      label: 'Correo',
      render: (row) => {
        return <a href={`mailto:${row.usuario.email}`}>{row.usuario.email}</a>
      }
    },
    {
      id: 'rol',
      label: 'Rol',
      render: (row) => {
        if (row.rol === 'Creador') { return <Chip label={row.rol} color='primary' /> }
        if (row.rol === 'Editor') { return <Chip label={row.rol} color='secondary' /> }
        return <Chip label={row.rol} color='success' />
      }
    }, {
      id: 'notificaciones',
      label: 'Notificar',
      render: (row) => {
        if (row.notificaciones) { return <Chip label='Si' color='primary' /> }
        return <Chip label='No' color='secondary' />
      }
    },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => {
        if (row.rol === 'Creador') return null

        if (permisos?.rol === 'Lector') return null

        return (

          <IconButton IconButton onClick={() => {
            const url = `/expedientes-usuarios/${row._id}`

            if (row.rol === 'Creador') {
              Swal.fire({
                title: 'No puedes eliminar al creador',
                icon: 'error'
              })
              return
            }

            setIsLoading(true)

            apiAuth().delete(url).then(() => {
              getUsuarios(despacho, _id, currentPage).then(data => {
                setUsuarios(data.docs)
                const { totalDocs, limit } = data
                setTotalDocs(totalDocs)
                setLimit(limit)
                setIsLoading(false)
              }).finally(() => {
                setIsLoading(false)
              })
            }).finally(() => {
              setIsLoading(false)
            })
          }}>
            <DeleteIcon color='error' />
          </IconButton >
        )
      }
    }
  ]

  return (
    <>
      {permisos?.rol === 'Creador' || permisos?.rol === 'Editor'
        ? <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Button
            variant='contained'
            title='Agregar usuario al expediente'
            sx={{
              backgroundColor: '#c89211',
              color: 'white',
              mb: 2
            }}

            onClick={() => setOpenDialog(true)}
          >
            &nbsp;
            <Plus />
          </Button>
        </Box >
        : null
      }

      {
        isLoading
          ? <LinearProgress />
          : <TableIUS
            columns={columns}
            rows={usuarios}
            onPageChange={handlePageChange}
            totalRows={totalDocs}
            limit={limit}
            currentPage={currentPage}
            isHandling
          />
      }
      <DialogCrearUsuario _id={_id} open={openDialog} handleClose={() => setOpenDialog(false)} handleUsuario={() => {
        setCargaAsignada(cargaAsignada + 1)
      }} despacho={despacho} expediente={_id} />

    </>
  )
}

const DialogCrearUsuario = ({ _id, open, handleClose, despacho, expediente, handleUsuario }) => {
  const [loading, setLoading] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [rol, setRol] = useState('Editor')
  const [notificar, setNotificar] = useState(true)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const url = `/expedientes-usuarios/${despacho}/${expediente}`
      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).post(url,
        {
          usuarios,
          rol,
          notificaciones: notificar
        })

      if (data.usuariosExpedientes) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Usuario agregado',
        //   text: 'El usuario ha sido agregado al expediente'
        // })
        setLoading(false)
        handleUsuario()
        handleClose()
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el estatus',
        text: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return <>
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        Agregar usuario al expediente
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <MultipleSelectCheckmarks despacho={despacho} expediente={expediente} handUsuarioSeleccionado={(e) => { setUsuarios(e) }} />
          <FormControl fullWidth>

            <InputLabel id='select-rol'>Rol *</InputLabel>
            <Select
              labelId='select-rol'
              value={rol}
              label='Rol *'
              sx={sx}
              onChange={e => setRol(e.target.value)}
              required >
              <MenuItem value='Editor'>
                Editor
              </MenuItem>
              <MenuItem value='Lector'>
                Lector
              </MenuItem>
            </Select>

          </FormControl>
          <FormGroup>
            <FormControlLabel value={notificar}
              onChange={e => setNotificar(e.target.checked)}
              control={<Checkbox value={notificar} />} label="Notificar los movimientos del expediente" />
          </FormGroup>
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
  </>
}
export default memo(Pautas)

const getUsuarios = async (despacho, expediente, page) => {
  page = page + 1
  const url = `/expedientes-usuarios/${despacho}/${expediente}?page=${page}`
  const { data } = await apiAuth().get(url)
  return data.usuarios
}

const getUsuariosSinAsignar = async (despacho, expediente) => {
  const url = `/expedientes-usuarios/${despacho}/${expediente}/sin-asignar`
  const { data } = await apiAuth().get(url)
  return data.usuarios
}
