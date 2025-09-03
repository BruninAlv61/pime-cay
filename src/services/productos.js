// src/services/productos.js
const API_URL = 'http://localhost:3000/productos'

// Obtener todos los productos (TODOS, sin límites)
export const getProductos = async () => {
  try {
    const response = await fetch(API_URL)
    const json = await response.json()
    return json.productos || []
  } catch {
    throw new Error('Error al obtener los productos')
  }
}

export const getProductosDestacados = async () => {
  try {
    const response = await fetch(API_URL)
    const json = await response.json()
    // Retornamos el array de productos, limitando a los primeros 4 para destacados
    return json.productos ? json.productos.slice(0, 4) : []
  } catch {
    throw new Error('Error al obtener los productos destacados')
  }
}

// Servicio corregido para obtener categorías
export const getCategorias = async () => {
  try {
    const response = await fetch('http://localhost:3000/categorias')
    const json = await response.json()
    
    // Mapear las categorías al formato esperado por los componentes
    const categoriasFormateadas = (json.categorias || []).map(cat => ({
      idCategoria: cat.categoriaId, // Mapear categoriaId a idCategoria
      nombre: cat.categoriaNombre,  // Mapear categoriaNombre a nombre
      descripcion: cat.categoriaDescripcion,
      imagen: cat.categoriaImagen
    }))
    
    return categoriasFormateadas
  } catch {
    throw new Error('Error al obtener las categorías')
  }
}

// Servicio para obtener ofertas con datos completos del producto
export const getOfertas = async () => {
  try {
    const [ofertasResponse, productosResponse, categoriasResponse] = await Promise.all([
      fetch('http://localhost:3000/ofertas'),
      fetch(API_URL),
      fetch('http://localhost:3000/categorias')
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
      
      // ✅ CAMBIO PRINCIPAL: Preservar el array completo de imágenes
      // Para mostrar en tarjetas (Ofertas.jsx) usamos la primera imagen
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
        imagen: imagenPrincipal, // Para las tarjetas de ofertas
        imagenes: todasLasImagenes, // Para el carrusel en detalles
        talle: producto.talle, // Agregar información de tallas
        oferta: `¡OFERTA! -${oferta.descuento}%`,
        tiempo: 'Tiempo limitado',
        destacado: true
      }
    }).filter(Boolean) // Filtrar ofertas sin producto
    
    return ofertasConProductos
  } catch {
    throw new Error('Error al obtener las ofertas')
  }
}