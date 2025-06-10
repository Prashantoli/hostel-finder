export interface Hostel {
  id: string
  name: string
  location: string
  price: number
  rating: number
  type: "Private" | "Shared" | "Dormitory" | "Single"
  image: string
  amenities: string[]
  description: string
  availability: boolean
  reviews: number
}

export interface SearchFilters {
  location: string
  priceRange: [number, number]
  rating: number
  type: string
  checkIn: string
  checkOut: string
}
