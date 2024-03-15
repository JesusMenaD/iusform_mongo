/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions, IconButton, Button, FormControl, Box, LinearProgress
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { apiAuth } from '../../api'
import TableIUS from '../../components/TableIUS'
import Swal from 'sweetalert2'
import { Plus } from 'react-feather'
const sx = {
  mb: 2
}

const formatFechaHora12H = (fecha) => {
  fecha = new Date(fecha)

  // Obtener los componentes de la fecha y hora
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1 // Los meses en JavaScript son 0-indexados, por lo que necesitas sumar 1
  const año = fecha.getFullYear()
  let hora = fecha.getHours()
  const minutos = fecha.getMinutes()
  const segundos = fecha.getSeconds()

  // Convertir la hora a formato de 12 horas
  const ampm = hora >= 12 ? 'PM' : 'AM'
  hora = hora % 12
  hora = hora || 12 // '0' horas se muestran como '12'

  // Formatear la fecha y hora
  const fechaHoraFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos} ${ampm}`

  return fechaHoraFormateada
}

const Gastos = ({ despacho, usuario, _id, cargas = 0, permisos = null }) => {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [cargaAsignada, setCargaAsignada] = useState(0)

  // const [open, setOpen] = useState(false)
  // const [gastoEdit, setgastoEdit] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getGastos(despacho, _id, currentPage).then(data => {
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
      id: 'fecha',
      label: 'Fecha',
      render: (row) => {
        return formatFechaHora12H(row.fecha)
      }
    },
    {
      id: 'Concepto',
      label: 'Concepto',
      render: (row) => {
        return row.concepto
      }
    },
    {
      id: 'importe',
      label: 'Importe',
      render: (row) => {
        return row.importe.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
      }
    },
    {
      id: 'comprobante',
      label: 'Comprobante',
      render: (row) => {
        if (!row?.adjunto) {
          return ''
        }
        return <a href={row?.adjunto?.archivo} target='_blank' rel='noreferrer'>{
          row?.adjunto?.nombre
        }</a>
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
                  const url = `/expedientes-gastos/${row._id}`

                  setIsLoading(true)

                  apiAuth().delete(url).then(() => {
                    getGastos(despacho, _id, currentPage).then(data => {
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

                {/* <IconButton onClick={() => {
                  setgastoEdit(row)
                  setOpen(true)
                }}>
                  <Edit style={{
                    color: '#c89211'
                  }} />
                </IconButton> */}
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
        ? <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 2 }}>
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
      <DialogCratePartes _id={_id} open={openDialog} usuario={usuario} handleClose={() => setOpenDialog(false)} handlePartes={() => {
        setCargaAsignada(cargaAsignada + 1)
      }} despacho={despacho} expediente={_id} />

      {/* <DialogEditPartes open={open} setOpen={setOpen} gastoEdit={gastoEdit} handelEdit={() => {
        setCargaAsignada(cargaAsignada + 1)
      }}
      /> */}

    </>
  )
}

const DialogCratePartes = ({ _id, open, handleClose, despacho, expediente, handlePartes, usuario }) => {
  const [loading, setLoading] = useState(false)
  const fechaNow = new Date().toISOString().split('T')[0]
  const [concepto, setConcepto] = useState('')
  const [importe, setImporte] = useState('')
  const [fecha, setFecha] = useState(fechaNow)
  const [comprobante, setComprobante] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const url = `/expedientes-gastos/${despacho}/${usuario}/${_id}`

      const formData = new FormData()
      formData.append('concepto', concepto)
      formData.append('importe', importe)
      formData.append('fecha', fecha)
      formData.append('tipo', 'Gasto')
      formData.append('comprobante', comprobante)

      console.log(formData)

      await apiAuth({
        'Content-Type': 'multipart/form-data'
      }).post(url, formData)

      setLoading(false)
      handlePartes()
      handleClose()
      setConcepto('')
      setImporte('')
      setFecha(fechaNow)
      setComprobante(null)
    } catch (error) {
      console.error('Error fetching data:', error.response.data.message)
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
        Agregar gasto
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <TextField label='Concepto' fullWidth required sx={sx} value={concepto} onChange={e => setConcepto(e.target.value)} />
          <TextField label='Importe' fullWidth required sx={sx} value={importe} onChange={e => setImporte(e.target.value)} />
          <TextField label='Fecha' fullWidth required sx={sx} type='date' value={fecha} onChange={e => setFecha(e.target.value)} />
          <FormControl fullWidth sx={sx}>
            <TextField label='Comprobante' fullWidth sx={sx} type='file' onChange={e => setComprobante(e.target.files[0])} />
          </FormControl>
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
export default memo(Gastos)

const getGastos = async (despacho, expediente, page) => {
  page = page + 1
  const url = `/expedientes-gastos/${despacho}/${expediente}?page=${page}&tipo=Gasto`
  console.log(url)
  const { data } = await apiAuth().get(url)
  return data.gastos
}
