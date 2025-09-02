import '../styles/Layout.css'

export function Layout({ children }) {
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
              <a href="#">Inicio</a>
            </li>
            <li className="layoutHeader__navItem">
              <a href="#">Productos</a>
            </li>
            <li className="layoutHeader__navItem">
              <a href="#">Categorías</a>
            </li>
            <li className="layoutHeader__navItem">
              <a href="#">Ofertas</a>
            </li>
          </ul>
        </nav>
        <a className="layoutHeader__contact" href="#">
          Contacto
        </a>
      </header>
      <main className="main">{children}</main>
    </>
  )
}
