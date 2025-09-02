import '../styles/OfertasHome.css'
import { useState } from 'react'
import { useOfertasHome } from '../hooks/useOfertasHome.js'

export function OfertasHome() {
  const { ofertas, loading, error } = useOfertasHome()
  const [actual, setActual] = useState(0)
  const total = ofertas.length

  const siguiente = () => setActual((prev) => (prev + 1) % total)
  const anterior = () => setActual((prev) => (prev - 1 + total) % total)

  if (loading) {
    return (
      <section className="ofertasHome">
        <header className="ofertasHome__header">
          <div>
            <h2>Ofertas Especiales</h2>
            <p>
              No te pierdas nuestras ofertas exclusivas con descuentos
              increíbles por tiempo limitado.
            </p>
          </div>
          <a href="#" className="ofertasHome__verTodas">
            Ver todas las ofertas →
          </a>
        </header>
        <div className="ofertasHome__carousel">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p>Cargando ofertas especiales...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="ofertasHome">
        <header className="ofertasHome__header">
          <div>
            <h2>Ofertas Especiales</h2>
            <p>
              No te pierdas nuestras ofertas exclusivas con descuentos
              increíbles por tiempo limitado.
            </p>
          </div>
          <a href="#" className="ofertasHome__verTodas">
            Ver todas las ofertas →
          </a>
        </header>
        <div className="ofertasHome__carousel">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p>Error al cargar ofertas: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (ofertas.length === 0) {
    return (
      <section className="ofertasHome">
        <header className="ofertasHome__header">
          <div>
            <h2>Ofertas Especiales</h2>
            <p>
              No te pierdas nuestras ofertas exclusivas con descuentos
              increíbles por tiempo limitado.
            </p>
          </div>
          <a href="#" className="ofertasHome__verTodas">
            Ver todas las ofertas →
          </a>
        </header>
        <div className="ofertasHome__carousel">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p>No hay ofertas especiales disponibles en este momento</p>
          </div>
        </div>
      </section>
    )
  }

  const oferta = ofertas[actual]

  return (
    <section className="ofertasHome">
      <header className="ofertasHome__header">
        <div>
          <h2>Ofertas Especiales</h2>
          <p>
            No te pierdas nuestras ofertas exclusivas con descuentos increíbles
            por tiempo limitado.
          </p>
        </div>
        <a href="#" className="ofertasHome__verTodas">
          Ver todas las ofertas →
        </a>
      </header>
      <div className="ofertasHome__carousel">
        {total > 1 && (
          <button
            className="ofertasHome__arrow left"
            onClick={anterior}
            aria-label="Anterior"
          >
            &#60;
          </button>
        )}
        <article className="ofertasHome__card">
          <div className="ofertasHome__card__imgContainer">
            <img
              src={oferta.imagen}
              alt={oferta.nombre}
              className="ofertasHome__card__img"
            />
            <span className="ofertasHome__card__badge oferta">
              {oferta.oferta}
            </span>
            <span className="ofertasHome__card__badge tiempo">
              {oferta.tiempo}
            </span>
          </div>
          <div className="ofertasHome__card__info">
            <span className="ofertasHome__card__categoria">
              {oferta.categoria}
            </span>
            <h3 className="ofertasHome__card__nombre">{oferta.nombre}</h3>
            <p className="ofertasHome__card__descripcion">
              {oferta.descripcion}
            </p>
            <div className="ofertasHome__card__precios">
              <span className="ofertasHome__card__precioOferta">
                ${oferta.precioOferta.toFixed(2)}
              </span>
              <span className="ofertasHome__card__precioOriginal">
                ${oferta.precioOriginal.toFixed(2)}
              </span>
              <span className="ofertasHome__card__ahorro">
                ¡Ahorra ${oferta.ahorro.toFixed(2)}!
              </span>
            </div>
            <div className="ofertasHome__card__stock">
              <span className="stock">Stock: {oferta.stock}</span>
              <span className="pocasUnidades">Quedan pocas unidades</span>
            </div>
            <button className="ofertasHome__card__boton">
              Ver Oferta Especial
            </button>
          </div>
        </article>
        {total > 1 && (
          <button
            className="ofertasHome__arrow right"
            onClick={siguiente}
            aria-label="Siguiente"
          >
            &#62;
          </button>
        )}
      </div>
      {total > 1 && (
        <div className="ofertasHome__dots">
          {ofertas.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === actual ? ' active' : ''}`}
            ></span>
          ))}
        </div>
      )}
    </section>
  )
}
