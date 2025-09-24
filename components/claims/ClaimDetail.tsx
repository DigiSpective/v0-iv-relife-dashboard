"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Claim, ClaimStatus } from "@/types"
import { useUpdateClaim } from "@/hooks/useClaims"

interface ClaimDetailProps {
  claim: Claim
  onUpdate?: (claim: Claim) => void
}

export function ClaimDetail({ claim, onUpdate }: ClaimDetailProps) {
  const [status, setStatus] = useState<ClaimStatus>(claim.status)
  const [notes, setNotes] = useState("")
  const updateClaim = useUpdateClaim()

  const handleStatusUpdate = async () => {
    try {
      const updatedClaim = await updateClaim.mutateAsync({
        id: claim.id,
        status,
        notes,
      })
      onUpdate?.(updatedClaim)
    } catch (error) {
      console.error("Failed to update claim:", error)
    }
  }

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "denied":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Claim #{claim.id}</CardTitle>
          <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Description</Label>
          <p className="text-sm text-muted-foreground">{claim.description}</p>
        </div>

        {claim.amount && (
          <div>
            <Label>Amount</Label>
            <p className="text-sm">
              {claim.currency} {claim.amount}
            </p>
          </div>
        )}

        <div>
          <Label>Created</Label>
          <p className="text-sm text-muted-foreground">{new Date(claim.created_at).toLocaleDateString()}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Update Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ClaimStatus)}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this status update..."
          />
        </div>

        <Button onClick={handleStatusUpdate} disabled={updateClaim.isPending}>
          {updateClaim.isPending ? "Updating..." : "Update Claim"}
        </Button>
      </CardContent>
    </Card>
  )
}
