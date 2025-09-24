"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product, ProductVariant } from "@/types"
import { useProductVariants } from "@/hooks/useProducts"

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart?: (product: Product, variant?: ProductVariant) => void
}

export function ProductModal({ product, open, onOpenChange, onAddToCart }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const { data: variants } = useProductVariants(product?.id)

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
            </div>

            {product.description && (
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Price</h4>
                <p className="text-lg font-semibold">
                  {product.currency} {product.price}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">SKU</h4>
                <p className="text-sm font-mono">{product.sku}</p>
              </div>
            </div>

            {product.model && (
              <div>
                <h4 className="font-medium mb-1">Model</h4>
                <p className="text-sm">{product.model}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            {variants && variants.length > 0 ? (
              <div className="space-y-2">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedVariant?.id === variant.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{variant.name}</h5>
                        <p className="text-xs text-muted-foreground">SKU: {variant.sku}</p>
                      </div>
                      <p className="font-semibold">
                        {variant.currency} {variant.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No variants available</p>
            )}
          </TabsContent>
        </Tabs>

        {onAddToCart && (
          <div className="flex gap-2 pt-4">
            <Button onClick={() => onAddToCart(product, selectedVariant || undefined)} className="flex-1">
              Add to Cart
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
