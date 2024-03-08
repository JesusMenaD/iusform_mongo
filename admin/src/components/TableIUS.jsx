/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
// Modifica la función TableIUS para renderizar los componentes dinámicos
const TableIUS = ({
  columns = [],
  rows = [],
  limit = 10,
  currentPage = 1,
  onPageChange,
  totalRows = 1,
  handleDelete = (e) => { },
  handleEdit = (e) => { },
  permisos = null,
  isHandling = true,
  deletePosition = 0
}) => {
  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage)
  }

  const handleDeleteConfirmar = async (row, index) => {
    const columValue = row[columns[deletePosition].id]
    const { isConfirmed } = await Swal.fire({
      title: '¿Estas seguro de eliminarlo?',
      text: `Eliminarás el registro ${columValue}`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si'
    })

    if (isConfirmed) {
      handleDelete(row)
    }
  }

  const handleEditRedirect = (row, index) => {
    const _id = row._id
    navigate(`${_id}/editar`)
  }

  return (
    <Paper sx={{
      // width: '100%', overflow: 'hidden'
    }}>
      <TableContainer>
        <Table sx={{
          backgroundColor: '#fff'
        }}>
          {isHandling &&
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >{column.label}
                  </TableCell>
                ))}
                {(permisos?.delete === true || permisos?.update === true) && <TableCell align="right">Acciones</TableCell>}
              </TableRow>
            </TableHead>
          }
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body1">No hay elementos para mostrar.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} colSpan={column.colSpan || 0} rowSpan={column.rowSpan || 1}>
                      {/* Verifica si hay una función de renderización definida para esta columna */}
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                  {/* si isDeleting o isEditing son verdaderos, renderiza los botones de eliminar y editar */}
                  {(permisos?.delete === true || permisos?.update === true) &&

                    <TableCell key={index + 'eliminar'} align="right">
                      {
                        permisos?.update === true &&
                        <Tooltip title="editar">
                          <IconButton
                            color='info'
                            onClick={() => handleEditRedirect(row, index)}
                          >
                            <Edit size={20} />
                          </IconButton>
                        </Tooltip>
                      }
                      {
                        permisos?.delete === true &&
                        <Tooltip title="Eliminar">
                          <IconButton
                            color='secondary'
                            onClick={() => handleDeleteConfirmar(row, index)}
                          >
                            <Delete size={20} />
                          </IconButton>
                        </Tooltip>
                      }
                    </TableCell>
                  }
                </TableRow>
              ))

            )}
          </TableBody>
        </Table>
      </TableContainer>
      {limit < totalRows &&
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={totalRows}
          rowsPerPage={limit}
          page={currentPage}
          align='center'
          onPageChange={handleChangePage}
          onRowsPerPageChange={(event) => {
            console.log(event)
          }}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      }
    </Paper>
  )
}

export default TableIUS
