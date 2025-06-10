import type { Hostel } from "../types/hostel"
import type { HostelFormData } from "../types/admin"

// Add new hostel to database via API
export async function addHostel(formData: HostelFormData): Promise<Hostel> {
  const response = await fetch("/api/hostels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error("Failed to add hostel")
  }

  return response.json()
}

// Get all hostels for admin
export async function getAdminHostels(): Promise<Hostel[]> {
  const response = await fetch("/api/admin/hostels", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch hostels")
  }

  return response.json()
}

// Update hostel
export async function updateHostel(id: string, formData: HostelFormData): Promise<Hostel> {
  const response = await fetch(`/api/admin/hostels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error("Failed to update hostel")
  }

  return response.json()
}

// Delete hostel
export async function deleteHostel(id: string): Promise<void> {
  const response = await fetch(`/api/admin/hostels/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete hostel")
  }
}

// Get hostel statistics
export async function getHostelStats(): Promise<{
  totalHostels: number
  availableHostels: number
  totalRevenue: number
  averageRating: number
}> {
  const response = await fetch("/api/admin/stats", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch stats")
  }

  return response.json()
}
