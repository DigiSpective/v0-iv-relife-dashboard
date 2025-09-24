"use client"

// Product management hooks
import { useState, useEffect, useCallback } from "react"
import type { Product, ProductVariant } from "../types"
import { mockProducts, mockProductVariants } from "../lib/mock-data"

export function useProducts(retailerId?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const filteredProducts = retailerId ? mockProducts.filter((p) => p.retailer_id === retailerId) : mockProducts
        setProducts(filteredProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [retailerId])

  const createProduct = useCallback(async (productData: Omit<Product, "id" | "created_at" | "updated_at">) => {
    try {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setProducts((prev) => [...prev, newProduct])
      return newProduct
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create product")
    }
  }, [])

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    try {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updates, updated_at: new Date().toISOString() } : product,
        ),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update product")
    }
  }, [])

  const deleteProduct = useCallback(async (id: string) => {
    try {
      setProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete product")
    }
  }, [])

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

export function useProductVariants(productId: string) {
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const productVariants = mockProductVariants.filter((v) => v.product_id === productId)
        setVariants(productVariants)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product variants")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchVariants()
    }
  }, [productId])

  return { variants, loading, error }
}
