"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "./button"

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
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para añadir al carrito
    console.log(`Añadido al carrito: ${name}`)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden">
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
              OFERTA
            </div>
          )}
          <div className="aspect-square relative bg-gray-100">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{category}</div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">{renderStars(rating)}</div>
            <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
              {originalPrice && <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>}
            </div>
            {isOnSale && originalPrice && (
              <div className="text-sm font-semibold text-red-600">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button variant="primary" size="sm" icon={ShoppingCart} className="w-full" onClick={handleAddToCart}>
          Añadir al carrito
        </Button>
      </div>
    </div>
  )
}
