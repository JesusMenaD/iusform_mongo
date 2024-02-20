/* eslint-disable react/prop-types */
import { memo, useMemo } from 'react'
import Listar from '../../components/Listar'
// import FormMonedas from './formMonedas'

const GetDataFunction = () => {
  return []
}

const DeleteFunction = async (id) => {

}

const Expedientes = () => {
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
      accessorKey: 'plural',
      header: 'Plural',
      size: 30
    }
  ], [])
  return (
    <>
      <Listar title='Expedientes' GetDataFunction={GetDataFunction} DeleteFunction={DeleteFunction} heads={heads} altasLink='/expedientes/create' />
    </>
  )
}

export default memo(Expedientes)
