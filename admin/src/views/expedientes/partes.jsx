/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions, IconButton, Button, FormControl, InputLabel, Select, MenuItem, Box, LinearProgress
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { apiAuth } from '../../api'
import TableIUS from '../../components/TableIUS'
import Swal from 'sweetalert2'
import { Plus, Edit } from 'react-feather'
import { useField } from '../../hooks/useField'
const sx = {
  mb: 2
}

const PartesInvolucradas = ({ despacho, usuario, _id, cargas = 0, permisos = null }) => {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [cargaAsignada, setCargaAsignada] = useState(0)

  const [open, setOpen] = useState(false)
  const [parteEdit, setParteEdit] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getPartes(despacho, _id, currentPage).then(data => {
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
      id: 'tipo',
      label: 'Tipo',
      render: (row) => {
        return row.tipo
      }
    },
    {
      id: 'sujeto',
      label: 'Sujeto',
      render: (row) => {
        return row.sujeto
      }
    },
    {
      id: 'nombre',
      label: 'Nombre',
      render: (row) => {
        return row.nombre
      }
    },
    {
      id: 'telefono',
      label: 'Teléfono',
      render: (row) => {
        return <a href={`tel:${row.telefono}`}>{row.telefono}</a>
      }
    },
    {
      id: 'Correo',
      label: 'Correo',
      render: (row) => {
        return <a href={`mailto:${row.correo}`}>{row.correo}</a>
      }
    }, {
      id: 'comentario',
      label: 'Comentario',
      render: (row) => {
        return row.comentario
      }
    },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => {
        return (
          <>

            {permisos?.rol === 'Creador' || permisos?.rol === 'Editor'
              ? <>
                <IconButton IconButton onClick={() => {
                  const url = `/expedientes-partes/${row._id}`

                  setIsLoading(true)

                  apiAuth().delete(url).then(() => {
                    getPartes(despacho, _id, currentPage).then(data => {
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

                <IconButton onClick={() => {
                  setParteEdit(row)
                  setOpen(true)
                }}>
                  <Edit style={{
                    color: '#c89211'
                  }} />
                </IconButton>
              </>
              : null}

          </>

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
      <DialogCratePartes _id={_id} open={openDialog} handleClose={() => setOpenDialog(false)} handlePartes={() => {
        setCargaAsignada(cargaAsignada + 1)
      }} despacho={despacho} expediente={_id} />

      <DialogEditPartes open={open} setOpen={setOpen} parteEdit={parteEdit} handelEdit={() => {
        setCargaAsignada(cargaAsignada + 1)
      }}
      />

    </>
  )
}

const DialogEditPartes = ({ open, setOpen, parteEdit, handelEdit }) => {
  const [parte, setParte] = useState(parteEdit)

  useEffect(() => {
    setParte(parteEdit)
  }, [parteEdit])

  const handelSubmit = async (e) => {
    e.preventDefault()
    setOpen(false)
    const url = `/expedientes-partes/${parte._id}`
    try {
      await apiAuth({ 'Content-Type': 'application/json' }).patch(url, parte)

      handelEdit()
    } catch (error) {
      console.error('Error fetching data:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar parte',
        text: error.message
      })
    }
  }

  return <>
    <Box
      component='form'
      autoComplete='off' onSubmit={handelSubmit}>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          Editar parte involucrada
        </DialogTitle>
        <Box sx={{ py: 2 }} component='form'
          autoComplete='off' onSubmit={e => e.preventDefault()}>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id='select-rol'>Tipo *</InputLabel>
              <Select
                labelId='select-rol'
                value={parte?.tipo}
                label='Rol *'
                sx={sx}
                onChange={e => setParte({ ...parte, tipo: e.target.value })}
                required >
                <MenuItem value='Demandado'>
                  Demandado
                </MenuItem>
                <MenuItem value='Demandante'>
                  Demandante
                </MenuItem>
              </Select>
            </FormControl>
            <TextField label='Nombre' fullWidth required sx={sx} value={parte?.nombre}
              onChange={e => setParte({ ...parte, nombre: e.target.value })}
            />
            <TextField label='Sujeto' fullWidth sx={sx} value={parte?.sujeto}
              onChange={e => setParte({ ...parte, sujeto: e.target.value })} />
            <TextField label='Correo' fullWidth sx={sx} value={parte?.correo}
              onChange={e => setParte({ ...parte, correo: e.target.value })} />
            <TextField label='Teléfono' fullWidth sx={sx} value={parte.telefono}
              onChange={e => setParte({ ...parte, telefono: e.target.value })}
            />
            <TextField multiline label='Comentario' fullWidth sx={sx} minRows={3} value={parte?.comentario}
              onChange={e => setParte({ ...parte, comentario: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant='outlined'>
              Cancelar
            </Button>
            <Button type='submit' variant='contained'>
              Guardar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>

  </>
}

const DialogCratePartes = ({ _id, open, handleClose, despacho, expediente, handlePartes }) => {
  const [loading, setLoading] = useState(false)

  const [tipo, setTipo] = useState('Demandado')
  const nombre = useField({ type: 'text', state: '' })
  const sujeto = useField({ type: 'text', state: '' })
  const correo = useField({ type: 'email', state: '' })
  const telefono = useField({ type: 'text', state: '' })
  const comentario = useField({ type: 'text', state: '' })

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const url = `/expedientes-partes/${despacho}/${expediente}`
      const { data } = await apiAuth({ 'Content-Type': 'application/json' }).post(url,
        {
          tipo,
          nombre: nombre.value,
          sujeto: sujeto.value,
          correo: correo.value,
          telefono: telefono.value,
          comentario: comentario.value
        })

      if (data.newPartes) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Usuario agregado',
        //   text: 'El usuario ha sido agregado al expediente'
        // })
        setLoading(false)
        handlePartes()
        handleClose()
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar usuario',
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
            <InputLabel id='select-rol'>Tipo *</InputLabel>
            <Select
              labelId='select-rol'
              value={tipo}
              label='Rol *'
              sx={sx}
              onChange={e => setTipo(e.target.value)}
              required >
              <MenuItem value='Demandado'>
                Demandado
              </MenuItem>
              <MenuItem value='Demandante'>
                Demandante
              </MenuItem>
            </Select>
          </FormControl>
          <TextField {...nombre} label='Nombre' fullWidth required sx={sx} />
          <TextField {...sujeto} label='Sujeto' fullWidth sx={sx} />
          <TextField {...correo} label='Correo' fullWidth sx={sx} />
          <TextField {...telefono} label='Teléfono' fullWidth sx={sx} />
          <TextField multiline {...comentario} label='Comentario' fullWidth sx={sx} minRows={3} />
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
export default memo(PartesInvolucradas)

const getPartes = async (despacho, expediente, page) => {
  page = page + 1
  const url = `/expedientes-partes/${despacho}/${expediente}?page=${page}`
  const { data } = await apiAuth().get(url)
  return data.partes
}
