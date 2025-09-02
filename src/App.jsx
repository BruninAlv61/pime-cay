import './styles/App.css'
import { Layout } from './components/Layout.jsx'
import { Hero } from './components/Hero.jsx'
import { ProductosDestacados } from './components/ProductosDestacados.jsx'
import { CategoriasHome } from './components/CategoriasHome.jsx'

function App() {
  return (
    <>
      <Layout>
        <Hero />
        <ProductosDestacados />
        <CategoriasHome />
      </Layout>
    </>
  )
}

export default App
