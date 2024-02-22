/* eslint-disable react/no-children-prop */
import { IconButton, Tooltip } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { Eye } from 'react-feather'
import { Link } from 'react-router-dom'

const renderRowActions = ({ row, isUpdate = false, isDelete = false, handleDelete }) => (
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

export default renderRowActions
