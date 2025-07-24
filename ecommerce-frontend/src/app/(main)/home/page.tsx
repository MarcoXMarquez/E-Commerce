import { ProductGrid } from "./product-grid"
import { Button } from "@/components/button"
import { ArrowRight, Truck, Shield, Headphones, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Cliente verificada",
    content: "Excelente servicio y productos de calidad. La entrega fue súper rápida y el empaque perfecto.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Comprador frecuente",
    content: "He comprado varios productos aquí y siempre quedo satisfecho. Precios competitivos y gran atención.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Cliente nueva",
    content: "Mi primera compra y no será la última. Todo llegó en perfecto estado y antes de lo esperado.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animation */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Tecnología que
                <span className="block text-yellow-300 animate-pulse">Transforma tu Vida</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Descubre los productos más innovadores con envío gratuito y garantía extendida
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="transform hover:scale-105 transition-transform"
              >
                Explorar Productos
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-transform"
              >
                Ver Ofertas
              </Button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Truck className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Gratuito</h3>
              <p className="text-gray-600">En compras superiores a $50. Entrega en 24-48 horas</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Extendida</h3>
              <p className="text-gray-600">2 años de garantía en todos los productos electrónicos</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Headphones className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">Atención al cliente especializada siempre disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductGrid />

      {/* Interactive Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Miles de clientes satisfechos confían en nosotros</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mantente al Día</h2>
          <p className="text-xl text-gray-300 mb-8">
            Suscríbete y recibe ofertas exclusivas, nuevos productos y descuentos especiales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Button variant="secondary" size="lg" className="whitespace-nowrap">
              Suscribirse
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">No spam. Puedes cancelar en cualquier momento.</p>
        </div>
      </section>
    </div>
  )
}
