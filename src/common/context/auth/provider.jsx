import { useState } from 'react'
import AuthContext from './context'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthProcess, setIsAuthProcess] = useState(false)
  const [isAdminAccess, setIsAdminAccess] = useState(false)
  const [csrfToken, setCSRFToken] = useState(null)
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{
      isAuthProcess,
      csrfToken,
      setIsAuthProcess,
      setCSRFToken,
      user: {
        isAuthenticated,
        isAdminAccess,
        token,
        setIsAuthenticated,
        setIsAdminAccess,
        setToken
      }
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
