import { useContext } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'
import { Outlet, Navigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
export const ProtectedRoute = () => {
  const [usuarioContext] = useContext(UsuarioContext)
  if (!usuarioContext) return <Navigate to='/login' />
  return <Outlet />
}
