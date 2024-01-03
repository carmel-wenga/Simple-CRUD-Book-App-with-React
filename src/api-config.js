const API_SERVER = {
    'PROTOCOL': 'http',
    'HOST': 'localhost',
    'PORT': '5000',
    'API_VERSION': '/api/v1/'
}

const API_BASE_URL = `${API_SERVER.PROTOCOL}://${API_SERVER.HOST}:${API_SERVER.PORT}${API_SERVER.API_VERSION}`
const API_ENDPOINTS = {
    'books':'books/'
}
export { API_BASE_URL, API_ENDPOINTS };