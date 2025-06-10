import type { Hostel, SearchFilters } from "../types/hostel"

// Search hostels using real API
export async function searchHostels(filters: SearchFilters): Promise<Hostel[]> {
  const params = new URLSearchParams({
    location: filters.location || "",
    minPrice: filters.priceRange[0].toString(),
    maxPrice: filters.priceRange[1].toString(),
    rating: filters.rating.toString(),
    type: filters.type || "",
  })

  const response = await fetch(`/api/hostels?${params}`)

  if (!response.ok) {
    throw new Error("Failed to search hostels")
  }

  return response.json()
}
