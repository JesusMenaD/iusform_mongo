import { memo, useEffect, useState } from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Box, Paper, Typography, Alert, Chip } from '@mui/material'
import { Search, Download } from '@mui/icons-material'
import ButtonAction from '../../components/ButtonAction'
import TableIUS from '../../components/TableIUS'
import { apiAuth } from '../../api'
import { Link } from 'react-router-dom'

const title = 'Expedientes'
const altasLink = '/expedientes/crear'
const columns = [
  { id: 'titulo', label: 'Titulo', minWidth: 100, render: (row) => (<Link to={`${row._id}`}>{row.titulo}</Link>) },
  { id: 'cliente', label: 'Cliente', minWidth: 100, render: (row) => (row.cliente.nombre) },
  { id: 'asunto', label: 'Juicio', minWidth: 100, render: (row) => (row.asunto.nombre) },
  { id: 'materia', label: 'Materia', minWidth: 100, render: (row) => (row.materia.nombre) },
  { id: 'etapaProcesal', label: 'Etapa procesal', minWidth: 100, render: (row) => (row.etapaProcesal.nombre) },
  { id: 'juzgado', label: 'Juzgado', minWidth: 100, render: (row) => (row.juzgado.nombre) },
  { id: 'fechaInicio', label: 'Fecha de inicio', minWidth: 100, render: (row) => new Date(row.fechaInicio).toLocaleDateString() },
  { id: 'ultimoMovimiento', label: 'Último movimiento', minWidth: 100, render: (row) => new Date(row.ultimoMovimiento).toLocaleDateString() },
  {
    id: 'estatus',
    label: 'Estatus',
    minWidth: 100,
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
const handleExportPDF = () => { }
const handleExportExcel = () => { }

const Expedientes = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [expedientes, setExpedientes] = useState([])
  const [totalDocs, setTotalDocs] = useState(1)
  const [limit, setTotal] = useState(10)
  const [searchTimeout, setSearchTimeout] = useState(null)

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
  }, [currentPage]) // Realiza la búsqueda cada vez que cambia la página

  useEffect(() => {
    // Limpia el timeout cuando el componente se desmonta o cuando search/status cambian
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [search, status])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await getDataFunction(search, status, currentPage)
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ButtonAction actual={title} create={altasLink} />
      </Grid>
      <Grid item xs={12}>
        <Box px={2}>
          <Paper elevation={0} sx={{ p: 2, py: 5 }}>
            <Typography variant='subtitle1' mb={2} component='h2'>
              Selecciona un criterio de búsqueda
            </Typography>
            <Box onSubmit={handleFilter} as='form' component='form'>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField fullWidth label='Buscar' id='Buscar' value={search} onChange={(e) => setSearch(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={2}>
                  <Button type='submit' variant='contained' color='primary' fullWidth startIcon={<Search />} >
                    Buscar
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={1}>
                  <Button variant='outlined' fullWidth startIcon={<Download />} onClick={handleExportPDF}>
                    PDF
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={1}>
                  <Button variant='outlined' color='secondary' fullWidth startIcon={<Download />} onClick={handleExportExcel}>
                    Excel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box p={2}>
          {isLoading
            ? <Alert severity='info'>Cargando datos...</Alert>
            : (
              <TableIUS
                columns={columns}
                rows={expedientes}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalRows={totalDocs}
                limit={limit}
              />)
          }
        </Box>
      </Grid>
    </Grid>
  )
}

const getDataFunction = async (search, status, page) => {
  page = page + 1
  const url = `/expedientes/65d1459652fb1c3c960d2d39/65d14725b7158c91a4d64081?search=${search}&estatus=${status}&page=${page}`
  const { data } = await apiAuth().get(url)

  return data
}

export default memo(Expedientes)
