/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  Grid,
  Avatar,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Box,
  Button,
  Typography,
  TablePagination,
  LinearProgress
  ,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material'
import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { apiAuth } from '../../api'
import { Plus } from 'react-feather'
import Swal from 'sweetalert2'
import { useField } from '../../hooks/useField'

const formatFechaHora12H = (fecha) => {
  fecha = new Date(fecha)

  // Obtener los componentes de la fecha y hora
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1 // Los meses en JavaScript son 0-indexados, por lo que necesitas sumar 1
  const año = fecha.getFullYear()
  let hora = fecha.getHours()
  const minutos = fecha.getMinutes()

  // Convertir la hora a formato de 12 horas
  const ampm = hora >= 12 ? 'PM' : 'AM'
  hora = hora % 12
  hora = hora || 12 // '0' horas se muestran como '12'

  // Formatear la fecha y hora
  const fechaHoraFormateada = `${dia}/${mes}/${año} ${hora}:${minutos} ${ampm}`

  return fechaHoraFormateada
}

const Notas = ({ despacho, usuario, expediente, permisos }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [notas, setNotas] = useState([])
  const [page, setPage] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setLimit] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [update, setUpdate] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    const getNotasData = async () => {
      setIsLoading(true)
      try {
        const notasData = await getNotas(despacho, expediente, page)
        setNotas(notasData.docs)
        setTotalRows(notasData.totalDocs)
        setLimit(notasData.limit)
        setPage(notasData.page - 1)
      } catch (error) {
        console.error('Error al obtener las notas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getNotasData()
  }, [despacho, expediente, page, update])

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
      <Grid container spacing={3}>

        {isLoading
          ? <LinearProgress />
          : notas.map((nota) => (
            <Grid item xs={12} sm={6} key={nota._id}>
              <Nota nota={nota} permisos={permisos} handleRender={() => setUpdate(update + 1)} usuario={usuario} despacho={despacho} />

            </Grid>
          ))
        }
        {notas.length !== 0 && limit < totalRows && (
          <Grid item xs={12}>
            <TablePagination
              component="div"
              count={totalRows}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              rowsPerPageOptions={[10]}
            />

          </Grid>
        )}
      </Grid>

      <DialogNotas
        _id={expediente}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        despacho={despacho}
        expediente={expediente}
        usuario={usuario}
        handleNota={() => setUpdate(update + 1)}
      />

    </>

  )
}

export default Notas

const TextAcortado = ({ text = '' }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const displayText = expanded ? text : text.slice(0, 100)

  return (
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {displayText}
      {text.length > 100 && (
        <Button onClick={handleExpandClick} size="small">
          {expanded ? 'Leer menos' : 'Leer más'}
        </Button>
      )}
    </Typography>
  )
}

const getNotas = async (despacho, expediente, page = 0) => {
  page = page + 1
  const url = `/expedientes-notas/${despacho}/${expediente}?page=${page}`
  const { data } = await apiAuth().get(url)
  return data.notas
}

const Nota = ({ nota, permisos, handleRender, usuario, despacho }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (nota) {
      console.log(nota.comentario)
    }
  }, [nota])

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  const subheader = () => {
    return formatFechaHora12H(nota.fecha)
  }

  const handleDelete = async (_id) => {
    try {
      const url = `/expedientes-notas/${_id}`
      await apiAuth().delete(url)
      handleRender()
    } catch (error) {
      console.error('Error al eliminar la nota:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar la nota',
        text: error.message
      })
    }
  }

  return (
    <>
      <Card sx={{
        minHeight: 170,
        boxShadow: 3
      }}>
        <CardHeader
          avatar={<Avatar src={nota?.creadoPor?.foto} />}
          action={
            <>
              {permisos?.rol === 'Editor' || permisos?.rol === 'Creador' && nota?.creadoPor?._id === usuario
                ? <IconButton onClick={handleMenuOpen} aria-label="settings">
                  <MoreVert />
                </IconButton>
                : null
              }
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {
                  permisos?.rol === 'Editor' || permisos?.rol === 'Creador' && nota?.creadoPor?._id === usuario
                    ? <MenuItem onClick={() => {
                      handleMenuClose()
                      handleDelete(nota._id)
                    }}>
                      <Delete />Eliminar
                    </MenuItem>
                    : null
                }
                {
                  permisos?.rol === 'Editor' || permisos?.rol === 'Creador' && nota?.creadoPor?._id === usuario
                    ? <MenuItem onClick={() => {
                      handleMenuClose()
                      setOpen(true)
                    }}>
                      <Edit />Editar
                    </MenuItem>
                    : null
                }
              </Menu>
            </>
          }
          title={`${nota?.creadoPor?.nombre} ${nota?.creadoPor?.apellidoPaterno} ${nota?.creadoPor?.apellidoMaterno}`}
          subheader={subheader() + (nota.editado ? ' (Editado)' : '')}

        />
        <CardContent>
          <TextAcortado text={nota.comentario} />
        </CardContent>
      </Card>

      <DialogNotasEdit
        _id={nota._id}
        open={open}
        handleClose={() => setOpen(false)}
        nota={nota.comentario}
        handleUpdate={(comentario) => {
          nota.comentario = comentario
          nota.fecha = new Date()
          nota.editado = true
          // handleRender()
        }}
      />
    </>

  )
}

const DialogNotas = ({ _id, open, handleClose, despacho, expediente, usuario, handleNota }) => {
  const [loading, setLoading] = useState(false)
  const comentario = useField({ type: 'text', label: '' })

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const url = `/expedientes-notas/${despacho}/${usuario}/${expediente}`
      await apiAuth({ 'Content-Type': 'application/json' }).post(url,
        {
          nota: comentario.value
        })

      setLoading(false)
      handleNota()
      handleClose()
    } catch (error) {
      console.error('Error fetching data:', error.response)
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
        Agregar nota
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField multiline fullWidth label='Comentario' {...comentario} sx={{ mb: 2 }} minRows={3} />
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

const DialogNotasEdit = ({ _id, open, handleClose, nota, handleUpdate }) => {
  const [loading, setLoading] = useState(false)
  const comentario = useField({ type: 'text', state: nota || '' })

  return <>
    <Dialog open={open} onClose={handleClose} fullWidth key={_id}>
      <DialogTitle>
        Agregar nota
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={async (e) => {
          setLoading(true)
          e.preventDefault()

          setLoading(true)

          try {
            const url = `/expedientes-notas/${_id}`
            await apiAuth({ 'Content-Type': 'application/json' }).patch(url,
              {
                nota: comentario.value
              })

            setLoading(false)
            handleUpdate(comentario.value)
          } catch (error) {
            setLoading(false)
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar el estatus',
              text: error.message
            })
          } finally {
            setLoading(false)
          }

          handleClose()
        }}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField multiline fullWidth label='Comentario' {...comentario} sx={{ mb: 2 }} minRows={3} />
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
