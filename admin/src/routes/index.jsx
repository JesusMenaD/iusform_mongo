
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { UsuarioContext } from '../context/UsuarioContext'
import { useContext } from 'react'

// * Auth
import { Login } from '../views/auth'
import { _404 } from '../views/Error'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AuthLayout } from '../layouts'

// * Recovery password
import { RecoveryPassword } from '../views/recovery_pass'

// * Perfil
import { EditarPerfil } from '../views/perfil'

// * Expedientes
import { Expedientes, CreateExpedientes, EditarExpediente, PautasExpediente } from '../views/expedientes'

// * Clientes
import { Clientes } from '../views/clientes'

import { Usuarios } from '../views/usuarios'

// * Configuraciones
const Router = () => {
  const [usuario] = useContext(UsuarioContext)
  const despachoNombre = usuario?.despacho?.nombre ?? ''
  const logo = usuario?.despacho?.logo ?? ''

  // Verifica si el usuario está autenticado y tiene un ID único
  const clave = usuario && usuario.clave ? usuario.clave : null
  console.log('clave', clave)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recovery' element={<RecoveryPassword />} />
        {clave !== null && (
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout titleDespacho={despachoNombre} logo={logo} />}>
              <Route path={`/${clave}`} element={
                <div>
                  <h1>Dashboard</h1>
                </div>
              } />
              <Route path={`/${clave}/dashboard`} element={
                <div>
                  <h1>Dashboard</h1>
                </div>
              } />
              <Route path={`/${clave}/perfil/editar`} element={<EditarPerfil />} />
              <Route path={`/${clave}/expedientes`} element={<Expedientes />} />
              <Route path={`/${clave}/expedientes/crear`} element={<CreateExpedientes usuarioC={usuario} />} />
              <Route path={`/${clave}/expedientes/:_id/editar`} element={<EditarExpediente usuarioC={usuario} />} />
              <Route path={`/${clave}/expedientes/:_id/pautas`} element={<PautasExpediente usuarioC={usuario} />} />

              {/* PautasExpediente */}

              <Route path={`/${clave}/clientes`} element={<Clientes />} />

              <Route path={`/${clave}/usuarios`} element={<Usuarios />} />

              {/* <Route path={`/${clave}/configuraciones/monedas`} element={<Monedas />} />
              <Route path={`/${clave}/configuraciones/monedas/:id/edit`} element={<Moneda />} />
            <Route path={`/${clave}/configuraciones/monedas/:id/watch`} element={<Moneda watch />} /> */}

              <Route path='*' element={<_404 />} />
            </Route>
          </Route>
        )}
        <Route path='*' element={<_404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
