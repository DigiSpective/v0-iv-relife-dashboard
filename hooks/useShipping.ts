"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getShippingProviders,
  getShippingMethods,
  getShippingQuotes,
  getFulfillments,
  createShippingProvider,
  updateShippingProvider,
  deleteShippingProvider,
  createShippingQuote,
  createFulfillment,
  updateFulfillment,
} from "@/lib/supabase"

export function useShippingProviders() {
  return useQuery({
    queryKey: ["shipping", "providers"],
    queryFn: getShippingProviders,
  })
}

export function useShippingMethods() {
  return useQuery({
    queryKey: ["shipping", "methods"],
    queryFn: getShippingMethods,
  })
}

export function useShippingQuotes() {
  return useQuery({
    queryKey: ["shipping", "quotes"],
    queryFn: getShippingQuotes,
  })
}

export function useFulfillments() {
  return useQuery({
    queryKey: ["fulfillments"],
    queryFn: getFulfillments,
  })
}

export function useCreateShippingProvider() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShippingProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping", "providers"] })
    },
  })
}

export function useUpdateShippingProvider() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => updateShippingProvider(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping", "providers"] })
    },
  })
}

export function useDeleteShippingProvider() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteShippingProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping", "providers"] })
    },
  })
}

export function useCreateShippingQuote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShippingQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping", "quotes"] })
    },
  })
}

export function useCreateFulfillment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFulfillment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fulfillments"] })
    },
  })
}

export function useUpdateFulfillment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => updateFulfillment(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fulfillments"] })
    },
  })
}
