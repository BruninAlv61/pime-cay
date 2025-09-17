// src/hooks/useCategoriasHome.js
import { useEffect, useState } from "react"
import { getCategorias } from "../services/categorias.js"
import { getProductos } from "../services/productos.js"

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCategorias = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const newCategorias = await getCategorias()
      setCategorias(newCategorias || [])
    } catch (e) {
      setError(e.message || 'Error al obtener las categorías')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  return { categorias, loading, error, refetch: fetchCategorias, categoriasHome: categorias.slice(0,4) }
}

export const useCategoriasPage = () => {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [cats, prods] = await Promise.all([
          getCategorias(),
          getProductos()
        ])
        setCategorias(cats)
        setProductos(prods)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {loading, error, categorias, productos}
}