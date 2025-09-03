import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import { Productos } from './pages/Productos.jsx'
import { Ofertas } from './pages/Ofertas.jsx'
import { Categorias } from './pages/Categorias.jsx'
import { ProductosVerDetalles } from './pages/ProductosVerDetalles.jsx'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos/:id" element={<ProductosVerDetalles />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
