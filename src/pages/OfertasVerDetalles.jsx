// src/pages/OfertasVerDetalles.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOfertas } from '../services/productos'
import '../styles/ProductoDetalles.css'

export function OfertasVerDetalles() {
  const { id } = useParams()
  const [oferta, setOferta] = useState(null)
  const [relacionadas, setRelacionadas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imgIdx, setImgIdx] = useState(0)

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

  if (loading)
    return <div className="productoDetalles__loading">Cargando...</div>
  if (error) return <div className="productoDetalles__error">{error}</div>
  if (!oferta)
    return (
      <div className="productoDetalles__notfound">Oferta no encontrada</div>
    )

  // ✅ CAMBIO PRINCIPAL: Usar la propiedad 'imagenes' que contiene el array completo
  let imagenes = []
  if (oferta.imagenes && Array.isArray(oferta.imagenes)) {
    imagenes = oferta.imagenes
  } else if (oferta.imagen) {
    // Fallback por si acaso
    imagenes = Array.isArray(oferta.imagen) ? oferta.imagen : [oferta.imagen]
  } else {
    imagenes = ['/placeholder-product.jpg']
  }

  // Si producto.talle es un array de objetos con stock, lo usamos, si no, mostramos solo el stock general
  let tallasConStock = null
  if (
    Array.isArray(oferta.talle) &&
    oferta.talle.length > 0 &&
    oferta.talle[0].talle
  ) {
    tallasConStock = oferta.talle
  }

  return (
    <section className="productoDetalles">
      <div className="productoDetalles__main">
        <div className="productoDetalles__galeria">
          <div className="productoDetalles__imgWrapper">
            {imagenes.length > 1 && (
              <button
                className="productoDetalles__arrow productoDetalles__arrow--left"
                onClick={() =>
                  setImgIdx((imgIdx - 1 + imagenes.length) % imagenes.length)
                }
                aria-label="Imagen anterior"
              >
                &lt;
              </button>
            )}
            {imagenes.length > 0 && (
              <img
                src={imagenes[imgIdx]}
                alt={oferta.nombre}
                className="productoDetalles__img"
              />
            )}
            {imagenes.length > 1 && (
              <button
                className="productoDetalles__arrow productoDetalles__arrow--right"
                onClick={() => setImgIdx((imgIdx + 1) % imagenes.length)}
                aria-label="Imagen siguiente"
              >
                &gt;
              </button>
            )}
          </div>
          {/* ✅ Solo mostrar thumbnails si hay más de una imagen */}
          {imagenes.length > 1 && (
            <div className="productoDetalles__thumbnails">
              {imagenes.map((img, i) => (
                <img
                  key={img + '-' + i}
                  src={img}
                  alt={oferta.nombre + ' miniatura ' + (i + 1)}
                  className={
                    'productoDetalles__thumbnail' +
                    (imgIdx === i ? ' productoDetalles__thumbnail--active' : '')
                  }
                  onClick={() => setImgIdx(i)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="productoDetalles__info">
          <div className="productoDetalles__top">
            <span className="productoDetalles__descuento">
              -{oferta.descuento}%
            </span>
            <span className="productoDetalles__categoria">
              {oferta.categoria}
            </span>
            <span className="productoDetalles__stock">
              En Stock ({oferta.stock})
            </span>
          </div>
          <h2 className="productoDetalles__nombre">{oferta.nombre}</h2>
          <div className="productoDetalles__precios">
            <span className="productoDetalles__precio">
              ${oferta.precioOferta.toFixed(2)}
            </span>
            <span className="productoDetalles__precioOriginal">
              ${oferta.precioOriginal.toFixed(2)}
            </span>
          </div>
          <div className="productoDetalles__desc">{oferta.descripcion}</div>
          <div className="productoDetalles__opciones">
            {/* ✅ Manejar tallas igual que en ProductosVerDetalles */}
            {tallasConStock ? (
              <div className="productoDetalles__talles">
                <span>Talla</span>
                <div className="productoDetalles__talles__list">
                  {tallasConStock.map((t) => (
                    <span key={t.talle} className="productoDetalles__talle">
                      {t.talle}{' '}
                      <span className="productoDetalles__talleStock">
                        ({t.stock} disponibles)
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="productoDetalles__talles">
                <span>Stock disponible: </span>
                <span className="productoDetalles__talleStock">
                  {oferta.stock}
                </span>
              </div>
            )}
          </div>
          <button className="productoDetalles__comprar">
            Contactar para Comprar
          </button>
        </div>
      </div>
      {relacionadas.length > 0 && (
        <div className="productoDetalles__relacionados">
          <h3 className="productoDetalles__relacionados__title">
            Otras Ofertas Relacionadas
          </h3>
          <div className="productoDetalles__relacionados__list">
            {relacionadas.map((of) => (
              <Link
                to={`/ofertas/${of.id}`}
                key={of.id}
                className="productoDetalles__relacionados__card"
              >
                <img
                  src={of.imagen} // Usar la imagen principal para las tarjetas
                  alt={of.nombre}
                  className="productoDetalles__relacionados__img"
                />
                <div className="productoDetalles__relacionados__info">
                  <span className="productoDetalles__relacionados__categoria">
                    {of.categoria}
                  </span>
                  <span className="productoDetalles__relacionados__nombre">
                    {of.nombre}
                  </span>
                  <span className="productoDetalles__relacionados__precio">
                    ${of.precioOferta.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
