import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import { Productos } from './pages/Productos.jsx'
import { Ofertas } from './pages/Ofertas.jsx'
import { Categorias } from './pages/Categorias.jsx'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
