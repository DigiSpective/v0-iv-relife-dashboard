export interface User {
  id: string
  email: string
  name: string
  role: string
  retailer_id?: string
  created_at: string
  updated_at: string
}

export interface AuthSession {
  user: User
  expires_at: string
  last_activity: string
}

export interface AuthError {
  message: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: string
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  customer_id: string
  product_id: string
  status: "pending" | "approved" | "rejected"
  description: string
  amount: number
  created_at: string
  updated_at: string
}
