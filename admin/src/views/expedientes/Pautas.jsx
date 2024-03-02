/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Avatar,
  DialogActions, IconButton, Chip, Button, FormControl, InputLabel, Select, MenuItem, Box, LinearProgress
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { apiAuth } from '../../api'
import { Link } from 'react-router-dom'
import TableIUS from '../../components/TableIUS'
import Swal from 'sweetalert2'
import { Plus } from 'react-feather'
const sx = {
  mb: 2
}

const Pautas = ({ despacho, usuario, _id, cargas = 0, permisos = null, clave }) => {
  const [pautas, setPautas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [cargaAsignada, setCargaAsignada] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    getPautas(despacho, _id, currentPage).then(data => {
      setPautas(data.docs)
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
    // {
    //   id: 'usuario.foto',
    //   label: 'Foto',
    //   render: (row) => {
    //     return <Avatar alt={row.usuario.nombre} src={row.usuario.foto} />
    //   }
    // },
    {
      id: 'creadoPor.nombre',
      label: 'Creado por',
      render: (row) => {
        if (row?.creadoPor._id === usuario) { return <Chip label={'Tú'} color='primary' /> }
        return `${row?.creadoPor.nombre} ${row?.creadoPor.apellidoPaterno} ${row?.creadoPor.apellidoMaterno}`
      }
    },
    {
      id: 'nombre',
      label: 'Pauta',
      render: (row) => {
        return <Link to={`../${clave}/pautas/${row._id}`}>{row.nombre}</Link>
      }
    },
    {
      id: 'fechaCreacion',
      label: 'Fecha de creación',
      render: (row) => {
        return new Date(row.fechaCreacion).toLocaleString('es-MX', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })
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
              getPautas(despacho, _id, currentPage).then(data => {
                setPautas(data.docs)
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
            rows={pautas}
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

const getPautas = async (despacho, expediente, page) => {
  page = page + 1
  const url = `/expedientes-pautas/${despacho}/${expediente}?page=${page}`
  const { data } = await apiAuth().get(url)
  return data.pautas
}
