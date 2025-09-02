import './styles/App.css'
import { Layout } from './components/Layout.jsx'
import { Hero } from './components/Hero.jsx'
import { ProductosDestacados } from './components/ProductosDestacados.jsx'

function App() {
  return (
    <>
      <Layout>
        <Hero />
        <ProductosDestacados />
      </Layout>
    </>
  )
}

export default App
