import '../styles/Footer.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategorias } from '../services/productos'

export function Footer() {
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const cats = await getCategorias()
        setCategorias(cats)
      } catch {
        setError('No se pudieron cargar las categorías')
      }
    }
    fetchCategorias()
  }, [])

  return (
    <footer className="footer" id="contacto">
      <div className="footer__container">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/logo.png"
            alt="Logo de PIME-CAY, Las Chicas de la Guardia"
          />
          <p className="footer__desc">
            Expresando personalidades únicas a través de la moda desde 2025.
          </p>
          <div className="footer__social">
            <span className="footer__socialTitle">Síguenos</span>
            <Link
              className="footer__socialLink"
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="footer__icon"
                src="/instagram.svg"
                alt="Instagram"
                width={22}
                height={22}
              />
              Instagram
            </Link>
          </div>
        </div>
        <div className="footer__links">
          <div className="footer__section">
            <span className="footer__sectionTitle">Categorías</span>
            <ul className="footer__list">
              {error && <li style={{ color: 'red', fontSize: 13 }}>{error}</li>}
              {categorias.length === 0 && !error && <li>Cargando...</li>}
              {categorias.map((cat) => (
                <li key={cat.idCategoria}>
                  <Link
                    to={`/productos?categoria=${encodeURIComponent(
                      cat.nombre
                    )}`}
                  >
                    {cat.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__section">
            <span className="footer__sectionTitle">Ayuda</span>
            <ul className="footer__list">
              <li>
                <a href="#">Guía de Tallas</a>
              </li>
              <li>
                <a href="#">Devoluciones</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <span className="footer__sectionTitle">Contáctame</span>
            <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
              <input
                className="footer__input"
                type="email"
                placeholder="tucorreo@email.com"
                required
              />
              <textarea
                className="footer__textarea"
                placeholder="Introduzca su mensaje"
                required
              />
              <button className="footer__button" type="submit">
                ENVIAR
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <hr className="footer__divider" />
        <p className="footer__copyright">
          © 2025 PIME CAY – Las Chicas de la Guardia. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
