// src/services/productos.js
const API_URL = 'https://pime-cay-api.onrender.com'

export const getProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`)
    const json = await response.json()
    return json.productos || []
  } catch {
    throw new Error('Error al obtener los productos')
  }
}



