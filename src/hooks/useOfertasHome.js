// src/hooks/useOfertasHome.js
import { useEffect, useState } from "react"
import { getOfertas } from "../services/productos.js"

export const useOfertasHome = () => {
    const [ofertas, setOfertas] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const newOfertas = await getOfertas()
            setOfertas(newOfertas)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return { ofertas, loading, error, refetch: fetchData }
}