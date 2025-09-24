"use client"

import { useState, useCallback } from "react"
import type { Product, ProductVariant } from "@/types"

interface CartItem {
  product: Product
  variant?: ProductVariant
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, variant?: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id && item.variant?.id === variant?.id)

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }

      return [...prev, { product, variant, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.variant?.id === variantId)))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, variantId)
        return
      }

      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.variant?.id === variantId ? { ...item, quantity } : item,
        ),
      )
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => {
    const price = item.variant?.price || item.product.price
    return sum + price * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  }
}
