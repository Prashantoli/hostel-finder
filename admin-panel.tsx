"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "./components/admin-header"
import { AddHostelForm } from "./components/add-hostel-form"
import { HostelManagementTable } from "./components/hostel-management-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, DollarSign, Star, TrendingUp } from "lucide-react"
import { addHostel, getAdminHostels, deleteHostel, getHostelStats } from "./api/admin-hostels"
import type { Hostel } from "./types/hostel"
import type { HostelFormData } from "./types/admin"

export default function AdminPanel() {
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalHostels: 0,
    availableHostels: 0,
    totalRevenue: 0,
    averageRating: 0,
  })

  useEffect(() => {
    loadHostels()
    loadStats()
  }, [])

  const loadHostels = async () => {
    try {
      const data = await getAdminHostels()
      setHostels(data)
    } catch (error) {
      console.error("Failed to load hostels:", error)
    }
  }

  const loadStats = async () => {
    try {
      const data = await getHostelStats()
      setStats(data)
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  const handleAddHostel = async (formData: HostelFormData) => {
    setIsLoading(true)
    try {
      const newHostel = await addHostel(formData)
      setHostels((prev) => [...prev, newHostel])
      setShowAddForm(false)
      await loadStats() // Refresh stats
    } catch (error) {
      console.error("Failed to add hostel:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteHostel = async (hostelId: string) => {
    if (!confirm("Are you sure you want to delete this hostel?")) return

    try {
      await deleteHostel(hostelId)
      setHostels((prev) => prev.filter((h) => h.id !== hostelId))
      await loadStats() // Refresh stats
    } catch (error) {
      console.error("Failed to delete hostel:", error)
    }
  }

  const handleEditHostel = (hostel: Hostel) => {
    console.log("Edit hostel:", hostel)
    // Implement edit functionality
  }

  const handleViewHostel = (hostel: Hostel) => {
    console.log("View hostel:", hostel)
    // Implement view functionality
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onAddHostel={() => setShowAddForm(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHostels}</div>
              <p className="text-xs text-muted-foreground">{stats.availableHostels} available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">Across all hostels</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NPR {stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">NPR per night potential</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalHostels > 0 ? Math.round((stats.availableHostels / stats.totalHostels) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Currently available</p>
            </CardContent>
          </Card>
        </div>

        {/* Hostels Management */}
        <HostelManagementTable
          hostels={hostels}
          onEdit={handleEditHostel}
          onDelete={handleDeleteHostel}
          onView={handleViewHostel}
        />

        {/* Add Hostel Form Modal */}
        {showAddForm && (
          <AddHostelForm onSubmit={handleAddHostel} onCancel={() => setShowAddForm(false)} isLoading={isLoading} />
        )}
      </div>
    </div>
  )
}
