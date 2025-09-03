import '../styles/Footer.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategorias } from '../services/productos'
import { useForm, ValidationError } from '@formspree/react'

export function Footer() {
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)

  const [state, handleSubmit] = useForm('xzzakbek')

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
              to="https://www.instagram.com/pimecaylaschicasdelaguardia"
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
            {state.succeeded ? (
              <div className="footer__success">
                <p>¡Gracias por tu mensaje! Te responderemos pronto.</p>
              </div>
            ) : (
              <form className="footer__form" onSubmit={handleSubmit}>
                <input
                  className="footer__input"
                  type="email"
                  name="email"
                  placeholder="tucorreo@email.com"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <textarea
                  className="footer__textarea"
                  name="message"
                  placeholder="Introduzca su mensaje"
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
                <button
                  className="footer__button"
                  type="submit"
                  disabled={state.submitting}
                >
                  {state.submitting ? 'ENVIANDO...' : 'ENVIAR'}
                </button>
              </form>
            )}
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
