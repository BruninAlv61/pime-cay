import '../styles/CategoriasHome.css'
import { useCategoriasHome } from '../hooks/useCategoriasHome.js'
import { Link } from 'react-router-dom'

export function CategoriasHome() {
  const { categorias, loading, error } = useCategoriasHome()

  if (loading) {
    return (
      <section className="categoriasHome">
        <header className="categoriasHome__header">
          <div className="categoriasHome__header__title">
            <h3>Explora por Categorías</h3>
            <Link to="categorias">Ver todas las categorías</Link>
          </div>
          <div className="categoriasHome__header__description">
            <p>
              Encuentra exactamente lo que buscas en nuestras categorías
              cuidadosamente organizadas.
            </p>
          </div>
        </header>
        <article className="categoriasHome__list">
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              gridColumn: '1 / -1'
            }}
          >
            <p>Cargando categorías...</p>
          </div>
        </article>
      </section>
    )
  }

  if (error) {
    return (
      <section className="categoriasHome">
        <header className="categoriasHome__header">
          <div className="categoriasHome__header__title">
            <h3>Explora por Categorías</h3>
            <Link to="categorias">Ver todas las categorías</Link>
          </div>
          <div className="categoriasHome__header__description">
            <p>
              Encuentra exactamente lo que buscas en nuestras categorías
              cuidadosamente organizadas.
            </p>
          </div>
        </header>
        <article className="categoriasHome__list">
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              gridColumn: '1 / -1'
            }}
          >
            <p>Error al cargar categorías: {error}</p>
          </div>
        </article>
      </section>
    )
  }

  return (
    <section className="categoriasHome">
      <header className="categoriasHome__header">
        <div className="categoriasHome__header__title">
          <h3>Explora por Categorías</h3>
          <Link to="categorias">Ver todas las categorías</Link>
        </div>
        <div className="categoriasHome__header__description">
          <p>
            Encuentra exactamente lo que buscas en nuestras categorías
            cuidadosamente organizadas.
          </p>
        </div>
      </header>
      <article className="categoriasHome__list">
        {categorias.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              gridColumn: '1 / -1'
            }}
          >
            <p>No hay categorías disponibles</p>
          </div>
        ) : (
          categorias.map((categoria) => (
            <Link
              to={`/productos?categoria=${encodeURIComponent(
                categoria.categoriaNombre
              )}`}
              key={categoria.categoriaId}
              style={{
                background: `url(${categoria.categoriaImagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              className="categoriasHome__list__item"
            >
              <h4>{categoria.categoriaNombre}</h4>
              <p>{categoria.categoriaDescripcion}</p>
            </Link>
          ))
        )}
      </article>
    </section>
  )
}
