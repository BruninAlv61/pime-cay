import { Hero } from '../components/Hero.jsx'
import { ProductosDestacados } from '../components/ProductosDestacados.jsx'
import { CategoriasHome } from '../components/CategoriasHome.jsx'
import { BannerHome } from '../components/BannerHome.jsx'
import { OfertasHome } from '../components/OfertasHome.jsx'

function Home() {
  return (
    <>
      <Hero />
      <ProductosDestacados />
      <CategoriasHome />
      <OfertasHome />
      <BannerHome />
    </>
  )
}

export default Home
