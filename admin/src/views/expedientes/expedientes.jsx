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
import AlertExpedientes from '../../components/AlertExpedientes'
import { UsuarioContext } from '../../context/UsuarioContext'
import CreateExcel from '../../components/CreateExcel'

const title = 'Expedientes'
const altasLink = 'crear'
const columns = [
  {
    id: 'titulo',
    label: 'Titulo',
    render: (row) => (<Link
      to={{
        pathname: `${row._id}/editar`,
        state: { expediente: row }
      }}
    >{row.titulo}</Link>)
  },
  { id: 'cliente.nombre', label: 'Cliente', render: (row) => (row?.cliente?.nombre) },
  { id: 'asunto.nombre', label: 'Juicio', render: (row) => (row?.asunto?.nombre) },
  { id: 'materia.nombre', label: 'Materia', render: (row) => (row?.materia?.nombre) },
  { id: 'etapaProcesal.nombre', label: 'Etapa procesal', render: (row) => (row?.etapaProcesal?.nombre) },
  { id: 'juzgado.nombre', label: 'Juzgado', render: (row) => (row.juzgado.nombre) },
  { id: 'fechaInicio', label: 'Fecha de inicio', render: (row) => new Date(row.fechaInicio).toLocaleDateString() },
  { id: 'ultimoMovimiento', label: 'Último movimiento', render: (row) => new Date(row.ultimoMovimiento).toLocaleDateString() },
  {
    id: 'estatus',
    label: 'Estatus',
    render: (row) => {
      if (row.estatus === 'Activo') {
        return <Chip label={row.estatus} color='primary' />
      }
      if (row.estatus === 'Inactivo') {
        return <Chip label={row.estatus} color='secondary' />
      }
      if (row.estatus === 'Concluido') {
        return <Chip label={row.estatus} color='success' />
      }
      return <Chip label={row.estatus} color='warning' />
    }
  }

]

const Expedientes = () => {
  const [usuarioC] = useContext(UsuarioContext)
  const despacho = usuarioC?.despacho?._id
  const usuario = usuarioC?._id
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

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        setPermisos(modulo.permisos)
      }
    })
  }, [modulosC])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleFilter = (e) => {
    e.preventDefault()

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
      const result = await getDataFunction(despacho, usuario, search, status, currentPage)
      setExpedientes(result.docs)
      setTotalDocs(result.totalDocs)
      setTotal(result.limit)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

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
                              <MenuItem value=''>Estatus</MenuItem>
                              <MenuItem value='Activo'>Activo</MenuItem>
                              <MenuItem value='Inactivo'>Inactivo</MenuItem>
                              <MenuItem value='Concluido'>Concluido</MenuItem>
                              <MenuItem value='Suspendido'>Suspendido</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} display='flex' justifyContent='space-around'>
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
                          {/* <CreateExcel
                            columns={columns}
                            rows={expedientes}
                            type='pdf'
                            title='Expedientes'
                            icon='fa-regular fa-file-pdf'
                          /> */}
                          <CreateExcel
                            columns={columns}
                            rows={expedientes}
                            type='excel'
                            title='Expedientes'
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
                  <Paper elevation={0} sx={{
                    mb: 3
                  }} >
                    <Box p={{
                      xs: 0,
                      sm: 1.5
                    }}>
                      <AlertExpedientes despacho={usuarioC?.despacho} />
                    </Box>
                    {isLoading
                      ? <LinearProgress />
                      : <TableIUS
                        columns={columns}
                        rows={expedientes}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        totalRows={totalDocs}
                        limit={limit}
                        permisos={permisos}
                      />
                    }
                  </Paper>
                </Box>
              </Grid>
            </>
        }

      </Grid >
    </>
  )
}

const getDataFunction = async (despacho, usuario, search, status, page) => {
  page = page + 1
  const url = `/expedientes/${despacho}/${usuario}?search=${search}&estatus=${status}&page=${page}`
  const { data } = await apiAuth().get(url)

  return data
}

export default memo(Expedientes)
