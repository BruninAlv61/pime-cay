// src/hooks/useProductosDestacados.js
import { useEffect, useState } from "react"
import { getProductosDestacados } from "../services/productos.js"

export const useProductosDestacados = () => {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const newProductos = await getProductosDestacados()
            setProductos(newProductos)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return { productos, loading, error, refetch: fetchData }
}