/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  TextField, Paper, Button, Box, Typography, FormControl,
  InputLabel, Select, MenuItem, Backdrop, CircularProgress, Alert
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { apiAuth } from '../../api'
import Swal from 'sweetalert2'
import ButtonAction from '../../components/ButtonAction'

const CreateIngreso = ({ usuarioC = null }) => {
  const despacho = usuarioC?.despacho?._id

  const navigate = useNavigate()
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  const [referencia, setReferencia] = useState('')
  const [total, setTotal] = useState(0)
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [observaciones, setObservaciones] = useState('')
  const [conceptoTemp, setConceptoTemp] = useState('')
  const [importeTemp, setImporteTemp] = useState('')
  const [expediente, setExpediente] = useState('')
  const [expedientes, setExpedientes] = useState([])
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState('')

  const handleSave = async (e) => {
    setLoadingGlobal(true)
    try {
      e.preventDefault()

      const url = `/ingresos/${despacho}`
      const referenciaObj = {}

      if (tipo === 'Expediente') {
        referenciaObj.tipo = 'Expediente'
        referenciaObj.expediente = expediente
        referenciaObj.titulo = expedientes.find((exp) => exp._id === expediente).titulo
      }

      if (tipo === 'Otro') {
        referenciaObj.titulo = referencia
        referenciaObj.tipo = 'Ninguno'
      }

      const data = {
        cliente,
        concepto: conceptoTemp,
        importe: importeTemp,
        total,
        fecha,
        observaciones,
        estatus: 'Vigente',
        referencia: referenciaObj,
        cuentaBancaria: cuenta || null
      }

      await apiAuth({
        'Content-Type': 'application/json'
      }).post(url, data)

      navigate(`/${usuarioC?.clave}/ingresos`)
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
  const [tipo, setTipo] = useState('Expediente')

  useEffect(() => {
    const fetchCuentas = async () => {
      const url = `/cuentas-bancarias/${despacho}/sin-paginar`
      const { data } = await apiAuth().get(url)
      setCuentas(data.bancos)
    }

    // const fetchExpedientes = async () => {
    //   const url = `/ingresos/expedientes/${despacho}`
    //   const { data } = await apiAuth().get(url)
    //   setExpedientes(data.expedientes)
    // }

    const fetchClientes = async () => {
      const url = `/ingresos/clientes/${despacho}`
      const { data } = await apiAuth().get(url)
      setClientes(data.clientes)
    }

    // fetchExpedientes()
    fetchCuentas()
    fetchClientes()
  }, [])

  useEffect(() => {
    if (cliente === '') {
      return
    }
    const fetchExpedientes = async () => {
      const url = `/ingresos/expedientes/${despacho}?cliente=${cliente}
      `
      const { data } = await apiAuth().get(url)
      setExpedientes(data.expedientes)
    }

    fetchExpedientes()
  }, [cliente])

  return (
    <>
      <ButtonAction child={[{ title: 'Ingresos', to: `/${usuarioC?.clave}/ingresos` }]} actual="Nuevo ingreso" />
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
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel id="clientes">Cliente</InputLabel>
            <Select
              labelId="clientes"
              value={cliente}
              label="clientes"

              onChange={(e) => setCliente(e.target.value)}
            >
              <MenuItem value=''>
                Seleccione una opción
              </MenuItem>
              {
                clientes.map((cliente) => (
                  <MenuItem key={cliente._id} value={cliente._id}>
                    {cliente.nombre}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel id="tipo">Referencia</InputLabel>
            <Select
              labelId="tipo"
              value={tipo}
              label="Referencia"

              onChange={(e) => setTipo(e.target.value)}
            >
              <MenuItem value="Expediente">
                Expediente
              </MenuItem>
              <MenuItem value="Otro">
                Otro
              </MenuItem>
            </Select>
          </FormControl>

          {
            tipo === 'Expediente' && (

              <>

                <FormControl fullWidth sx={{ mb: 3 }} required>
                  <InputLabel id="expediente">Expediente</InputLabel>
                  <Select
                    labelId="expediente"
                    value={expediente}
                    label="expediente"

                    onChange={(e) => setExpediente(e.target.value)}
                  >
                    <MenuItem value=''>
                      Seleccione una opción
                    </MenuItem>
                    {
                      expedientes.map((cuenta) => (
                        <MenuItem key={cuenta._id} value={cuenta._id}>
                          {cuenta.titulo}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

              </>
            )
          }

          {
            tipo === 'Otro' &&
            <TextField
              label="Referencia"
              fullWidth
              sx={{ mb: 3 }}
              required
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />
          }
          <TextField
            label="Fecha"
            fullWidth
            type="date"
            sx={{ mb: 3 }}
            required
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField
              label="Concepto"
              fullWidth
              sx={{ mr: 2 }}
              required
              value={conceptoTemp}
              onChange={(e) => setConceptoTemp(e.target.value)}
            />

            <TextField
              label="Importe"
              fullWidth
              type="number"
              sx={{ ml: 2 }}
              required
              value={importeTemp}
              onChange={(e) => {
                setTotal(e.target.value)
                return setImporteTemp(e.target.value)
              }}
            />
          </Box>

          <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}</Typography>

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

          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Estatus</InputLabel>
            <Select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
              label="Estatus"
            >
              <MenuItem value="Vigente">Vigente</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </Select>
          </FormControl> */}

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Guardar
          </Button>
        </Box>
      </Paper>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingGlobal}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default CreateIngreso
