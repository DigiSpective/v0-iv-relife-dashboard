"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "created-desc"

interface SortingProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function Sorting({ value, onChange }: SortingProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort">Sort by:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="price-asc">Price (Low to High)</SelectItem>
          <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          <SelectItem value="created-desc">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
