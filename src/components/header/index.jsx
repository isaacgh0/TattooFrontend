import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import Shortcuts from '../shortcuts'
import { BrandLogo, Shopping, User, Analytics } from '../../common/const/static/icons'
import PATHS from '../../common/const/paths'
import './index.sass'

const Header = () => {
  const auth = useContext(AuthContext)

  const userItems = {
    navbar: [
      { text: 'Tatuajes', path: PATHS.PUBLIC.TATTOOS },
      { text: 'Top', path: PATHS.PUBLIC.TOP },
      { text: 'Sucursales', path: PATHS.PUBLIC.BRANCHES },
      { text: 'Nosotros', path: PATHS.PUBLIC.ABOUT }
    ],
    shortcuts: [
      { img: Shopping, text: 'Carrito', path: PATHS.PUBLIC.PREVIEW },
      {
        img: User,
        text: auth.user.isAuthenticated
          ? (auth.user.isAdminAcess ? 'Administradores' : 'Perfil')
          : 'Login',
        path: auth.user.isAuthenticated
          ? (auth.user.isAdminAcess ? PATHS.ADMIN.ACCOUNTS : PATHS.USER.PROFILE)
          : PATHS.AUTH.LOGIN
      }
    ]
  }

  const adminItems = {
    navbar: [
      { text: 'Gestores', path: PATHS.ADMIN.ACCOUNTS },
      { text: 'Agregar', path: PATHS.ADMIN.ADD },
      { text: 'Tatuajes', path: PATHS.ADMIN.TATTOOS },
      { text: 'Sucursales', path: PATHS.ADMIN.BRANCHES }
    ],
    shortcuts: [
      { img: Analytics, text: 'Estadisticas', path: PATHS.ADMIN.ANALYTICS },
      {
        img: User,
        text: 'Cerrar sesion',
        path: PATHS.PUBLIC.HOME,
        handleClick: e => {
          if (!window.confirm('¿Deseas cerrar sesion?')) {
            e.preventDefault()
          } else {
            auth.user.setIsAuthenticated(false)
            auth.user.setToken('')
            auth.user.setIsAdminAccess(false)
          }
        }
      }
    ]
  }

  const listNavbar = () => {
    const navbar = auth.user.token && auth.user.isAdminAccess
      ? adminItems.navbar
      : userItems.navbar

    return (
      navbar.map((item, index) => (
        <li key={index}>
          <Link to={item.path}>{item.text}</Link>
        </li>
      ))
    )
  }

  return (
    <header>
      <div className='west'>
        <img src={BrandLogo} alt='logo' />
        <Link to={PATHS.PUBLIC.HOME}>
          <span>SHOGUN.INK</span>
        </Link>
      </div>
      <div className='center'>
        <nav>
          <ul>
            {listNavbar()}
          </ul>
        </nav>
      </div>
      <div className='east'>
        <Shortcuts
          list={auth.user.token && auth.user.isAdminAccess
            ? adminItems.shortcuts
            : userItems.shortcuts}
        />
      </div>
    </header>
  )
}

export default Header
