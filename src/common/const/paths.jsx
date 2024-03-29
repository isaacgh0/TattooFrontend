const PATHS = {
  PUBLIC: {
    HOME: '/',
    TATTOOS: '/tattoos',
    TOP: '/top',
    BRANCHES: '/branches',
    ABOUT: '/about',
    PREVIEW: '/cart-preview'
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT: '/forgot-password'
  },
  USER: {
    PAYMENT: '/cart-payment',
    PROFILE: '/user/profile',
    FAVORITES: '/user/favorites'
  },
  ADMIN: {
    ACCOUNTS: '/admin/accounts',
    ADD: '/admin/add-tattoo',
    TATTOOS: '/admin/tattoos',
    BRANCHES: '/admin/branches',
    ANALYTICS: '/admin/analytics'
  }
}

const ENDPOINTS = {
  TOKEN: '/api/token-validation',
  NEWS: '/api/news',
  LOGIN: '/api/singin',
  GETCODE: '/api/get-code',
  REGISTER: '/api/singup',
  TATTOOS: '/api/tattoos',
  FORGOT: '/api/forgot-password',
  ARTISTS: '/api/tattoo-artists',
  BRANCHES: '/api/branches',
  TOP: '/api/top',
  DETAIL: '/api/detail',
  CLUSTER: '/api/cluster',
  FAVORITESTATUS: '/api/favorite-status',
  TOGGLEFAVORITE: '/api/favorite-toggle',
  ADMIN: {
    VALIDATE: '/api/admin/validate',
    ACCOUNTS: '/api/admin/accounts',
    ADDACOUNT: '/api/admin/add-account',
    REMOVEACOUNT: '/api/admin/remove-account',
    UPLOADTATTOO: '/api/admin/upload-tattoo',
    REMOVETATTOO: '/api/admin/remove-tattoo',
    REMOVEBRANCH: '/api/admin/remove-branch',
    ADDBRANCH: '/api/admin/add-branch'
  }
}

export default PATHS
export { ENDPOINTS }
