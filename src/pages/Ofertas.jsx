// src/pages/Ofertas.jsx
import { useEffect, useState } from 'react'
import { getOfertas } from '../services/productos'
import '../styles/Ofertas.css'
import { useNavigate } from 'react-router-dom'

export function Ofertas() {
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getOfertas()
        setOfertas(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Calcular el mayor descuento
  const maxDescuento =
    ofertas.length > 0 ? Math.max(...ofertas.map((o) => o.descuento || 0)) : 0

  return (
    <section className="ofertas">
      {/* Hero */}
      <div className="ofertas__hero">
        <span className="ofertas__hero__badge">
          🔥 Ofertas por Tiempo Limitado
        </span>
        <h1 className="ofertas__hero__title">Ofertas Especiales</h1>
        <p className="ofertas__hero__subtitle">
          Descubre descuentos increíbles en nuestras piezas más exclusivas. ¡No
          dejes pasar estas oportunidades únicas!
        </p>
      </div>

      {/* Ofertas Cards */}
      <div className="ofertas__beneficios">
        <div className="ofertas__beneficio">
          <div className="ofertas__beneficio__icon">%</div>
          <div className="ofertas__beneficio__title">Hasta {maxDescuento}%</div>
          <div className="ofertas__beneficio__desc">de descuento</div>
        </div>
        <div className="ofertas__beneficio">
          <div className="ofertas__beneficio__icon">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#ffa5ec" />
              <path
                d="M12 7v5l3 3"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="ofertas__beneficio__title ofertas__beneficio__title--pink">
            Tiempo Limitado
          </div>
          <div className="ofertas__beneficio__desc">ofertas exclusivas</div>
        </div>
        <div className="ofertas__beneficio">
          <div className="ofertas__beneficio__icon">%</div>
          <div className="ofertas__beneficio__title ofertas__beneficio__title--purple">
            Productos Premium
          </div>
          <div className="ofertas__beneficio__desc">calidad garantizada</div>
        </div>
      </div>
      <div className="ofertas__cards">
        {loading && (
          <p style={{ textAlign: 'center', width: '100%' }}>
            Cargando ofertas...
          </p>
        )}
        {error && (
          <p style={{ color: 'red', textAlign: 'center', width: '100%' }}>
            {error}
          </p>
        )}
        {!loading && ofertas.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', width: '100%' }}>
            No hay ofertas disponibles.
          </p>
        )}
        {ofertas.map((oferta) => (
          <div className="ofertas__card" key={oferta.id}>
            <div className="ofertas__card__imgWrapper">
              <span className="ofertas__card__badge">
                ¡OFERTA! -{oferta.descuento}%
              </span>
              <span className="ofertas__card__categoria">
                {oferta.categoria}
              </span>
              <img
                src={oferta.imagen}
                alt={oferta.nombre}
                className="ofertas__card__img"
              />
            </div>
            <div className="ofertas__card__info">
              <span className="ofertas__card__nombre">{oferta.nombre}</span>
              <span className="ofertas__card__desc">{oferta.descripcion}</span>
              <div className="ofertas__card__precios">
                <span className="ofertas__card__precio">
                  ${oferta.precioOferta.toFixed(2)}
                </span>
                <span className="ofertas__card__precioOriginal">
                  ${oferta.precioOriginal.toFixed(2)}
                </span>
                <span className="ofertas__card__stock">
                  Stock: {oferta.stock}
                </span>
              </div>
              <div className="ofertas__card__ahorro">
                ¡Ahorra ${oferta.ahorro.toFixed(2)}!
              </div>
              <button
                className="ofertas__card__boton"
                onClick={() => navigate(`/ofertas/${oferta.id}`)}
              >
                Aprovechar Oferta
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
