import { Badge } from "./badge"
import { cn } from "../../lib/utils"

export type StatusVariant =
  | "pending"
  | "approved"
  | "denied"
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "in_progress"
  | "confirmed"
  | "active"
  | "inactive"
  | "draft"
  | "published"

interface StatusBadgeProps {
  status: StatusVariant
  className?: string
}

const statusConfig: Record<
  StatusVariant,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className?: string }
> = {
  pending: { label: "Pending", variant: "outline", className: "text-yellow-700 border-yellow-300 bg-yellow-50" },
  approved: { label: "Approved", variant: "default", className: "text-green-700 border-green-300 bg-green-50" },
  denied: { label: "Denied", variant: "destructive" },
  processing: { label: "Processing", variant: "outline", className: "text-blue-700 border-blue-300 bg-blue-50" },
  completed: { label: "Completed", variant: "default", className: "text-green-700 border-green-300 bg-green-50" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  shipped: { label: "Shipped", variant: "outline", className: "text-blue-700 border-blue-300 bg-blue-50" },
  delivered: { label: "Delivered", variant: "default", className: "text-green-700 border-green-300 bg-green-50" },
  in_progress: { label: "In Progress", variant: "outline", className: "text-blue-700 border-blue-300 bg-blue-50" },
  confirmed: { label: "Confirmed", variant: "default", className: "text-green-700 border-green-300 bg-green-50" },
  active: { label: "Active", variant: "default", className: "text-green-700 border-green-300 bg-green-50" },
  inactive: { label: "Inactive", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
  published: { label: "Published", variant: "default", className: "text-green-700 border-green-300 bg-green-50" },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
