import '../styles/BannerHome.css'

export function BannerHome() {
  return (
    <section className="banner-home">
      <h2 className="banner-home__title">Tu Estilo, Tu Personalidad</h2>
      <p className="banner-home__desc">
        En PIME CAY creemos que la moda es una forma de expresión personal.
        Nuestras prendas están diseñadas para que reflejes tu personalidad única
        y te sientas cómoda siendo auténticamente tú.
      </p>
      <div className="banner-home__features">
        <div className="banner-home__feature">
          <span className="banner-home__icon banner-home__icon--pink">
            {/* SVG escudo */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#FFE6F7" />
              <path
                d="M20 12L28 15V21C28 26.25 20 29 20 29C20 29 12 26.25 12 21V15L20 12Z"
                stroke="#EF55E6"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className="banner-home__feature-title">Diseño Único</h3>
          <p className="banner-home__feature-desc">
            Cada prenda refleja tu personalidad única y estilo individual.
          </p>
        </div>
        <div className="banner-home__feature">
          <span className="banner-home__icon banner-home__icon--blue">
            {/* SVG escudo azul */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#E1F5FD" />
              <path
                d="M20 12L28 15V21C28 26.25 20 29 20 29C20 29 12 26.25 12 21V15L20 12Z"
                stroke="#7ec2f1"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className="banner-home__feature-title">Calidad Premium</h3>
          <p className="banner-home__feature-desc">
            Materiales de alta calidad que duran y se sienten increíbles.
          </p>
        </div>
        <div className="banner-home__feature">
          <span className="banner-home__icon banner-home__icon--pink">
            {/* SVG de atención personalizada (icono de chat o usuario) */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#FFE6F7" />
              <g stroke="#EF55E6" strokeWidth="2" strokeLinejoin="round">
                <circle cx="20" cy="18" r="5" />
                <path d="M12 30c0-4.418 3.582-8 8-8s8 3.582 8 8" />
              </g>
            </svg>
          </span>
          <h3 className="banner-home__feature-title">Atención Personalizada</h3>
          <p className="banner-home__feature-desc">
            Te acompañamos en cada paso: asesoría y soporte para que tu
            experiencia sea única.
          </p>
        </div>
      </div>
    </section>
  )
}
