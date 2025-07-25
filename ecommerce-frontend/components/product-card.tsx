"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "./button"
import { useAuth } from "../app/context/AuthContext"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  isOnSale?: boolean
  onAddToCart?: (productId: string) => Promise<void> | void
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  category,
  isOnSale = false,
  onAddToCart
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!user) {
      router.push(`/login?redirect=/product/${id}`)
      return
    }

    setIsAdding(true)
    try {
      if (onAddToCart) {
        await onAddToCart(id)
      } else {
        // Lógica por defecto si no se pasa prop
        console.log(`Producto ${id} añadido al carrito`)
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const discountPercentage = isOnSale && originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <Link href={`/product/${id}`} className="block">
        <div className="relative overflow-hidden">
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
              OFERTA {discountPercentage}%
            </div>
          )}
          <div className="aspect-square relative bg-gray-100">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{category}</div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">{renderStars()}</div>
            <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {isOnSale && originalPrice && (
              <div className="text-sm font-semibold text-red-600">
                -{discountPercentage}%
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button 
          variant="primary" 
          size="sm" 
          icon={isAdding ? Loader2 : ShoppingCart}
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Añadiendo...
            </span>
          ) : (
            "Añadir al carrito"
          )}
        </Button>
      </div>
    </div>
  )
}