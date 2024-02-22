/* eslint-disable react/prop-types */
import { memo } from 'react'
import { Alert, Grid, Paper, Typography } from '@mui/material'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Box } from '@mui/system'
import DataTable from './DataTable'
import Swal from 'sweetalert2'
import ButtonAction from './ButtonAction'

const Listar = ({
  title = '', altasLink = '', GetDataFunction, DeleteFunction, heads
}) => {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: [title.toLowerCase()],
    queryFn: () => GetDataFunction({ search: '', status: '' })
  })

  const deleteMutation = useMutation({
    mutationFn: DeleteFunction,
    onSuccess: (s) => {
      Swal.fire({ title: 'Eliminado correctamente', icon: 'success' })
      refetch()
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.message
      Swal.fire({ title: 'Error al eliminar', text: message, icon: 'error' })
    }
  })

  const handleDelete = async (obj) => {
    const id = Object.values(obj)[0]

    const { isConfirmed } = await Swal.fire({
      title: '¿Estas seguro de eliminarlo?',
      showDenyButton: true,
      confirmButtonText: 'Si'
    })

    if (isConfirmed) {
      deleteMutation.mutate(id)
    }
  }

  const Render = () => (
    <>
      {isError && <Alert severity='error'>Error al cargar los datos</Alert>}
      <DataTable
        heads={heads}
        response={data}
        title={title}
        loading={isLoading}
        handleDelete={handleDelete}
        // paginate={paginate}
        onReload={refetch}
      />
    </>
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ButtonAction actual={title} create={altasLink} />
      </Grid>
      <Grid item xs={12} >
        <Box px={2}>
          <Paper elevation={0} sx={{ p: 2, py: 5 }}>
            <Typography variant='subtitle1' mb={2} component={'h2'} >
              Selecciona un criterio de busqueda
            </Typography>
            {/* <FilterSearch /> */}
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} >
        <Box p={2}>
          {isError
            ? <Alert severity='error'>Error al cargar los datos</Alert>
            : <Render />
          }
        </Box>
      </Grid>
    </Grid >
  )
}

export default memo(Listar)
