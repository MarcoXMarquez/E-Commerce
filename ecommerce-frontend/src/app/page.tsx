import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/button"
import { ArrowRight, Truck, Shield, Headphones } from "lucide-react"

// Datos de ejemplo
const featuredProducts = [
  {
    id: "1",
    name: "Smartphone Pro Max 256GB",
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.8,
    reviewCount: 324,
    image: "/placeholder.svg?height=400&width=400",
    category: "Tecnología",
    isOnSale: true,
  },
  {
    id: "2",
    name: "Auriculares Inalámbricos Premium",
    price: 199.99,
    rating: 4.6,
    reviewCount: 156,
    image: "/placeholder.svg?height=400&width=400",
    category: "Audio",
    isOnSale: false,
  },
  {
    id: "3",
    name: "Laptop Gaming RGB 16GB RAM",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.9,
    reviewCount: 89,
    image: "/placeholder.svg?height=400&width=400",
    category: "Computadoras",
    isOnSale: true,
  },
  {
    id: "4",
    name: "Smartwatch Deportivo GPS",
    price: 249.99,
    rating: 4.5,
    reviewCount: 203,
    image: "/placeholder.svg?height=400&width=400",
    category: "Wearables",
    isOnSale: false,
  },
]

const categories = ["Todos", "Tecnología", "Audio", "Computadoras", "Wearables", "Accesorios"]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Descubre los Mejores
              <span className="block text-yellow-300">Productos Tech</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Encuentra la tecnología más avanzada con los mejores precios y envío gratuito
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                Ver Productos
              </Button>
              <Button variant="ghost" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Ofertas Especiales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Gratuito</h3>
              <p className="text-gray-600">En compras superiores a $50</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Extendida</h3>
              <p className="text-gray-600">2 años de garantía en todos los productos</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">Atención al cliente siempre disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de productos más populares con las mejores ofertas
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button key={category} variant={category === "Todos" ? "primary" : "ghost"} size="sm" className="mb-2">
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Ver Todos los Productos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mantente al Día</h2>
          <p className="text-xl text-gray-300 mb-8">Suscríbete a nuestro newsletter y recibe ofertas exclusivas</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="secondary" size="lg">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ShopLogo</h3>
              <p className="text-gray-600">Tu tienda de tecnología de confianza con los mejores productos y precios.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Productos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Smartphones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Audio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Accesorios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Garantías
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Devoluciones
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 ShopLogo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
