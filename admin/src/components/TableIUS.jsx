/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography, IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
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
  isDeleting = true,
  isEditing = true
}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
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
              {isDeleting && <TableCell align="right">Acciones</TableCell>}
            </TableRow>
          </TableHead>
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
                    <TableCell key={column.id} align={column.align}>
                      {/* Verifica si hay una función de renderización definida para esta columna */}
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                  {/* si isDeleting o isEditing son verdaderos, renderiza los botones de eliminar y editar */}

                  <TableCell key={index + 'eliminar'} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center'

                  }}>
                    <Tooltip>
                      <IconButton
                        color='secondary'
                        onClick={handleDelete}
                      >
                        <Delete size={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip>
                      <IconButton
                        color='secondary'
                        onClick={handleDelete}
                      >
                        <Delete size={20} />
                      </IconButton>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))

            )}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Paper>
  )
}

export default TableIUS
