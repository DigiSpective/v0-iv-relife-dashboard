"use client"

import { useQuery } from "@tanstack/react-query"
import { getRetailers, getRetailerById, getLocationsByRetailer } from "@/lib/supabase"

export function useRetailers() {
  return useQuery({
    queryKey: ["retailers"],
    queryFn: getRetailers,
  })
}

export function useRetailer(id: string) {
  return useQuery({
    queryKey: ["retailers", id],
    queryFn: () => getRetailerById(id),
    enabled: !!id,
  })
}

export function useRetailerLocations(retailerId: string) {
  return useQuery({
    queryKey: ["retailers", retailerId, "locations"],
    queryFn: () => getLocationsByRetailer(retailerId),
    enabled: !!retailerId,
  })
}
