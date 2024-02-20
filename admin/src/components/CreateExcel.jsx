/* eslint-disable react/prop-types */
import { memo } from 'react'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
import { Download } from 'react-feather'
import xlsx from 'json-as-xlsx'

const CreateExcel = ({ sheet = 'Excel', columns, placeHolder = 'Descargar', dataFn, loading = false }) => {
  const handleDownload = () => {
    const content = dataFn()

    if (content.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡No has seleccionado nada!'
      })
      return
    }
    const data = [{ sheet, columns: columns(), content }]
    const date = new Date()
    const settings = { fileName: `${sheet}-${date.toLocaleDateString()}` }

    xlsx(data, settings)
  }

  return (
    <Button
      disabled={loading}
      startIcon={<Download size={20} />}
      variant='text'
      color='primary'
      sx={{ my: 1, mr: 1 }}
      onClick={handleDownload}
    >
      {placeHolder}
    </Button>
  )
}

export default memo(CreateExcel)
