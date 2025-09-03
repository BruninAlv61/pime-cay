import '../styles/ProductosDestacados.css'
import { useEffect, useState } from 'react'
import { getProductos, getCategorias } from '../services/productos'
import { Link } from 'react-router-dom'

export function ProductosDestacados() {
  const [productos, setProductos] = useState([])
  const [categoriasMap, setCategoriasMap] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [prods, cats] = await Promise.all([
          getProductos(),
          getCategorias()
        ])
        // Solo los primeros 4 como destacados
        setProductos(prods.slice(0, 4))

        // Crear mapa de categorías usando el idCategoria correcto
        const map = {}
        cats.forEach((c) => {
          map[c.idCategoria] = c.nombre
        })
        setCategoriasMap(map)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="productosDestacados">
        <header className="productosDestacados__header">
          <div className="productosDestacados__header__title">
            <h2>Productos Destacados</h2>
            <Link to="productos">Ver todos los productos</Link>
          </div>
          <div className="productosDestacados__header__subtitle">
            <p>
              Descubre nuestras piezas más populares, diseñadas para que te
              sientas increíble en cada momento.
            </p>
          </div>
        </header>
        <article className="productosDestacados__list">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Cargando productos destacados...</p>
          </div>
        </article>
      </section>
    )
  }

  if (error) {
    return (
      <section className="productosDestacados">
        <header className="productosDestacados__header">
          <div className="productosDestacados__header__title">
            <h2>Productos Destacados</h2>
            <Link to="productos">Ver todos los productos</Link>
          </div>
          <div className="productosDestacados__header__subtitle">
            <p>
              Descubre nuestras piezas más populares, diseñadas para que te
              sientas increíble en cada momento.
            </p>
          </div>
        </header>
        <article className="productosDestacados__list">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Error al cargar productos: {error}</p>
          </div>
        </article>
      </section>
    )
  }

  return (
    <section className="productosDestacados">
      <header className="productosDestacados__header">
        <div className="productosDestacados__header__title">
          <h2>Productos Destacados</h2>
          <Link to="productos">Ver todos los productos</Link>
        </div>
        <div className="productosDestacados__header__subtitle">
          <p>
            Descubre nuestras piezas más populares, diseñadas para que te
            sientas increíble en cada momento.
          </p>
        </div>
      </header>

      <article className="productosDestacados__list">
        {productos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No hay productos destacados disponibles</p>
          </div>
        ) : (
          productos.map((producto) => {
            const imagenUrl = Array.isArray(producto.imagen)
              ? producto.imagen[0]
              : producto.imagen || '/placeholder-product.jpg'

            // Obtener nombre de categoría del mapa
            const categoriaNombre =
              producto.idCategoria && categoriasMap[producto.idCategoria]
                ? categoriasMap[producto.idCategoria]
                : 'Sin categoría'

            return (
              <div
                key={producto.idProducto}
                className="productosDestacados__list__item"
              >
                <img
                  className="productosDestacados__list__itemImage"
                  src={imagenUrl}
                  alt={producto.nombre}
                />
                <div className="productosDestacados__list__itemContent">
                  <div className="productosDestacados__list__itemContent__text">
                    <span className="tag">{categoriaNombre}</span>
                    <h4>{producto.nombre}</h4>
                    <p className="description">{producto.descripcion}</p>
                  </div>
                  <div className="productosDestacados__list__itemContent__price">
                    <p>${producto.precio}</p>
                    <span>Stock: {producto.stock}</span>
                  </div>
                  <Link
                    to={`/productos/${producto.idProducto}`}
                    className="productosDestacados__list__itemContent__verDetalles"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </article>
    </section>
  )
}
