/* eslint-disable react/prop-types */
import { memo, useState } from 'react'
import { Alert, Button, Divider, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Box } from '@mui/system'
import { Columns, Plus, RefreshCcw, Table, X } from 'react-feather'
import DataTable from './DataTable'
import { Kanban } from './Kanban'
import Swal from 'sweetalert2'
import ButtonAction from './ButtonAction'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const styles = {
  between: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 1,
    marginBottom: 2
  },
  End: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    marginBottom: 2,
    marginTop: 2
  },
  start: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 1
  },
  TextField: {
    mb: 2
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '350px',
    width: '100%',
    maxWidth: '500px',
    bgcolor: 'white',
    p: 4,
    boxShadow: 24,
    '&:focus': {
      outline: 'none'
    }
  },
  title: {
    color: 'primary.main',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    mb: 2
  },
  titleAdd: {
    color: 'primary.main',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
}

const Listar = ({
  title = '', altasLink = '', GetDataFunction, DeleteFunction, heads, FilterSearch = () => null
}) => {
  // const [openCreate, setOpenCreate] = useState(false)

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: [title.toLowerCase()],
    queryFn: () => GetDataFunction
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

  // const [tableOrKanban, setTableOrKanban] = useState(true)

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

  // const handleOpen = () => setOpenCreate(true)
  // const handleClose = () => setOpenCreate(false)

  const Render = () => (
    <>

      {isError && <Alert severity='error'>Error al cargar los datos</Alert>}
      <DataTable
        heads={heads}
        response={data}
        title={title}
        loading={isLoading}
        handleDelete={handleDelete}
      />
    </>
  )

  return (
    <>
      <ButtonAction actual={title} create={altasLink} />
      <Box
        sx={{
          p: 4,
          m: 2,
          mt: 5,
          borderRadius: 2,
          boxShadow: 5,
          bgcolor: 'white'
          // minHeight: '80vh'
        }}
      >
        {isError
          ? <Alert severity='error'>Error al cargar los datos</Alert>
          : <>
            <FilterSearch />
            <Render />
          </>}
      </Box>
    </>
  )
}
export default memo(Listar)
