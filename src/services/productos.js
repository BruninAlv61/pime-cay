// src/services/productos.js
const API_URL = 'http://localhost:3000/productos'

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

// Actualizar el service de categorías existente para que funcione con la nueva estructura
export const getCategorias = async () => {
  try {
    const response = await fetch('http://localhost:3000/categorias')
    const json = await response.json()
    // Retornamos el array de categorías
    return json.categorias || []
  } catch {
    throw new Error('Error al obtener las categorías')
  }
}

// Servicio para obtener ofertas con datos completos del producto
export const getOfertas = async () => {
  try {
    const [ofertasResponse, productosResponse] = await Promise.all([
      fetch('http://localhost:3000/ofertas'),
      fetch(API_URL)
    ])
    
    const ofertasData = await ofertasResponse.json()
    const productosData = await productosResponse.json()
    
    const ofertas = ofertasData.ofertas || []
    const productos = productosData.productos || []
    
    // Combinar ofertas con datos de productos
    const ofertasConProductos = ofertas.map(oferta => {
      const producto = productos.find(p => p.idProducto === oferta.idProducto)
      if (!producto) return null
      
      const precioOriginal = producto.precio
      const precioOferta = precioOriginal * (1 - oferta.descuento / 100)
      const ahorro = precioOriginal - precioOferta
      
      // Manejar imagen que puede ser string o array
      const imagenUrl = Array.isArray(producto.imagen) 
        ? producto.imagen[0] 
        : producto.imagen || '/placeholder-product.jpg'
      
      return {
        id: oferta.idOferta,
        idProducto: oferta.idProducto,
        categoria: 'Productos', // Por defecto, ya que no tenemos categoría en el response
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precioOferta: precioOferta,
        precioOriginal: precioOriginal,
        ahorro: ahorro,
        descuento: oferta.descuento,
        stock: producto.stock,
        imagen: imagenUrl,
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