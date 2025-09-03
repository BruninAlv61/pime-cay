import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorias, getProductos } from '../services/productos'
import '../styles/Categorias.css'

export function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [cats, prods] = await Promise.all([
          getCategorias(),
          getProductos()
        ])
        setCategorias(cats)
        setProductos(prods)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Contar productos por idCategoria
  const productosPorCategoria = productos.reduce((acc, prod) => {
    if (prod.idCategoria) {
      acc[prod.idCategoria] = (acc[prod.idCategoria] || 0) + 1
    }
    return acc
  }, {})

  return (
    <section className="categorias">
      {/* Header Hero */}
      <div className="categorias__hero">
        <h1 className="categorias__hero__title">Explora Nuestras Categorías</h1>
        <p className="categorias__hero__subtitle">
          Encuentra exactamente lo que buscas navegando por nuestras categorías
          cuidadosamente organizadas.
        </p>
      </div>

      {loading && (
        <p style={{ textAlign: 'center', margin: '2rem 0' }}>
          Cargando categorías...
        </p>
      )}
      {error && (
        <p style={{ color: 'red', textAlign: 'center', margin: '2rem 0' }}>
          {error}
        </p>
      )}

      <div className="categorias__list">
        {categorias.map((cat) => (
          <div className="categorias__card" key={cat.idCategoria}>
            <div className="categorias__card__imgWrapper">
              <img
                src={cat.imagen || '/placeholder-categoria.jpg'}
                alt={cat.nombre}
                className="categorias__card__img"
              />
              <span className="categorias__card__productos">
                {productosPorCategoria[cat.idCategoria] || 0} productos
              </span>
            </div>
            <div className="categorias__card__info">
              <span className="categorias__card__nombre">{cat.nombre}</span>
              <span className="categorias__card__desc">{cat.descripcion}</span>
              <Link
                to={`/productos?categoria=${encodeURIComponent(cat.nombre)}`}
                className="categorias__card__boton"
              >
                Explorar {cat.nombre}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
