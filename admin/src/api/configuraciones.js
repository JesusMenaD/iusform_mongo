import { apiAuth } from '.'

//* Departamentos
export const GetDepartamentos = async ({ token }) => {
  const { data } = await apiAuth(token).get('departamentos')
  return data
}

export const GetDepartamentoById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`departamentos/${id}`)
  return data
}

export const DeleteDepartamento = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`departamentos/${id}`)
  return data
}

export const PostDepartamento = async ({ token, payload }) => {
  const data = await apiAuth(token).post('departamentos', payload)
  return data
}

export const PutDepartamento = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`departamentos/${payload.id_departamento}`, payload)
  return data
}

//* Empresas

export const GetEmpresas = async ({ token }) => {
  const { data } = await apiAuth(token).get('empresas')
  return data
}

export const GetEmpresaById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`empresas/${id}`)
  return data
}

export const DeleteEmpresa = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`empresas/${id}`)
  return data
}

export const PostEmpresa = async ({ token, payload }) => {
  const data = await apiAuth(token).post('empresas', payload)
  return data
}

export const PutEmpresa = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`empresas/${payload.id_empresa}`, payload)
  return data
}

//* Familias

export const GetFamilias = async ({ token, empresa }) => {
  const { data } = await apiAuth(token).get(`familias/${empresa}/empresas`)
  return data
}

export const GetFamiliaById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`familias/${id}`)
  return data
}

export const DeleteFamilia = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`familias/${id}`)
  return data
}

export const PostFamilia = async ({ token, payload }) => {
  const data = await apiAuth(token).post('familias', payload)
  return data
}

export const PutFamilia = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`familias/${payload.id_familia}`, payload)
  return data
}

//* Monedas

export const GetMonedas = async ({ token }) => {
  const { data } = await apiAuth(token).get('monedas')
  return data
}

export const GetMonedaById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`monedas/${id}`)
  return data
}

export const DeleteMoneda = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`monedas/${id}`)
  return data
}

export const PostMoneda = async ({ token, payload }) => {
  const data = await apiAuth(token).post('monedas', payload)
  return data
}

export const PutMoneda = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`monedas/${payload.id_moneda}`, payload)
  return data
}

//* Puestos

export const GetPuestos = async ({ token }) => {
  const { data } = await apiAuth(token).get('puestos')
  return data
}

export const DeletePuesto = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`puestos/${id}`)
  return data
}

export const PostPuesto = async ({ token, payload }) => {
  const data = await apiAuth(token).post('puestos', payload)
  return data
}

export const PutPuesto = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`puestos/${payload.id_puesto}`, payload)
  return data
}

export const GetPuestosById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`puestos/${id}`)
  return data
}

//* Sat Estados
export const GetEstados = async ({ token }) => {
  const { data } = await apiAuth(token).get('estados')
  return data
}

export const GetEstadoById = async ({ token, id }) => {
  const { data } = await apiAuth(token, token).get(`estados/${id}`)
  return data
}

//* Marcas

export const GetMarcas = async ({ token }) => {
  const { data } = await apiAuth(token).get('marcas')
  return data
}

export const DeleteMarca = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`marcas/${id}`)
  return data
}

export const PostMarca = async ({ token, payload }) => {
  const data = await apiAuth(token).post('marcas', payload)
  return data
}

export const PutMarca = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`marcas/${payload.id_marca}`, payload)
  return data
}

export const GetMarcasById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`marcas/${id}`)
  return data
}

//* Impuestos

export const GetImpuestos = async ({ token, empresa }) => {
  const { data } = await apiAuth(token).get(`impuestos/${empresa}/empresas`)
  return data
}

export const DeleteImpuesto = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`impuestos/${id}`)
  return data
}

export const PostImpuesto = async ({ token, payload }) => {
  const data = await apiAuth(token).post('impuestos', payload)
  return data
}

export const PutImpuesto = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`impuestos/${payload.id_impuesto}`, payload)
  return data
}

export const GetImpuestosById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`impuestos/${id}`)
  return data
}
//* Unidades

export const GetUnidades = async ({ token }) => {
  const { data } = await apiAuth(token).get('unidades')
  return data
}

export const DeleteUnidad = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`unidades/${id}`)
  return data
}

export const PostUnidad = async ({ token, payload }) => {
  const data = await apiAuth(token).post('unidades', payload)
  return data
}

export const PutUnidad = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`unidades/${payload.id_unidades}`, payload)
  return data
}

export const GetUnidadeById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`unidades/${id}`)
  return data
}

//* Lineas

export const GetLineas = async ({ token, empresa }) => {
  const { data } = await apiAuth(token).get(`lineas/${empresa}/empresas`)
  return data
}

export const GetLineaById = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`lineas/${id}`)
  return data
}

export const DeleteLinea = async ({ token, id }) => {
  const data = await apiAuth(token).delete(`lineas/${id}`)
  return data
}

export const PostLinea = async ({ token, payload }) => {
  const data = await apiAuth(token).post('lineas', payload)
  return data
}

export const PutLinea = async ({ token, payload }) => {
  const data = await apiAuth(token).put(`lineas/${payload.id_linea}`, payload)
  return data
}
//* Usuarios

export const GetUsuarioInfoByname = async ({ token, id }) => {
  const { data } = await apiAuth(token).get(`lineas/${id}`)
  return data
}
