/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import { memo, useCallback } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import CreateExcel from './CreateExcel'
import { Box, IconButton, LinearProgress, Tooltip } from '@mui/material'
import ReactTable from 'material-react-table'
import { MRT_Localization_ES as localization } from 'material-react-table/locales/es'
import { Eye } from 'react-feather'
import { useNavigate } from 'react-router-dom'

const DataTable = ({ heads, response, title, handleDelete, loading }) => {
  const navigate = useNavigate()
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   setData(response)
  // }, [loading])

  const handleBusqueda = useCallback((tabla) => {
    return tabla.getPrePaginationRowModel().rows.map((row) => row.original)
  }, [])

  const handleSelected = useCallback(({ getSelectedRowModel }) => {
    return getSelectedRowModel().rows.map((row) => row.original)
  }, [])

  const handleExportAll = () => response

  const columns = () => heads.map(({ header, accessorKey }) => ({
    label: header,
    value: accessorKey
  }))

  const handleWatch = (obj) => {
    const firtvalue = Object.values(obj)[0]
    navigate(`${firtvalue}/watch`)
  }

  const handleEdit = (obj) => {
    const firtvalue = Object.values(obj)[0]
    navigate(`${firtvalue}/edit`)
  }
  const renderRowActions = ({ row }) => (
    <Box>
      <Tooltip arrow placement='left' title='ver'>
        <IconButton color='info' onClick={() => handleWatch(row.original)}>
          <Eye />
        </IconButton>
      </Tooltip>
      <Tooltip arrow placement='top' title='Actualizar'>
        <IconButton color='success' onClick={() => handleEdit(row.original)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip arrow placement='right' title='Bajas'>
        <IconButton color='error' onClick={() => handleDelete(row.original)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )

  const renderTopToolbarCustomActions = ({ table }) => (
    <Box>
      <CreateExcel loading={loading} sheet={title} dataFn={handleExportAll} columns={columns} placeHolder='Todo' />
      <CreateExcel loading={loading} sheet={title} dataFn={() => handleBusqueda(table)} columns={columns} placeHolder='Búsqueda' />
      <CreateExcel loading={loading} sheet={title} dataFn={() => handleSelected(table)} columns={columns} placeHolder='Seleccionados' />
    </Box>
  )

  const columnVisibility = heads.reduce((acc, { accessorKey, enableHiding }) => {
    acc[accessorKey] = enableHiding
    return acc
  }, {})

  return (
    <div>
      {
        loading
          ? <LinearProgress />
          : (
            <ReactTable
              enableEditing
              columns={heads}
              enableHiding={true}
              data={response}
              initialState={{ columnVisibility }}
              positionActionsColumn='last'
              enableRowSelection
              renderTopToolbarCustomActions={renderTopToolbarCustomActions}
              renderRowActions={renderRowActions}
              localization={localization}
              defaultColumn={{

                maxSize: 400,

                minSize: 80,

                size: 150

              }}

              enableColumnResizing
            />
          )
      }
    </div>
  )
}

export default memo(DataTable)
