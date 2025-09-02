// src/hooks/useCategoriasHome.js
import { useEffect, useState } from "react"
import { getCategorias } from "../services/productos.js"

export const useCategoriasHome = () => {
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const newCategorias = await getCategorias()
            // Limitamos a 4 categorías para el home
            setCategorias(newCategorias.slice(0, 4))
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return { categorias, loading, error, refetch: fetchData }
}