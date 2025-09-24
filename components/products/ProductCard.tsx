"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onSelect?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        {product.brand && <p className="text-sm text-muted-foreground">{product.brand}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {product.description && <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">
              {product.currency} {product.price}
            </p>
            <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onSelect?.(product)} className="flex-1">
            View Details
          </Button>
          {onAddToCart && (
            <Button size="sm" onClick={() => onAddToCart(product)} className="flex-1">
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
