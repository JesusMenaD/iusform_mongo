/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  Chip, LinearProgress
} from '@mui/material'
import { apiAuth } from '../../api'
import TableIUS from '../../components/TableIUS'

const getMovimientos = async (despacho, expediente, page) => {
  console.log('getMovimientos', despacho, expediente, page)
  page = page + 1
  const url = `/expedientes-recursos-incidencias/${despacho}/${expediente}?tipo=Incidencia`
  const { data } = await apiAuth().get(url)
  return data.recursosIncidencias
}

const formatFechaHora12H = (fecha) => {
  fecha = new Date(fecha)

  // Obtener los componentes de la fecha y hora
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1 // Los meses en JavaScript son 0-indexados, por lo que necesitas sumar 1
  const año = fecha.getFullYear()
  let hora = fecha.getHours()
  const minutos = fecha.getMinutes()
  const segundos = fecha.getSeconds()

  // Convertir la hora a formato de 12 horas
  const ampm = hora >= 12 ? 'PM' : 'AM'
  hora = hora % 12
  hora = hora || 12 // '0' horas se muestran como '12'

  // Formatear la fecha y hora
  const fechaHoraFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos} ${ampm}`

  return fechaHoraFormateada
}

const Incidencias = ({ despacho, usuario, _id, cargas = 0 }) => {
  const [movimientos, setMovimientos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    setIsLoading(true)
    getMovimientos(despacho, _id, currentPage).then(data => {
      setMovimientos(data.docs)
      const { totalDocs, limit } = data
      setTotalDocs(totalDocs)
      setLimit(limit)
      setIsLoading(false)
    })
  }, [currentPage, cargas])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const columns = [
    {
      id: 'fecha',
      label: 'Fecha',
      minWidth: 100,
      render: (row) => {
        return formatFechaHora12H(row.fecha)
      }
    },
    {
      id: 'recursoIncidencia.titulo',
      label: 'Titulo',
      minWidth: 180,
      render: (row) => {
        if (row.opcional) {
          return row.opcional
        }

        return row.recursoIncidencia?.nombre
      }
    },
    {
      id: 'comentario',
      label: 'Descripción',
      minWidth: 200
    },
    {
      id: 'usuario',
      label: 'Responsable',
      render: (row) => {
        if (row.creadoPor._id === usuario) { return <Chip label={'Tú'} color='primary' /> }
        return `${row.creadoPor?.nombre} ${row.creadoPor?.apellidoPaterno} ${row.creadoPor?.apellidoMaterno}`
      }
    }
  ]

  return (
    <>
      {isLoading
        ? <LinearProgress />
        : <TableIUS
          columns={columns}
          rows={movimientos}
          onPageChange={handlePageChange}
          totalRows={totalDocs}
          limit={limit}
          currentPage={currentPage}
        />
      }
    </>
  )
}
export default memo(Incidencias)
