"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/useCart"

export function CartPreview() {
  const { items, total, itemCount, removeItem, clearCart } = useCart()

  if (itemCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Cart</CardTitle>
          <Badge variant="secondary">{itemCount} items</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.variant?.id || ""}`}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name}</p>
                {item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}
                <p className="text-xs">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {item.product.currency} {(item.variant?.price || item.product.price) * item.quantity}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.product.id, item.variant?.id)}
                  className="text-xs h-6 px-2"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Button className="w-full">Checkout</Button>
            <Button variant="outline" onClick={clearCart} className="w-full bg-transparent">
              Clear Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
