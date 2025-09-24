// Core type definitions for the IV RELIFE Dashboard

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "retailer" | "user"
  retailer_id?: string
  created_at: string
  updated_at: string
}

export interface Retailer {
  id: string
  name: string
  code: string
  contact_email: string
  contact_phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  created_at: string
  updated_at: string
}

export interface Location {
  id: string
  retailer_id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phone?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  retailer_id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface CustomerContact {
  id: string
  customer_id: string
  type: "email" | "phone" | "address"
  value: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface CustomerAddress {
  id: string
  customer_id: string
  type: "billing" | "shipping" | "home" | "work"
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  zip: string
  country: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface CustomerDocument {
  id: string
  customer_id: string
  name: string
  type: string
  url: string
  size: number
  created_at: string
  updated_at: string
}

export interface CustomerActivity {
  id: string
  customer_id: string
  type: string
  description: string
  metadata?: Record<string, any>
  created_at: string
  created_by: string
}

export type ClaimStatus = "pending" | "approved" | "denied" | "processing" | "completed" | "cancelled"

export interface Claim {
  id: string
  retailer_id: string
  customer_id: string
  product_id?: string
  status: ClaimStatus
  description: string
  amount?: number
  currency?: string
  created_at: string
  updated_at: string
  created_by: string
}

export interface Repair {
  id: string
  claim_id: string
  description: string
  cost: number
  currency: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export interface FileMetadata {
  id: string
  name: string
  type: string
  size: number
  url: string
  created_at: string
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"

export type ProductCategory = "electronics" | "appliances" | "furniture" | "clothing" | "other"

export interface Product {
  id: string
  retailer_id: string
  name: string
  description?: string
  category: ProductCategory
  brand?: string
  model?: string
  sku: string
  price: number
  currency: string
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string
  price: number
  currency: string
  attributes: Record<string, any>
  created_at: string
  updated_at: string
}

export interface UserFeature {
  id: string
  user_id: string
  feature_key: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface UserNotification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  read: boolean
  created_at: string
  updated_at: string
}

export interface SystemSetting {
  id: string
  key: string
  value: string
  description?: string
  created_at: string
  updated_at: string
}

export type FulfillmentStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface ShippingProvider {
  id: string
  name: string
  code: string
  api_key?: string
  api_url?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Fulfillment {
  id: string
  order_id: string
  shipping_provider_id: string
  tracking_number?: string
  status: FulfillmentStatus
  shipped_at?: string
  delivered_at?: string
  created_at: string
  updated_at: string
}

export interface ShippingMethod {
  id: string
  provider_id: string
  name: string
  code: string
  description?: string
  base_cost: number
  currency: string
  estimated_days: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assigned_to?: string
  due_date?: string
  created_at: string
  updated_at: string
}

// Auth related types
export interface AuditLog {
  id: string
  user_id?: string
  action: string
  resource_type: string
  resource_id?: string
  details?: Record<string, any>
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface AuthSession {
  user: User
  expires_at: string
  last_activity: string
}

export interface AuthError {
  message: string
  code?: string
  details?: Record<string, any>
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role?: "admin" | "retailer" | "user"
}

export interface InviteToken {
  id: string
  email: string
  role: "admin" | "retailer" | "user"
  retailer_id?: string
  token: string
  expires_at: string
  used_at?: string
  created_at: string
}

export interface OutboxEvent {
  id: string
  event_type: string
  aggregate_id: string
  aggregate_type: string
  event_data: Record<string, any>
  created_at: string
  processed_at?: string
  failed_at?: string
  retry_count: number
}

export interface CustomerMergeRequest {
  id: string
  source_customer_id: string
  target_customer_id: string
  status: "pending" | "approved" | "rejected"
  requested_by: string
  approved_by?: string
  reason?: string
  created_at: string
  updated_at: string
}

export interface ShippingQuote {
  id: string
  provider_id: string
  method_id: string
  origin_address: string
  destination_address: string
  weight: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  cost: number
  currency: string
  estimated_days: number
  expires_at: string
  created_at: string
}

export type AppRole = "admin" | "retailer" | "user" | "super_admin"

export type UserRole = AppRole

export interface Order {
  id: string
  retailer_id: string
  customer_id: string
  status: OrderStatus
  total_amount: number
  currency: string
  shipping_address?: CustomerAddress
  billing_address?: CustomerAddress
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_variant_id?: string
  quantity: number
  unit_price: number
  total_price: number
  currency: string
  created_at: string
  updated_at: string
}
