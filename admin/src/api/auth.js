import { apiAuth } from '.'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const login = async (user) => {
  const { data } = await apiAuth().post('/login', user)
  return data
}

export const getUsuarioLS = () => {
  const [usuario] = useLocalStorage('usuario', null)
  if (usuario) return usuario
  return null
}

export const getInfoUsuario = async ({ token, usuario }) => {
  const { data } = await apiAuth(token).get(`/usuarios/${usuario}`)
  return data
}
