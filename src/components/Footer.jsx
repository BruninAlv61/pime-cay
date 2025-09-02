import '../styles/Footer.css'

export function Footer() {
  return (
    <footer className="footer">
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
            <a
              className="footer__socialLink"
              href="https://instagram.com"
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
            </a>
          </div>
        </div>
        <div className="footer__links">
          <div className="footer__section">
            <span className="footer__sectionTitle">Categorías</span>
            <ul className="footer__list">
              <li>
                <a href="#">Vestidos</a>
              </li>
              <li>
                <a href="#">Tops</a>
              </li>
              <li>
                <a href="#">Faldas</a>
              </li>
              <li>
                <a href="#">Accesorios</a>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <span className="footer__sectionTitle">Ayuda</span>
            <ul className="footer__list">
              <li>
                <a href="#">Guía de Tallas</a>
              </li>
              <li>
                <a href="#">Envíos</a>
              </li>
              <li>
                <a href="#">Devoluciones</a>
              </li>
              <li>
                <a href="#">Contacto</a>
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
