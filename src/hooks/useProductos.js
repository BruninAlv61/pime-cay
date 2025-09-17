// src/hooks/useProductosDestacados.js
import { useEffect, useState } from "react"
import { getProductos } from "../services/productos.js"
import { getCategorias } from "../services/categorias.js"

export const useProductos = () => {
    const [productos, setProductos] = useState([])
    const [categoriasMap, setCategoriasMap] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const newProductos = await getProductos()
            const categorias = await getCategorias()
            setProductos(newProductos)
            const map = {}
            categorias.forEach((c) => {
            map[c.idCategoria] = c.nombre
        })
        setCategoriasMap(map)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return { productos, productosDestacados: productos.slice(0,3), loading, error, refetch: fetchData, categoriasMap }
}