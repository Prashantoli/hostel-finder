export interface HostelFormData {
  name: string
  location: string
  price: number
  type: "Private" | "Shared" | "Dormitory" | "Single"
  description: string
  amenities: string[]
  images: string[]
  contactEmail: string
  contactPhone: string
  address: string
  checkInTime: string
  checkOutTime: string
  policies: string
  capacity: number
}

export interface AdminUser {
  id: string
  email: string
  role: "admin" | "hostel_owner"
  name: string
}
