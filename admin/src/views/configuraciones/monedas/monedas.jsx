/* eslint-disable react/prop-types */
import { memo, useMemo } from 'react'
import Listar from '../../../components/Listar'
import { GetMonedas, DeleteMoneda } from '../../../api/configuraciones'
import FormMonedas from './formMonedas'

const Monedas = () => {
  const heads = useMemo(() => [
    {
      accessorKey: 'id_moneda',
      header: 'Id',
      size: 30
    },
    {
      accessorKey: 'moneda',
      header: 'Moneda',
      size: 40
    },
    {
      accessorKey: 'tipo_cambio',
      header: 'Tipo de cambio',
      size: 30
    },
    {
      accessorKey: 'abreviatura',
      header: 'Abreviatura',
      size: 30
    },
    {
      accessorKey: 'singular',
      header: 'Singular',
      size: 30
    },
    {
      accessorKey: 'plural',
      header: 'Plural',
      size: 30
    }
  ], [])
  return (
    <>
      <Listar heads={heads} title="Monedas" Delete={DeleteMoneda} ObtenerData={GetMonedas} FormCreate={FormMonedas} />
    </>
  )
}

export default memo(Monedas)
