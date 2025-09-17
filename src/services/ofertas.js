// src/services/ofertas.js
const API_URL = 'https://pime-cay-api.onrender.com'

export const getOfertas = async () => {
  try {
    const [ofertasResponse, productosResponse, categoriasResponse] = await Promise.all([
      fetch(`${API_URL}/ofertas`),
      fetch(`${API_URL}/productos`),
      fetch(`${API_URL}/categorias`)
    ])
    
    const ofertasData = await ofertasResponse.json()
    const productosData = await productosResponse.json()
    const categoriasData = await categoriasResponse.json()
    
    const ofertas = ofertasData.ofertas || []
    const productos = productosData.productos || []
    const categorias = categoriasData.categorias || []
    
    // Crear mapa de categorías
    const categoriasMap = {}
    categorias.forEach(cat => {
      categoriasMap[cat.categoriaId] = cat.categoriaNombre
    })
    
    // Combinar ofertas con datos de productos
    const ofertasConProductos = ofertas.map(oferta => {
      const producto = productos.find(p => p.idProducto === oferta.idProducto)
      if (!producto) return null
      
      const precioOriginal = producto.precio
      const precioOferta = precioOriginal * (1 - oferta.descuento / 100)
      const ahorro = precioOriginal - precioOferta
      
      const imagenPrincipal = Array.isArray(producto.imagen) 
        ? producto.imagen[0] 
        : producto.imagen || '/placeholder-product.jpg'
      
      // Para detalles (OfertasVerDetalles.jsx) preservamos todas las imágenes
      const todasLasImagenes = Array.isArray(producto.imagen) 
        ? producto.imagen 
        : [producto.imagen || '/placeholder-product.jpg']
      
      // Obtener nombre de la categoría
      const categoriaNombre = producto.idCategoria && categoriasMap[producto.idCategoria] 
        ? categoriasMap[producto.idCategoria] 
        : 'Sin categoría'
      
      return {
        id: oferta.idOferta,
        idProducto: oferta.idProducto,
        categoria: categoriaNombre,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precioOferta: precioOferta,
        precioOriginal: precioOriginal,
        ahorro: ahorro,
        descuento: oferta.descuento,
        stock: producto.stock,
        imagen: imagenPrincipal,
        imagenes: todasLasImagenes,
        talle: producto.talle,
        oferta: `¡OFERTA! -${oferta.descuento}%`,
        tiempo: 'Tiempo limitado',
        destacado: true
      }
    }).filter(Boolean)
    
    return ofertasConProductos
  } catch {
    throw new Error('Error al obtener las ofertas')
  }
}