// Supabase client configuration
import { createBrowserClient, createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

export const supabase = createClient()

// Claims functions
export async function getClaims() {
  const { data, error } = await supabase.from("claims").select("*")
  if (error) throw error
  return data
}

export async function getClaimById(id: string) {
  const { data, error } = await supabase.from("claims").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function getClaimsByRetailer(retailerId: string) {
  const { data, error } = await supabase.from("claims").select("*").eq("retailer_id", retailerId)
  if (error) throw error
  return data
}

export async function createClaim(claim: any) {
  const { data, error } = await supabase.from("claims").insert(claim).select().single()
  if (error) throw error
  return data
}

export async function updateClaim(id: string, updates: any) {
  const { data, error } = await supabase.from("claims").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteClaim(id: string) {
  const { error } = await supabase.from("claims").delete().eq("id", id)
  if (error) throw error
}

// Audit functions
export async function getAuditLogs() {
  const { data, error } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function createAuditLog(log: any) {
  const { data, error } = await supabase.from("audit_logs").insert(log).select().single()
  if (error) throw error
  return data
}

export async function createOutboxEvent(event: any) {
  const { data, error } = await supabase.from("outbox_events").insert(event).select().single()
  if (error) throw error
  return data
}

// Customer functions
export async function getCustomers() {
  const { data, error } = await supabase.from("customers").select("*")
  if (error) throw error
  return data
}

export async function getCustomerById(id: string) {
  const { data, error } = await supabase.from("customers").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function createCustomer(customer: any) {
  const { data, error } = await supabase.from("customers").insert(customer).select().single()
  if (error) throw error
  return data
}

export async function updateCustomer(id: string, updates: any) {
  const { data, error } = await supabase.from("customers").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase.from("customers").delete().eq("id", id)
  if (error) throw error
}

// Customer contacts
export async function getCustomerContacts(customerId: string) {
  const { data, error } = await supabase.from("customer_contacts").select("*").eq("customer_id", customerId)
  if (error) throw error
  return data
}

export async function createCustomerContact(contact: any) {
  const { data, error } = await supabase.from("customer_contacts").insert(contact).select().single()
  if (error) throw error
  return data
}

export async function updateCustomerContact(id: string, updates: any) {
  const { data, error } = await supabase.from("customer_contacts").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteCustomerContact(id: string) {
  const { error } = await supabase.from("customer_contacts").delete().eq("id", id)
  if (error) throw error
}

// Customer addresses
export async function getCustomerAddresses(customerId: string) {
  const { data, error } = await supabase.from("customer_addresses").select("*").eq("customer_id", customerId)
  if (error) throw error
  return data
}

export async function createCustomerAddress(address: any) {
  const { data, error } = await supabase.from("customer_addresses").insert(address).select().single()
  if (error) throw error
  return data
}

export async function updateCustomerAddress(id: string, updates: any) {
  const { data, error } = await supabase.from("customer_addresses").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteCustomerAddress(id: string) {
  const { error } = await supabase.from("customer_addresses").delete().eq("id", id)
  if (error) throw error
}

// Customer documents
export async function getCustomerDocuments(customerId: string) {
  const { data, error } = await supabase.from("customer_documents").select("*").eq("customer_id", customerId)
  if (error) throw error
  return data
}

export async function createCustomerDocument(document: any) {
  const { data, error } = await supabase.from("customer_documents").insert(document).select().single()
  if (error) throw error
  return data
}

export async function deleteCustomerDocument(id: string) {
  const { error } = await supabase.from("customer_documents").delete().eq("id", id)
  if (error) throw error
}

// Customer activity
export async function getCustomerActivity(customerId: string) {
  const { data, error } = await supabase
    .from("customer_activity")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function createCustomerActivity(activity: any) {
  const { data, error } = await supabase.from("customer_activity").insert(activity).select().single()
  if (error) throw error
  return data
}

// Customer merge requests
export async function getCustomerMergeRequests() {
  const { data, error } = await supabase.from("customer_merge_requests").select("*")
  if (error) throw error
  return data
}

export async function createCustomerMergeRequest(request: any) {
  const { data, error } = await supabase.from("customer_merge_requests").insert(request).select().single()
  if (error) throw error
  return data
}

export async function approveCustomerMergeRequest(id: string) {
  const { data, error } = await supabase
    .from("customer_merge_requests")
    .update({ status: "approved" })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

// Product functions
export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*")
  if (error) throw error
  return data
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function getProductVariantsByProduct(productId: string) {
  const { data, error } = await supabase.from("product_variants").select("*").eq("product_id", productId)
  if (error) throw error
  return data
}

export async function getProductVariants() {
  const { data, error } = await supabase.from("product_variants").select("*")
  if (error) throw error
  return data
}

// User functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()
  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("user_profiles").update(updates).eq("user_id", userId).select().single()
  if (error) throw error
  return data
}

export async function getUserFeatures(userId: string) {
  const { data, error } = await supabase.from("user_features").select("*").eq("user_id", userId)
  if (error) throw error
  return data
}

export async function updateUserFeature(id: string, updates: any) {
  const { data, error } = await supabase.from("user_features").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function createUserFeature(feature: any) {
  const { data, error } = await supabase.from("user_features").insert(feature).select().single()
  if (error) throw error
  return data
}

export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase.from("user_notifications").select("*").eq("user_id", userId)
  if (error) throw error
  return data
}

export async function updateUserNotification(id: string, updates: any) {
  const { data, error } = await supabase.from("user_notifications").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function createUserNotification(notification: any) {
  const { data, error } = await supabase.from("user_notifications").insert(notification).select().single()
  if (error) throw error
  return data
}

// System settings
export async function getSystemSettings() {
  const { data, error } = await supabase.from("system_settings").select("*")
  if (error) throw error
  return data
}

export async function getSystemSettingByKey(key: string) {
  const { data, error } = await supabase.from("system_settings").select("*").eq("key", key).single()
  if (error) throw error
  return data
}

export async function updateSystemSetting(key: string, value: any) {
  const { data, error } = await supabase.from("system_settings").update({ value }).eq("key", key).select().single()
  if (error) throw error
  return data
}

export async function createSystemSetting(setting: any) {
  const { data, error } = await supabase.from("system_settings").insert(setting).select().single()
  if (error) throw error
  return data
}

export async function updatePassword(userId: string, newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
  return data
}

// Shipping functions
export async function getShippingProviders() {
  const { data, error } = await supabase.from("shipping_providers").select("*")
  if (error) throw error
  return data
}

export async function getShippingMethods() {
  const { data, error } = await supabase.from("shipping_methods").select("*")
  if (error) throw error
  return data
}

export async function getShippingQuotes() {
  const { data, error } = await supabase.from("shipping_quotes").select("*")
  if (error) throw error
  return data
}

export async function getFulfillments() {
  const { data, error } = await supabase.from("fulfillments").select("*")
  if (error) throw error
  return data
}

export async function createShippingProvider(provider: any) {
  const { data, error } = await supabase.from("shipping_providers").insert(provider).select().single()
  if (error) throw error
  return data
}

export async function updateShippingProvider(id: string, updates: any) {
  const { data, error } = await supabase.from("shipping_providers").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteShippingProvider(id: string) {
  const { error } = await supabase.from("shipping_providers").delete().eq("id", id)
  if (error) throw error
}

export async function createShippingMethod(method: any) {
  const { data, error } = await supabase.from("shipping_methods").insert(method).select().single()
  if (error) throw error
  return data
}

export async function updateShippingMethod(id: string, updates: any) {
  const { data, error } = await supabase.from("shipping_methods").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteShippingMethod(id: string) {
  const { error } = await supabase.from("shipping_methods").delete().eq("id", id)
  if (error) throw error
}

export async function createShippingQuote(quote: any) {
  const { data, error } = await supabase.from("shipping_quotes").insert(quote).select().single()
  if (error) throw error
  return data
}

export async function createFulfillment(fulfillment: any) {
  const { data, error } = await supabase.from("fulfillments").insert(fulfillment).select().single()
  if (error) throw error
  return data
}

export async function updateFulfillment(id: string, updates: any) {
  const { data, error } = await supabase.from("fulfillments").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

// Retailer functions
export async function getRetailers() {
  const { data, error } = await supabase.from("retailers").select("*")
  if (error) throw error
  return data
}

export async function getRetailerById(id: string) {
  const { data, error } = await supabase.from("retailers").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function getLocationsByRetailer(retailerId: string) {
  const { data, error } = await supabase.from("locations").select("*").eq("retailer_id", retailerId)
  if (error) throw error
  return data
}
