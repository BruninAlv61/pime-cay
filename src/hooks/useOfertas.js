// src/hooks/useOfertas.js
import { useEffect, useState } from 'react'
import { getOfertas } from '../services/ofertas.js'
import { useParams } from 'react-router-dom'

export const useOfertas = () => {
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

export const useOfertasDetalles = () => {
  const { id } = useParams()
  const [oferta, setOferta] = useState(null)
  const [relacionadas, setRelacionadas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const ofertas = await getOfertas()
        const of = ofertas.find((o) => String(o.id) === String(id))
        setOferta(of)
        if (of) {
          const rel = ofertas.filter(
            (o) => o.categoria === of.categoria && o.id !== of.id
          )
          setRelacionadas(rel)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return { oferta, loading, error, relacionadas }
}
