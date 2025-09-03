import { useEffect, useState } from 'react'
import { getProductos, getCategorias } from '../services/productos'
import { Link, useSearchParams } from 'react-router-dom'
import '../styles/Productos.css'

export function Productos() {
  const [searchParams] = useSearchParams()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriasMap, setCategoriasMap] = useState({})
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
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
        setProductos(prods)

        if (cats.length > 0) {
          // Agregar categoría "Todos" al inicio
          setCategorias([{ nombre: 'Todos', idCategoria: 'todos' }, ...cats])

          // Crear un mapa para lookup rápido por idCategoria
          const map = {}
          cats.forEach((c) => {
            map[c.idCategoria] = c.nombre
          })
          setCategoriasMap(map)
        } else {
          // Fallback si no hay categorías
          setCategorias([{ nombre: 'Todos', idCategoria: 'todos' }])
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // useEffect separado para manejar los parámetros de URL
  useEffect(() => {
    const categoriaFromURL = searchParams.get('categoria')
    if (categoriaFromURL) {
      setCategoriaActiva(categoriaFromURL)
    }
  }, [searchParams])

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoriaActiva('Todos')
  }

  // Verificar si hay filtros activos
  const hayFiltrosActivos = busqueda !== '' || categoriaActiva !== 'Todos'

  // Filtro por categoría y búsqueda
  const productosFiltrados = productos.filter((prod) => {
    // Obtener el nombre de la categoría del producto
    const catNombre =
      prod.idCategoria && categoriasMap[prod.idCategoria]
        ? categoriasMap[prod.idCategoria]
        : 'Sin categoría'

    const matchCategoria =
      categoriaActiva === 'Todos' || catNombre === categoriaActiva
    const matchBusqueda = prod.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    return matchCategoria && matchBusqueda
  })

  return (
    <section style={{ backgroundColor: '#ffff', padding: 0, margin: 0 }}>
      {/* Header Hero */}
      <div className="productos__hero">
        <h1 className="productos__hero__title">Todos Nuestros Productos</h1>
        <p className="productos__hero__subtitle">
          Explora nuestra colección completa de ropa y accesorios únicos
          diseñados para expresar tu personalidad.
        </p>
      </div>

      {/* Filtros */}
      <div className="productos__filtros">
        <div className="productos__filtros__container">
          <div className="productos__filtros__busqueda">
            <span style={{ color: '#aaa' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="#aaa"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"
                />
              </svg>
            </span>
            <input
              type="text"
              className="productos__filtros__input"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <button
            className="productos__filtros__boton"
            onClick={limpiarFiltros}
            title="Limpiar todos los filtros"
            style={{
              opacity: hayFiltrosActivos ? 1 : 0.6,
              backgroundColor: hayFiltrosActivos ? '#ff6b6b' : '#f0f0f0',
              color: hayFiltrosActivos ? 'white' : '#3a3a3a'
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M3 6h18M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"
              />
            </svg>
            Limpiar Filtros
          </button>
          <div style={{ flex: 1 }} />
          <div className="productos__categorias">
            {categorias.map((cat) => (
              <button
                key={cat.idCategoria}
                onClick={() => setCategoriaActiva(cat.nombre)}
                className={
                  'productos__categoria' +
                  (categoriaActiva === cat.nombre
                    ? ' productos__categoria--activa'
                    : '')
                }
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="productos__listado">
        {loading && (
          <p style={{ textAlign: 'center' }}>Cargando productos...</p>
        )}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {!loading && (
          <>
            {hayFiltrosActivos && (
              <div
                style={{
                  textAlign: 'center',
                  margin: '20px 0',
                  color: '#666',
                  fontSize: '14px'
                }}
              >
                Mostrando {productosFiltrados.length} de {productos.length}{' '}
                productos
                {categoriaActiva !== 'Todos' && ` en "${categoriaActiva}"`}
                {busqueda && ` que contienen "${busqueda}"`}
              </div>
            )}
            {productosFiltrados.length === 0 && (
              <p style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>
                No se encontraron productos.
              </p>
            )}
          </>
        )}
        <div className="productos__cards">
          {productosFiltrados.map((prod) => {
            // Obtener nombre de categoría
            const categoriaNombre =
              prod.idCategoria && categoriasMap[prod.idCategoria]
                ? categoriasMap[prod.idCategoria]
                : 'Sin categoría'

            // Procesar talles
            let tallesTexto = 'No especificado'
            if (Array.isArray(prod.talle) && prod.talle.length > 0) {
              tallesTexto = prod.talle.map((t) => t.talle).join(' ')
            } else if (prod.talles && Array.isArray(prod.talles)) {
              tallesTexto = prod.talles.join(' ')
            } else if (typeof prod.talle === 'string') {
              tallesTexto = prod.talle
            }

            return (
              <div key={prod.idProducto} className="productos__card">
                <div className="productos__card__imgContainer">
                  {prod.descuento && (
                    <span className="productos__card__descuento">
                      -{prod.descuento}%
                    </span>
                  )}
                  <img
                    src={
                      Array.isArray(prod.imagen) ? prod.imagen[0] : prod.imagen
                    }
                    alt={prod.nombre}
                    className="productos__card__img"
                  />
                </div>
                <div className="productos__card__content">
                  <span className="productos__card__categoria">
                    {categoriaNombre}
                  </span>
                  <h4 className="productos__card__nombre">{prod.nombre}</h4>
                  <div className="productos__card__desc">
                    {prod.descripcion}
                  </div>
                  <div className="productos__card__precios">
                    <span className="productos__card__precio">
                      $
                      {prod.precio
                        ? prod.precio.toFixed(2)
                        : prod.precioOferta?.toFixed(2)}
                    </span>
                    {prod.precioOriginal &&
                      prod.precioOriginal !== prod.precio && (
                        <span className="productos__card__precioOriginal">
                          ${prod.precioOriginal.toFixed(2)}
                        </span>
                      )}
                    <span className="productos__card__stock">
                      Stock: {prod.stock}
                    </span>
                  </div>
                  <div className="productos__card__talles">
                    Talles disponibles: {tallesTexto}
                  </div>
                  <Link
                    to={`/productos/${prod.idProducto}`}
                    className="productos__card__boton"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
