"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getClaims,
  getClaimById,
  createClaim,
  updateClaim,
  createAuditLog,
  createOutboxEvent,
  getAuditLogs,
} from "@/lib/supabase"
import type { Claim, ClaimStatus } from "../types"

export function useClaims(retailerId?: string, customerId?: string) {
  const queryClient = useQueryClient()
  const {
    data: claimsData,
    isLoading: claimsLoading,
    isError: claimsError,
    error: claimsErrorInfo,
  } = useQuery({
    queryKey: ["claims", retailerId, customerId],
    queryFn: () => getClaims(retailerId, customerId),
  })

  const createClaimMutation = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims", retailerId, customerId] })
    },
  })

  const updateClaimStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ClaimStatus }) => updateClaim(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims", retailerId, customerId] })
    },
  })

  const createAuditLogMutation = useMutation({
    mutationFn: createAuditLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] })
    },
  })

  const createOutboxEventMutation = useMutation({
    mutationFn: createOutboxEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outbox-events"] })
    },
  })

  return {
    claims: claimsData,
    loading: claimsLoading,
    error: claimsError ? claimsErrorInfo?.message || "Failed to fetch claims" : null,
    createClaim: createClaimMutation.mutateAsync,
    updateClaimStatus: updateClaimStatusMutation.mutateAsync,
    createAuditLog: createAuditLogMutation.mutateAsync,
    createOutboxEvent: createOutboxEventMutation.mutateAsync,
  }
}

export function useClaim(id: string) {
  const queryClient = useQueryClient()
  const {
    data: claimData,
    isLoading: claimLoading,
    isError: claimError,
    error: claimErrorInfo,
  } = useQuery({
    queryKey: ["claim", id],
    queryFn: () => getClaimById(id),
  })

  const updateClaimMutation = useMutation({
    mutationFn: ({ id, ...updates }: { id: string } & Partial<Claim>) => updateClaim(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claim", id] })
    },
  })

  return {
    claim: claimData,
    loading: claimLoading,
    error: claimError ? claimErrorInfo?.message || "Failed to fetch claim" : null,
    updateClaim: updateClaimMutation.mutateAsync,
  }
}

export function useCreateAuditLog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAuditLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] })
    },
  })
}

export function useCreateOutboxEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOutboxEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outbox-events"] })
    },
  })
}

export function useUpdateClaim() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...updates }: { id: string } & Partial<Claim>) => updateClaim(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] })
    },
  })
}

export function useAuditLogs() {
  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: getAuditLogs,
  })
}

export function useCreateClaim() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] })
    },
  })
}
