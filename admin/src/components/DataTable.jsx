/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { memo } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import ReactTable from 'material-react-table'
import { MRT_Localization_ES as localization } from 'material-react-table/locales/es'
import { Eye } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

const DataTableContainer = ({ children }) => (
  <Paper style={{ overflowX: 'auto' }}>
    {children}
  </Paper>
)
const DataTable = ({
  title,
  heads,
  response,
  handleDelete,
  loading,
  isUpdate = false,
  isDelete = false,
  paginate = {
    totalDocs: 32,
    limit: 10,
    totalPages: 10,
    page: 1,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2
  },
  onReload
}) => {
  const navigate = useNavigate()
  const renderRowActions = ({ row }) => (
    <>
      <Tooltip arrow placement='left' title='ver'>
        <Link children={<Eye />} to={`./${row.original._id}`} />

      </Tooltip>

      {
        isUpdate && (
          <Tooltip arrow placement='top' title='Actualizar'>
            <Link children={<Edit />} to={`./${row.original._id}/edit`} />
          </Tooltip>
        )
      }

      {
        isDelete && (
          <Tooltip arrow placement='right' title='Bajas'>
            <IconButton color='error' onClick={() => handleDelete(row.original)}>
              <Delete />
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
  return (
    <DataTableContainer>
      <ReactTable
        enableEditing={true}
        columns={heads}
        enableHiding={true}
        data={response ?? []}
        positionActionsColumn='last'
        enableRowSelection={false}
        filterFromLeafRows={false}
        localization={localization}
        autoResetAll={true}
        renderRowActions={renderRowActions}

        enablePagination={false}
        state={{
          isLoading: loading
        }}

      />
      <Stack spacing={2} direction='row' justifyContent='center' alignItems='center'>
        <Pagination
          count={paginate.totalPages}
          page={paginate.page}
          onChange={(event, page) => {
            navigate(`?page=${page}`)
            onReload()
          }}
        />
      </Stack>

    </DataTableContainer>
  )
}

export default memo(DataTable)
