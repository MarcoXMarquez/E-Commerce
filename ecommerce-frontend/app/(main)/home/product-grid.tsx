"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/button"
import { ChevronDown, Filter } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"

const products = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.8,
    reviewCount: 324,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smartphones",
    isOnSale: true,
  },
  {
    id: "2",
    name: "MacBook Pro 14 M3 Pro",
    price: 2399.99,
    rating: 4.9,
    reviewCount: 156,
    image: "/placeholder.svg?height=400&width=400",
    category: "Laptops",
    isOnSale: false,
  },
  {
    id: "3",
    name: "AirPods Pro 2da Gen",
    price: 249.99,
    originalPrice: 279.99,
    rating: 4.7,
    reviewCount: 892,
    image: "/placeholder.svg?height=400&width=400",
    category: "Audio",
    isOnSale: true,
  },
  {
    id: "4",
    name: "iPad Air 11 M2",
    price: 599.99,
    rating: 4.6,
    reviewCount: 203,
    image: "/placeholder.svg?height=400&width=400",
    category: "Tablets",
    isOnSale: false,
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    price: 399.99,
    originalPrice: 429.99,
    rating: 4.5,
    reviewCount: 445,
    image: "/placeholder.svg?height=400&width=400",
    category: "Wearables",
    isOnSale: true,
  },
  {
    id: "6",
    name: "Samsung Galaxy S24 Ultra",
    price: 1299.99,
    rating: 4.8,
    reviewCount: 267,
    image: "/placeholder.svg?height=400&width=400",
    category: "Smartphones",
    isOnSale: false,
  },
]

const categories = ["Todos", "Smartphones", "Laptops", "Audio", "Tablets", "Wearables"]
const priceRanges = [
  { label: "Todos los precios", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Menos de $300", min: 0, max: 300 },
  { label: "$300 - $600", min: 300, max: 600 },
  { label: "$600 - $1000", min: 600, max: 1000 },
  { label: "Más de $1000", min: 1000, max: Number.POSITIVE_INFINITY },
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [showFilters, setShowFilters] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "Todos" || product.category === selectedCategory
    const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    return categoryMatch && priceMatch
  })

  const handleAddToCart = (productId: string) => {
    if (!user) {
      router.push('/login?redirect=/products')
      return
    }
    // Lógica para añadir al carrito
    console.log(`Producto ${productId} añadido al carrito por ${user?.email}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.role === 'admin' ? 'Panel de Productos' : 'Productos Destacados'}
          </h2>
          <p className="text-gray-600">
            {user?.role === 'admin' 
              ? 'Administra tu catálogo de productos' 
              : 'Descubre nuestra selección premium'}
          </p>
        </div>

        {user?.role === 'admin' && (
          <Button variant="primary" size="sm" className="hidden md:flex">
            Añadir Producto
          </Button>
        )}

        <Button
          variant="ghost"
          icon={Filter}
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 sm:mt-0 md:hidden"
        >
          Filtros
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Categoría</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Precio</h4>
              <div className="relative">
                <select
                  value={priceRanges.indexOf(selectedPriceRange)}
                  onChange={(e) => setSelectedPriceRange(priceRanges[Number.parseInt(e.target.value)])}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Admin Actions (solo visible para admin) */}
            {user?.role === 'admin' && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Acciones</h4>
                <Button variant="ghost" size="sm" className="w-full mb-2">
                  Exportar Catálogo
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Ver Estadísticas
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-gray-500 mt-4">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-600 mb-4">Intenta ajustar los filtros para ver más resultados</p>
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedCategory("Todos")
                  setSelectedPriceRange(priceRanges[0])
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
