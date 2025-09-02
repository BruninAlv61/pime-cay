import '../styles/OfertasHome.css'
import { useState } from 'react'

const ofertas = [
  {
    id: 1,
    categoria: 'Vestidos',
    nombre: 'Vestido Power Pink',
    descripcion: 'Vestido casual perfecto para cualquier ocasión',
    precioOferta: 89.99,
    precioOriginal: 112.49,
    ahorro: 22.5,
    stock: 15,
    imagen:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/mujer-vestido-rosa-casual-koHz0nTilhffnqt2Vv9hc1HkHHZuQo.png',
    oferta: '¡OFERTA! -20%',
    tiempo: 'Tiempo limitado',
    destacado: true
  },
  {
    id: 2,
    categoria: 'Blusas',
    nombre: 'Blusa Summer Breeze',
    descripcion: 'Blusa fresca y cómoda para el verano',
    precioOferta: 49.99,
    precioOriginal: 62.49,
    ahorro: 12.5,
    stock: 8,
    imagen:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    oferta: '¡OFERTA! -20%',
    tiempo: 'Tiempo limitado',
    destacado: false
  }
]

export function OfertasHome() {
  const [actual, setActual] = useState(0)
  const total = ofertas.length

  const siguiente = () => setActual((prev) => (prev + 1) % total)
  const anterior = () => setActual((prev) => (prev - 1 + total) % total)

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
        <button
          className="ofertasHome__arrow left"
          onClick={anterior}
          aria-label="Anterior"
        >
          &#60;
        </button>
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
        <button
          className="ofertasHome__arrow right"
          onClick={siguiente}
          aria-label="Siguiente"
        >
          &#62;
        </button>
      </div>
      <div className="ofertasHome__dots">
        {ofertas.map((_, idx) => (
          <span
            key={idx}
            className={`dot${idx === actual ? ' active' : ''}`}
          ></span>
        ))}
      </div>
    </section>
  )
}
