"use client"

import { useState } from "react"
import { MapPin, DollarSign, Star, Home, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SearchFilters } from "../types/hostel"

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
  isLoading: boolean
}

export function SearchFiltersComponent({ onSearch, isLoading }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    priceRange: [0, 100],
    rating: 0,
    type: "",
    checkIn: "",
    checkOut: "",
  })

  const handleSearch = () => {
    onSearch(filters)
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center text-sm font-medium">
              <MapPin className="mr-2 h-4 w-4 text-blue-600" />
              District
            </Label>
            <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Check-in Date */}
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4 text-blue-600" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={filters.checkIn}
              onChange={(e) => updateFilter("checkIn", e.target.value)}
              className="h-10"
            />
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4 text-blue-600" />
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={filters.checkOut}
              onChange={(e) => updateFilter("checkOut", e.target.value)}
              className="h-10"
            />
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <Label className="flex items-center text-sm font-medium">
              <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
              Price Range: NPR {filters.priceRange[0]} - NPR {filters.priceRange[1]}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
          </div>

          {/* Hostel Type */}
          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Home className="mr-2 h-4 w-4 text-blue-600" />
              Hostel Type
            </Label>
            <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Private">Private Room</SelectItem>
                <SelectItem value="Shared">Shared Room</SelectItem>
                <SelectItem value="Dormitory">Dormitory</SelectItem>
                <SelectItem value="Single">Single Bed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-3">
            <Label className="flex items-center text-sm font-medium">
              <Star className="mr-2 h-4 w-4 text-blue-600" />
              Minimum Rating: {filters.rating} stars
            </Label>
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => updateFilter("rating", value[0])}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? "Searching..." : "Search Hostels"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
