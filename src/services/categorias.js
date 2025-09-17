// src/services/categorias.js
const API_URL = 'https://pime-cay-api.onrender.com'

export const getCategorias = async () => {
  try {
    const response = await fetch(`${API_URL}/categorias`)
    const json = await response.json()
    
    // Mapear las categorías al formato esperado por los componentes
    const categorias = (json.categorias || []).map(cat => ({
      idCategoria: cat.categoriaId, // Mapear categoriaId a idCategoria
      nombre: cat.categoriaNombre,  // Mapear categoriaNombre a nombre
      descripcion: cat.categoriaDescripcion,
      imagen: cat.categoriaImagen
    }))
    
    return categorias
  } catch {
    throw new Error('Error al obtener las categorías')
  }
}