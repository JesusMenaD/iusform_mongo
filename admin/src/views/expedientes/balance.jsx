/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import {
  LinearProgress
} from '@mui/material'
import { apiAuth } from '../../api'
import TableIUS from '../../components/TableIUS'

const Balance = ({ despacho, _id, cargas = 0 }) => {
  const [balance, setBalance] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getBalance(despacho, _id).then(data => {
      const { total = 0, gastos = 0, ingresos = 0 } = data
      const balanceLocal = [{
        _id: 1,
        title: 'Gastos',
        importe: gastos
      }, {
        _id: 2,
        title: 'Ingresos',
        importe: ingresos
      }, {
        _id: 3,
        title: 'Total',
        importe: total
      }]
      setBalance(balanceLocal)
      setIsLoading(false)
    })
  }, [cargas])

  const columns = [
    {
      id: 'title',
      label: 'Tipo'
    },
    {
      id: 'importe',
      label: 'Importe',
      render: value => {
        return value.importe.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
      }
    }

  ]

  return (
    <>
      {
        isLoading
          ? <LinearProgress />
          : <TableIUS
            columns={columns}
            rows={balance}
            onPageChange={() => { }}
            totalRows={3}
            limit={10}
            currentPage={0}
            isHandling={false}

          />
      }

    </>
  )
}

export default memo(Balance)

const getBalance = async (despacho, expediente) => {
  const url = `/expedientes-gastos/balance/${despacho}/${expediente}`
  const { data } = await apiAuth().get(url)
  const { total, gastos, ingresos } = data
  return { total, gastos, ingresos }
}
