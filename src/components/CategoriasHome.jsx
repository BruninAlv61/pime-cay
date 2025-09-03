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
          categorias.slice(0, 4).map((categoria) => (
            <Link
              to={`/productos?categoria=${encodeURIComponent(
                categoria.categoriaNombre
              )}`}
              key={categoria.categoriaId}
              className="categoriasHome__list__item"
              style={{
                position: 'relative',
                background: `url(${categoria.categoriaImagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '55%',
                  background:
                    'linear-gradient(0deg, rgba(30,30,30,0.60) 70%, rgba(30,30,30,0.0) 100%)',
                  zIndex: 1
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '1.2rem 1rem 0.7rem 1rem',
                  color: '#fff'
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.13)'
                  }}
                >
                  {categoria.categoriaNombre}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '1rem',
                    textShadow: '0 2px 8px rgba(0,0,0,0.13)',
                    height: '40px'
                  }}
                >
                  {categoria.categoriaDescripcion}
                </p>
              </div>
            </Link>
          ))
        )}
      </article>
    </section>
  )
}
