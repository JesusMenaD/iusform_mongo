/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Dropzone, FileMosaic } from '@files-ui/react'
import {
  TextField, Paper, Button, Box, Typography, FormControl,
  InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent,
  DialogActions, Backdrop, CircularProgress, Alert,
  Tooltip, IconButton
} from '@mui/material'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { apiAuth } from '../../api'
import Swal from 'sweetalert2'
import ButtonAction from '../../components/ButtonAction'
import TableIUS from '../../components/TableIUS'
import { Delete } from '@mui/icons-material'

const EditarGastos = ({ usuarioC = null }) => {
  const despacho = usuarioC?.despacho?._id
  const { _id } = useParams()

  const colums = [
    {
      id: 'concepto',
      label: 'Concepto'
    },
    {
      id: 'importe',
      label: 'Importe',
      render: (row) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(row.importe)
    },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row, index) => (
        <Tooltip title="Eliminar">
          <IconButton
            color='secondary'
            onClick={() => eliminarDetalle(row)}
          >
            <Delete size={20} />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  const columsComprobantes = [
    {
      id: 'archivo',
      label: 'Adjunto',
      render: (row) => (
        //  mostrar si son images
        row.nombre.includes('.pdf') || row.nombre.includes('.png') || row.nombre.includes('.jpg') || row.nombre.includes('.jpeg')
          ? <img
            src={`${row.archivo}`}
            alt={row.nombre}
            style={{ width: 100 }}
          />
          : null
      )
    },
    {
      id: 'nombre',
      label: 'Nombre',
      render: (row) => (
        <a
          href={`${row.archivo}`}
          target="_blank"
          rel="noreferrer"
        >
          {row.nombre}
        </a>
      )
    },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row, index) => (
        <Tooltip title="Eliminar">
          <IconButton
            color='secondary'
            onClick={() => eliminarComprobante(row)}
          >
            <Delete size={20} />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  const eliminarComprobante = (row) => {
    const { _id } = row

    const url = `/gastos/comprobante/${_id}`
    apiAuth().delete(url)
    const nuevosComprobantes = comprobantes.filter((comprobante) => comprobante !== row)
    setComprobantes(nuevosComprobantes)
  }

  const navigate = useNavigate()
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  const [detalles, setDetalles] = useState([])
  const [referencia, setReferencia] = useState('')
  const [total, setTotal] = useState(0)
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [observaciones, setObservaciones] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [conceptoTemp, setConceptoTemp] = useState('')
  const [importeTemp, setImporteTemp] = useState('')
  const [comprobantes, setComprobantes] = useState([])

  useEffect(() => {
    // Calcula el total de gastos cada vez que los detalles cambian.
    const nuevoTotal = detalles.reduce((acc, cur) => acc + Number(cur.importe), 0)
    setTotal(nuevoTotal)
  }, [detalles])

  const agregarDetalle = () => {
    setDetalles([...detalles, { concepto: conceptoTemp, importe: importeTemp }])
    setDialogOpen(false)
    setConceptoTemp('')
    setImporteTemp('')
  }

  const eliminarDetalle = (row) => {
    const nuevosDetalles = detalles.filter((detalle) => detalle !== row)
    setDetalles(nuevosDetalles)
  }

  const handleSave = async (e) => {
    setLoadingGlobal(true)
    try {
      e.preventDefault()

      // const url = `/gastos/${_id}`

      // const data = {
      //   total,
      //   referencia,
      //   creadoPor: usuarioC._id,
      //   estatus,
      //   conceptos: detalles,
      //   cuentaBancaria: cuenta,
      //   fecha,
      //   comentario: observaciones
      // }

      // await apiAuth({
      //   'Content-Type': 'application/json'
      // }).patch(url, data)

      // navigate(`/${usuarioC?.clave}/gastos`)
      const url = `/gastos/${_id}`

      const formData = new FormData()

      formData.append('total', total)
      formData.append('referencia', referencia)
      formData.append('creadoPor', usuarioC._id)
      formData.append('estatus', estatus)
      formData.append('conceptos', JSON.stringify(detalles))
      formData.append('cuentaBancaria', cuenta || null)
      formData.append('fecha', fecha)
      formData.append('comentario', observaciones)
      files.forEach((file) => {
        formData.append('comprobantes', file.file)
      })

      await apiAuth({ 'Content-Type': 'multipart/form-data' }).patch(url, formData)

      navigate(`/${usuarioC?.clave}/gastos`)
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

  const [cuenta, setCuenta] = useState('')
  const [cuentas, setCuentas] = useState([])
  const [estatus, setEstatus] = useState('Vigente')
  const [files, setFiles] = useState([])
  const updateFiles = (files) => {
    setFiles(files)
  }

  useEffect(() => {
    const fetchCuentas = async () => {
      const url = `/cuentas-bancarias/${despacho}/sin-paginar`
      const { data } = await apiAuth().get(url)
      setCuentas(data.bancos)
    }

    const fetchGastos = async () => {
      const url = `/gastos/${_id}/by-id`
      const { data } = await apiAuth().get(url)
      setObservaciones(data.comentario)
      setFecha(data.fecha.split('T')[0])
      setReferencia(data.referencia)
      setDetalles(data.conceptos)
      setTotal(data.total)
      setCuenta(data.cuentaBancaria)
      setEstatus(data.estatus)
      setComprobantes(data.comprobantes)
    }

    fetchCuentas()
    fetchGastos()
  }, [])

  const back = `/${usuarioC?.clave}/gastos`
  return (
    <>
      <ButtonAction child={[{ title: 'Gastos', to: `/${usuarioC?.clave}/gastos` }]} actual="Editar gasto" back={back} />
      <Paper sx={{
        p: { xs: 2, md: 3 },
        m: { xs: -1.2, md: 2 },
        mt: 5,
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: 'white'
      }}>
        <Box component="form" autoComplete="off" onSubmit={handleSave} sx={{ mt: 2 }}>
          {/* Formulario para crear gasto */}
          <TextField
            label="Referencia"
            fullWidth
            sx={{ mb: 3 }}
            required
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
          />
          <TextField
            label="Fecha"
            fullWidth
            type="date"
            sx={{ mb: 3 }}
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <Button onClick={() => setDialogOpen(true)} variant="outlined" sx={{ mb: 3 }}>
            Agregar Detalle
          </Button>
          <TableIUS
            columns={colums}
            rows={detalles}

          />
          <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}</Typography>

          <Dropzone
            style={{ height: 100, width: '100%', marginBottom: 20 }}
            onChange={updateFiles}
            value={files}
            label="Arrastra tus comprobantes aquí o haz clic para seleccionarlos."
            multiple
            subtitle='O selecciona tus archivos desde tu computadora'
            accept='image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip'
            // color='#f2f2f2'
            localization={'ES-es'}
            max={5}
          >
            {files.map((file, index) => (
              <FileMosaic key={index} {...file} preview />
            ))}
          </Dropzone>

          <TableIUS
            columns={columsComprobantes}
            rows={comprobantes}
          />

          <Alert severity='info' sx={{
            mb: 2
          }}>
            Seleccione una cuenta si quiere hacer un registro en bancos
          </Alert>

          {
            cuentas.length === 0
              ? <Alert severity='warning' sx={{ mb: 2 }}>
                No se encontraron cuentas bancarias &nbsp;
                <Link to={`/${usuarioC?.clave}/cuentas-bancarias/crear`}>
                  Crear cuenta bancaria
                </Link>

              </Alert>
              : <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="cuenta">Cuenta</InputLabel>
                <Select
                  labelId="cuenta"
                  value={cuenta}
                  label="Cuenta"

                  onChange={(e) => setCuenta(e.target.value)}
                >
                  <MenuItem value=''>
                    Seleccione una opción
                  </MenuItem>
                  {
                    cuentas.map((cuenta) => (
                      <MenuItem key={cuenta._id} value={cuenta._id}>
                        {cuenta.nombre} - {cuenta.banco.banco}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
          }
          <TextField
            label="Observaciones"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 3 }}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Estatus</InputLabel>
            <Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
              label="Estatus"
            >
              <MenuItem value="Vigente">Vigente</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" type="submit" sx={{ mt: 2 }}
            disabled={detalles.length === 0}
          >
            Guardar
          </Button>
        </Box>
      </Paper>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Agregar Detalle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Concepto"
            fullWidth
            variant="outlined"
            value={conceptoTemp}
            onChange={(e) => setConceptoTemp(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Importe"
            fullWidth
            variant="outlined"
            type="number"
            value={importeTemp}
            onChange={(e) => setImporteTemp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={agregarDetalle}>Agregar</Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingGlobal}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default EditarGastos
