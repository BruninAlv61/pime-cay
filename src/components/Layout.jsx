import '../styles/Layout.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer.jsx'

export function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <header className="layoutHeader">
        <img
          className="layoutHeader__img"
          src="/logo.png"
          alt="Logo de PIME-CAY, es una imagen de las Chicas Super poderosas con el texto 'PIME-CAY, Las Chicas de la Guardia'"
        />
        <nav className="layoutHeader__nav">
          <ul className="layoutHeader__navList">
            <li className="layoutHeader__navItem">
              <Link to="/">Inicio</Link>
            </li>
            <li className="layoutHeader__navItem">
              <Link to="/productos">Productos</Link>
            </li>
            <li className="layoutHeader__navItem">
              <Link to="/categorias">Categorías</Link>
            </li>
            <li className="layoutHeader__navItem">
              <Link to="/ofertas">Ofertas</Link>
            </li>
          </ul>
        </nav>
        <a className="layoutHeader__contact" href="#contacto">
          Contacto
        </a>
      </header>
      <main className="main">{children}</main>
      <Footer />
    </>
  )
}
