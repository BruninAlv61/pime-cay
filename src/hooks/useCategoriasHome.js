// src/hooks/useCategoriasHome.js
import { useEffect, useState } from "react"

// Hook personalizado para obtener categorías desde la API
export const useCategoriasHome = () => {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCategorias = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://pime-cay-api.onrender.com/categorias')
      const json = await response.json()
      
      // Retornar las categorías tal como vienen de la API
      // (sin mapear, para mantener los nombres originales)
      setCategorias(json.categorias || [])
    } catch (e) {
      setError(e.message || 'Error al obtener las categorías')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  return { categorias, loading, error, refetch: fetchCategorias }

}