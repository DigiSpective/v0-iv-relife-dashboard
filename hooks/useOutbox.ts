"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createOutboxEvent } from "@/lib/supabase"

export function useOutbox() {
  const queryClient = useQueryClient()

  const createEvent = useMutation({
    mutationFn: createOutboxEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outbox"] })
    },
  })

  return {
    createEvent,
  }
}
