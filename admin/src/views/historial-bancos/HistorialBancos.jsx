/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField, Button,
  FormControl, InputLabel, Select, MenuItem, Grid, Box, Paper, Typography, LinearProgress, Chip, Alert
} from '@mui/material'
import { Search } from '@mui/icons-material'
import ButtonAction from '../../components/ButtonAction'
import TableIUS from '../../components/TableIUS'
import { apiAuth } from '../../api'
import { Link, useLocation } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { UsuarioContext } from '../../context/UsuarioContext'
import CreateExcel from '../../components/CreateExcel'
// import CreateExcel from '../../components/CreateExcel'

const title = 'Historial bancos'
const altasLink = 'crear'
const columns = [
  {
    id: 'concepto',
    label: 'concepto',
    render: (row) => (<Link
      to={{
        pathname: `${row._id}/editar`
      }}
    >{row.concepto}</Link>)
  },
  {
    id: 'cuentaBancaria.nombre',
    label: 'Cuenta bancaria',
    render: (row) => {
      if (row.cuentaBancaria) {
        return `${row.cuentaBancaria.nombre} - ${row.cuentaBancaria?.banco?.banco}`
      }
      return ''
    }
  },
  {
    id: 'fecha',
    label: 'Fecha',
    render: (row) => (new Date(row.fecha).toLocaleDateString())
  },
  {
    id: 'importe', label: 'Importe', render: (row) => `$${row.importe}`
  },
  { id: 'abono', label: 'Abono', render: (row) => row.abono ? `$${row.abono}` : '' },
  { id: 'cargo', label: 'Cargo', render: (row) => row.cargo ? `$${row.cargo}` : '' },
  { id: 'saldo', label: 'Saldo', render: (row) => row.saldo ? `$${row.saldo}` : '' },
  {
    id: 'estatus',
    label: 'Estatus',
    render: (row) => {
      // enum: ['Aplicado', 'Pendiente', 'Cancelado'],
      if (row.estatus === 'Aplicado') {
        return <Chip label={row.estatus} color='primary' />
      }
      if (row.estatus === 'Pendiente') {
        return <Chip label={row.estatus} color='warning' />
      }

      return <Chip label={row.estatus} color='error' />
    }
  }

]

const HistorialBancos = () => {
  const [usuarioC] = useContext(UsuarioContext)
  const despacho = usuarioC?.despacho?._id
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [expedientes, setExpedientes] = useState([])
  const [totalDocs, setTotalDocs] = useState(1)
  const [limit, setTotal] = useState(10)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname
  const [cuenta, setCuenta] = useState('')
  const [cuentas, setCuentas] = useState([])

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        console.log()
        setPermisos(modulo.permisos)
      }

      modulo.child.forEach(submodulo => {
        console.log('submodulo', submodulo.enlace, locationPath)
        if (submodulo.enlace === locationPath) {
          setPermisos(submodulo.permisos)
        }
      })
    })
  }, [modulosC])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setCurrentPage(0)
    // Cancela el timeout anterior para evitar múltiples búsquedas rápidas
    clearTimeout(searchTimeout)
    // Configura un nuevo timeout para realizar la búsqueda después de 500ms
    setSearchTimeout(setTimeout(fetchData, 500))
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  useEffect(() => {
    // Limpia el timeout cuando el componente se desmonta o cuando search/status cambian
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [search, status])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await getDataFunction(despacho, search, status, currentPage, cuenta)
      setExpedientes(result.docs)
      setTotalDocs(result.totalDocs)
      setTotal(result.limit)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchCuentas = async () => {
      const url = `/cuentas-bancarias/${despacho}/sin-paginar`
      const { data } = await apiAuth().get(url)
      setCuentas(data.bancos)
    }
    fetchCuentas()
  }, [])

  return (
    <>

      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <ButtonAction actual={title} create={altasLink} handleRefresh={() => fetchData()} permisos={permisos} />
        </Grid>
        {
          permisos?.read === false
            ? <Grid item xs={12}>
              <Alert severity='error'>No tienes permisos para ver esta sección</Alert>
            </Grid>
            : <>
              <Grid item xs={12}>
                <Box px={2}>
                  <Paper elevation={0} sx={{ p: 3, py: 5 }}>
                    <Typography variant='subtitle1' mb={2} component='h2'>
                      Selecciona un criterio de búsqueda
                    </Typography>
                    <Box onSubmit={handleFilter} as='form' component='form'>
                      <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField fullWidth label='Buscar' id='Buscar' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <InputLabel id='estatus_input'>Estatus</InputLabel>
                            <Select
                              labelId='estatus_input'
                              id='estatus'
                              value={status}
                              label='Estatus'
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              {/* // enum: ['Aplicado', 'Pendiente', 'Cancelado'], */}

                              <MenuItem value=''>Estatus</MenuItem>
                              <MenuItem value='Aplicado'>Aplicado</MenuItem>
                              <MenuItem value='Pendiente'>Pendiente</MenuItem>
                              <MenuItem value='Cancelado'>Cancelado</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <InputLabel id='Cuenta bancaria'>
                              Cuenta bancaria
                            </InputLabel>
                            <Select
                              labelId='Cuenta bancaria'
                              value={cuenta}
                              label='Cuenta bancaria'
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
                        </Grid>
                        <Grid item >
                          <Button
                            variant='contained'
                            title='Buscar'
                            sx={{
                              backgroundColor: '#c89211',
                              color: 'white'
                            }}
                            type='submit'
                          >
                            <Search />
                          </Button>
                        </Grid>
                        <Grid item >
                          <CreateExcel
                            columns={columns}
                            rows={expedientes}
                            type='excel'
                            title='Historial bancos'
                            icon='fa-regular fa-file-excel'
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              </Grid >
              <Grid item xs={12}>
                <Box p={{
                  xs: 0,
                  sm: 2
                }}>
                  {isLoading
                    ? <LinearProgress />
                    : <>
                      <TableIUS
                        columns={columns}
                        rows={expedientes}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        totalRows={totalDocs}
                        limit={limit}
                        permisos={permisos}
                        handleDelete={async (row) => {
                          const url = `/historial-bancos/${row._id}`
                          await apiAuth().delete(url)
                          fetchData()
                        }}
                      />
                    </>
                  }
                </Box>
              </Grid>
            </>
        }

      </Grid >
    </>
  )
}

const getDataFunction = async (despacho, search, status, page, banco) => {
  page = page + 1
  const url = `/historial-bancos/${despacho}?estatus=${status}&page=${page}&search=${search}&banco=${banco}`
  console.log('url', url)
  const { data } = await apiAuth().get(url)
  return data
}

export default memo(HistorialBancos)
