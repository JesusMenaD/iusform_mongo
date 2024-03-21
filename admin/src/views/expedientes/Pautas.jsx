/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions, IconButton, Chip, Button, Box, LinearProgress
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
      id: 'fechaModificacion',
      label: 'Fecha de modificación',
      render: (row) => {
        if (row?.ultimoMovimiento === null || row?.ultimoMovimiento === undefined) { return 'Sin movimientos' }
        return new Date(row?.ultimoMovimiento)?.toLocaleString('es-MX', {
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
        if (permisos?.rol === 'Creador' || permisos?.rol === 'Editor') {
          return (
            <IconButton IconButton onClick={() => {
              Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  const url = `/expedientes-pautas/${row._id}`

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
                  Swal.fire(
                    'Eliminado',
                    'La pauta ha sido eliminada',
                    'success'
                  )
                }
              })
            }}>
              <DeleteIcon color='error' />
            </IconButton >
          )
        } else {
          return null
        }
      }
    }
  ]

  return (
    <>
      {permisos?.rol === 'Creador' || permisos?.rol === 'Editor'
        ? <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Button
            variant='contained'
            title='Agregar pauta'
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
      <DialogCreatePauta
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        usuario={usuario}
        handleCarga={() => {
          setCargaAsignada(cargaAsignada + 1)
        }}
        despacho={despacho}
        expediente={_id}
      />

    </>
  )
}

const DialogCreatePauta = ({ open, handleClose, despacho, expediente, handleCarga, usuario }) => {
  const [loading, setLoading] = useState(false)
  const [titulo, setTitulo] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = `/expedientes-pautas/${despacho}/${expediente}`
      console.log(url, usuario, titulo)
      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).post(url, {
        usuario,
        nombre: titulo
      })

      if (data._id) {
        setLoading(false)
        handleCarga()
        handleClose()
      }
    } catch (error) {
      console.error('Error fetching data:', error.response)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al crear pauta',
        text: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return <>
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        Agregar Pauta
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}

          <TextField
            label='Nombre de la pauta'
            fullWidth
            required
            sx={sx}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
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
