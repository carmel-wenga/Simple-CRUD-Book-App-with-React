const API_SERVER = {
    'PROTOCOL': process.env.REACT_APP_PROTOCOL,
    'HOST': process.env.REACT_APP_HOST,
    'PORT': process.env.REACT_APP_PORT,
    'API_VERSION': process.env.REACT_APP_API_VERSION
}

const API_BASE_URL = `${API_SERVER.PROTOCOL}://${API_SERVER.HOST}:${API_SERVER.PORT}${API_SERVER.API_VERSION}`
const API_ENDPOINTS = {
    'books':'books/'
}
export { API_BASE_URL, API_ENDPOINTS };