import '../styles/Hero.css'
export function Hero() {
  return (
    <>
      <section className="hero">
        <h1 className="hero__title">Expresa tu Estilo Único</h1>
        <p className="hero__subtitle">
          Descubre ropa y accesorios únicos que reflejan tu personalidad
          auténtica. <br /> Cada prenda está diseñada para resaltar tu estilo
          individual y hacerte sentir increíble.
        </p>
        <div className="hero__actions">
          <a className="hero__link" href="#">
            Explorar Colección
          </a>
          <a className="hero__link hero__link--offers" href="#">
            Ver Ofertas Especiales
          </a>
        </div>
      </section>
    </>
  )
}
