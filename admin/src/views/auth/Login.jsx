import { memo, useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useMutation } from '@tanstack/react-query'
import { apiAuth } from '../../api'
import logo from '../../assets/images/logo/logo_iusform_300x74_original.png'
import { useField } from '../../hooks/useField'
import { UsuarioContext } from '../../context/UsuarioContext'
import Swal from 'sweetalert2'
import './auth.css'

const Login = () => {
  const navigate = useNavigate()
  const usuario = useField({ type: 'text', state: '' })
  const password = useField({ type: 'password', state: '' })
  const [, setUsuarioLS] = useLocalStorage('usuario', null)
  const [usuarioContext, setUsuarioContext] = useContext(UsuarioContext)
  if (usuarioContext) return <Navigate to={`/${usuarioContext.clave}/dashboard`} />

  const login = useMutation({
    mutationFn: async (user) => {
      const { data } = await apiAuth({
        'Content-Type': 'application/json'
      }).post('/auth/login', user)
      return data.data
    },
    onSuccess: (data) => {
      const { clave } = data
      setUsuarioLS(data)
      setUsuarioContext(data)
      navigate('/' + clave + '/dashboard')
    },
    onError: (error) => {
      const { message } = error?.response?.data
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      correo: usuario.value,
      password: password.value
    }

    login.mutate(user)
  }

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div
          className="content-wrapper d-flex align-items-center auth px-0 background"
        >
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="text-left py-5 px-4 px-sm-5">
                <div className="brand-logo" style={{ textAlign: 'center' }}>
                  <a
                    href="{{ route('home') }}"
                    target="_top"
                    alt="Zeibor Sistema para Abogados"
                    title="Zeibor Sistema para Abogados"
                  >
                    <img
                      src={logo}
                      alt="Zeibor Sistema para Abogados"
                      style={{ textAlign: 'center', width: '200px' }}
                    />
                  </a>
                </div>
                <h4 style={{ textAlign: 'center' }}>¡Bienvenido!</h4>
                <h6 className="font-weight-light" style={{ textAlign: 'center' }}>
                  Por favor inicia sesión para continuar.
                </h6>

                <form method="POST" onSubmit={handleSubmit}>

                  <div className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Correo electrónico"
                      required
                      {...usuario}
                    />

                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Contraseña"
                      required
                      {...password}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      Ingresar
                    </button>
                  </div>

                  <div className="my-2 d-flex justify-content-end align-items-center">

                    <Link to="/recovery" className="auth-link text-black">
                      ¿Olvidaste tu contraseña?
                    </Link>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Login)
