import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductos } from '../services/productos.js'
import { getCategorias } from '../services/categorias.js'
import '../styles/ProductoDetalles.css'

export function ProductosVerDetalles() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [relacionados, setRelacionados] = useState([])
  const [categoriasMap, setCategoriasMap] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [productos, categorias] = await Promise.all([
          getProductos(),
          getCategorias()
        ])
        const prod = productos.find((p) => String(p.idProducto) === String(id))
        setProducto(prod)

        // Crear un mapa para lookup rápido por idCategoria
        const map = {}
        categorias.forEach((c) => {
          map[c.idCategoria] = c.nombre
        })
        setCategoriasMap(map)

        if (prod) {
          const rel = productos.filter(
            (p) =>
              p.idCategoria === prod.idCategoria &&
              p.idProducto !== prod.idProducto
          )
          setRelacionados(rel)
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
  if (!producto)
    return (
      <div className="productoDetalles__notfound">Producto no encontrado</div>
    )

  const imagenes = Array.isArray(producto.imagen)
    ? producto.imagen
    : [producto.imagen]

  // Obtener nombre de la categoría
  const categoriaNombre =
    producto.idCategoria && categoriasMap[producto.idCategoria]
      ? categoriasMap[producto.idCategoria]
      : 'Sin categoría'

  // Si producto.talle es un array de objetos con stock, lo usamos, si no, mostramos solo el stock general
  let tallasConStock = null
  if (
    Array.isArray(producto.talle) &&
    producto.talle.length > 0 &&
    producto.talle[0].talle
  ) {
    tallasConStock = producto.talle
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
              >
                &lt;
              </button>
            )}
            <img
              src={imagenes[imgIdx]}
              alt={producto.nombre}
              className="productoDetalles__img"
            />
            {imagenes.length > 1 && (
              <button
                className="productoDetalles__arrow productoDetalles__arrow--right"
                onClick={() => setImgIdx((imgIdx + 1) % imagenes.length)}
              >
                &gt;
              </button>
            )}
          </div>
          <div className="productoDetalles__thumbnails">
            {imagenes.map((img, i) => (
              <img
                key={img + '-' + i}
                src={img}
                alt={producto.nombre + ' miniatura ' + (i + 1)}
                className={
                  'productoDetalles__thumbnail' +
                  (imgIdx === i ? ' productoDetalles__thumbnail--active' : '')
                }
                onClick={() => setImgIdx(i)}
              />
            ))}
          </div>
        </div>
        <div className="productoDetalles__info">
          <div className="productoDetalles__top">
            {producto.descuento && (
              <span className="productoDetalles__descuento">
                -{producto.descuento}%
              </span>
            )}
            <span className="productoDetalles__categoria">
              {categoriaNombre}
            </span>
            <span className="productoDetalles__stock">
              En Stock ({producto.stock})
            </span>
          </div>
          <h2 className="productoDetalles__nombre">{producto.nombre}</h2>
          <div className="productoDetalles__precios">
            <span className="productoDetalles__precio">
              $
              {producto.precio
                ? producto.precio.toFixed(2)
                : producto.precioOferta?.toFixed(2)}
            </span>
            {producto.precioOriginal &&
              producto.precioOriginal !== producto.precio && (
                <span className="productoDetalles__precioOriginal">
                  ${producto.precioOriginal.toFixed(2)}
                </span>
              )}
          </div>
          <div className="productoDetalles__desc">{producto.descripcion}</div>
          <div className="productoDetalles__opciones">
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
                  {producto.stock}
                </span>
              </div>
            )}
          </div>
          <a
            href="https://wa.me/91138909080"
            className="productoDetalles__comprar"
          >
            Contactar para Comprar
          </a>
        </div>
      </div>
      {relacionados.length > 0 && (
        <div className="productoDetalles__relacionados">
          <h3 className="productoDetalles__relacionados__title">
            Productos Relacionados
          </h3>
          <div className="productoDetalles__relacionados__list">
            {relacionados.map((prod) => {
              const categoriaNombreRel =
                prod.idCategoria && categoriasMap[prod.idCategoria]
                  ? categoriasMap[prod.idCategoria]
                  : 'Sin categoría'

              return (
                <Link
                  to={`/productos/${prod.idProducto}`}
                  key={prod.idProducto}
                  className="productoDetalles__relacionados__card"
                >
                  <img
                    src={
                      Array.isArray(prod.imagen) ? prod.imagen[0] : prod.imagen
                    }
                    alt={prod.nombre}
                    className="productoDetalles__relacionados__img"
                  />
                  <div className="productoDetalles__relacionados__info">
                    <span className="productoDetalles__relacionados__categoria">
                      {categoriaNombreRel}
                    </span>
                    <span className="productoDetalles__relacionados__nombre">
                      {prod.nombre}
                    </span>
                    <span className="productoDetalles__relacionados__precio">
                      $
                      {prod.precio
                        ? prod.precio.toFixed(2)
                        : prod.precioOferta?.toFixed(2)}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
