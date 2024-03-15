/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField, Button, Grid, Box, Paper, Typography, LinearProgress, Chip, Alert
} from '@mui/material'
import { Search } from '@mui/icons-material'
import ButtonAction from '../../components/ButtonAction'
import TableIUS from '../../components/TableIUS'
import { apiAuth } from '../../api'
import { Link, useLocation } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { UsuarioContext } from '../../context/UsuarioContext'
import CreateExcel from '../../components/CreateExcel'
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

const title = 'Gastos en trámites'

const GastosTramites = () => {
  const [usuarioC] = useContext(UsuarioContext)
  const despacho = usuarioC?.despacho?._id
  const [search, setSearch] = useState('')
  // const [status, setStatus] = useState('')
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

  const columns = [
    {
      id: 'expediente',
      label: 'Expediente',
      render: (row) => (<Link
        to={{
          pathname: `/${usuarioC?.clave}/expedientes/${row.expediente._id}/editar`
        }}
      >{row.expediente.titulo}</Link>)
    },
    {
      id: 'concepto',
      label: 'concepto',
      render: (row) => row.concepto
    },
    { id: 'fecha', label: 'fecha', render: (row) => (formatFechaHora12H(row.fecha)) },
    {
      id: 'importe', label: 'Importe', render: (row) => `$${row.importe}`
    },
    {
      id: 'estatus',
      label: 'Estatus',
      render: (row) => {
        if (row?.expediente.estatus === 'Activo') {
          return <Chip label={row?.expediente.estatus} color='primary' />
        }
        if (row?.expediente.estatus === 'Inactivo') {
          return <Chip label={row?.expediente.estatus} color='secondary' />
        }
        if (row?.expediente.estatus === 'Concluido') {
          return <Chip label={row?.expediente.estatus} color='success' />
        }
        return <Chip label={row?.expediente.estatus} color='warning' />
      }
    }

  ]

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
      const result = await getDataFunction(despacho, search, '', currentPage, fechaInicio, fechaFinal)
      setExpedientes(result.docs)
      setTotalDocs(result.totalDocs)
      setTotal(result.limit)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  const [fechaInicio, setFechaInicio] = useState()
  const [fechaFinal, setFechaFinal] = useState('')
  return (
    <>

      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <ButtonAction actual={title} handleRefresh={() => fetchData()} />
        </Grid>
        {
          permisos?.read === false
            ? <Grid item xs={12}>
              <Alert severity='error'>No tienes permisos para ver esta sección</Alert>
            </Grid>
            : <>
              <Grid item xs={12} >
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
                        {/* <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <InputLabel id='estatus_input'>Estatus</InputLabel>
                            <Select
                              labelId='estatus_input'
                              id='estatus'
                              value={status}
                              label='Estatus'
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <MenuItem value=''>Estatus</MenuItem>
                              <MenuItem value='Activo'>Activo</MenuItem>
                              <MenuItem value='Inactivo'>Inactivo</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid> */}
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField fullWidth type='date' value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField fullWidth type='date' value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} />

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
                            title='Gastos en trámites'
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
                  sm: 3
                }}>
                  {isLoading
                    ? <LinearProgress />
                    : <TableIUS
                      columns={columns}
                      rows={expedientes}
                      onPageChange={handlePageChange}
                      currentPage={currentPage}
                      totalRows={totalDocs}
                      limit={limit}
                      // permisos={permisos}
                      handleDelete={async (row) => {
                        const url = `/usuario/${row._id}`
                        await apiAuth().delete(url)
                        fetchData()
                      }}
                      deletePosition={1}
                    />
                  }
                </Box>
              </Grid>
            </>
        }

      </Grid >
    </>
  )
}

const getDataFunction = async (despacho, search, status, page, fechaInicio, fechaFinal) => {
  page = page + 1
  const url = `/gastos-tramites/${despacho}?estatus=${status}&page=${page}&search=${search}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`
  console.log('url', url)
  const { data } = await apiAuth().get(url)
  return data.gastos
}

export default memo(GastosTramites)
