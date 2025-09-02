import './styles/App.css'
import { Layout } from './components/Layout.jsx'
import { Hero } from './components/Hero.jsx'
import { ProductosDestacados } from './components/ProductosDestacados.jsx'
import { CategoriasHome } from './components/CategoriasHome.jsx'
import { BannerHome } from './components/BannerHome.jsx'
import { OfertasHome } from './components/OfertasHome.jsx'

function App() {
  return (
    <>
      <Layout>
        <Hero />
        <ProductosDestacados />
        <CategoriasHome />
        <OfertasHome />
        <BannerHome />
      </Layout>
    </>
  )
}

export default App
