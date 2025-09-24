// Mock data for development and testing
import type { User, Customer, Product, ProductVariant } from "../types"

export const mockUser: User = {
  id: "1",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const mockOrders = [
  {
    id: "1",
    customer_id: "1",
    status: "pending" as const,
    total: 299.99,
    currency: "USD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    customer_id: "2",
    status: "shipped" as const,
    total: 149.99,
    currency: "USD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockCustomers: Customer[] = [
  {
    id: "1",
    retailer_id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    retailer_id: "1",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    retailer_id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "electronics",
    brand: "TechBrand",
    model: "WH-1000XM4",
    sku: "WH-1000XM4-BLK",
    price: 299.99,
    currency: "USD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    retailer_id: "1",
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor",
    category: "electronics",
    brand: "FitTech",
    model: "SW-200",
    sku: "SW-200-SLV",
    price: 199.99,
    currency: "USD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockProductVariants: ProductVariant[] = [
  {
    id: "1",
    product_id: "1",
    name: "Black",
    sku: "WH-1000XM4-BLK",
    price: 299.99,
    currency: "USD",
    attributes: { color: "black" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    product_id: "1",
    name: "White",
    sku: "WH-1000XM4-WHT",
    price: 299.99,
    currency: "USD",
    attributes: { color: "white" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
