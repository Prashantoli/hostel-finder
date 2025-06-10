"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, MapPin, Phone, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { HostelFormData } from "../types/admin"

interface AddHostelFormProps {
  onSubmit: (data: HostelFormData) => Promise<void>
  onCancel: () => void
  isLoading: boolean
}

const availableAmenities = [
  "WiFi",
  "Breakfast",
  "Parking",
  "Common Area",
  "Kitchen",
  "Laundry",
  "Air Conditioning",
  "Heating",
  "24/7 Reception",
  "Security",
  "Lockers",
  "Towels",
  "Bed Sheets",
  "Luggage Storage",
  "Tour Desk",
  "Bar",
  "Restaurant",
]

export function AddHostelForm({ onSubmit, onCancel, isLoading }: AddHostelFormProps) {
  const [formData, setFormData] = useState<HostelFormData>({
    name: "",
    location: "",
    price: 0,
    type: "Dormitory",
    description: "",
    amenities: [],
    images: [],
    contactEmail: "",
    contactPhone: "",
    address: "",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    policies: "",
    capacity: 1,
  })

  const [errors, setErrors] = useState<Partial<HostelFormData>>({})
  const [newAmenity, setNewAmenity] = useState("")

  const validateForm = (): boolean => {
    const newErrors: Partial<HostelFormData> = {}

    if (!formData.name.trim()) newErrors.name = "Hostel name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (formData.capacity <= 0) newErrors.capacity = "Capacity must be greater than 0"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Failed to add hostel:", error)
    }
  }

  const handleInputChange = (field: keyof HostelFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity]
    handleInputChange("amenities", updatedAmenities)
  }

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      handleInputChange("amenities", [...formData.amenities, newAmenity.trim()])
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenity: string) => {
    handleInputChange(
      "amenities",
      formData.amenities.filter((a) => a !== amenity),
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-2xl">Add New Hostel</CardTitle>
            <CardDescription>Fill in the details to add a new hostel to your platform</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hostel Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter hostel name"
                  />
                  {errors.name && (
                    <Alert className="py-2">
                      <AlertDescription className="text-sm text-red-600">{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Hostel Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private Room</SelectItem>
                      <SelectItem value="Shared">Shared Room</SelectItem>
                      <SelectItem value="Dormitory">Dormitory</SelectItem>
                      <SelectItem value="Single">Single Bed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night (NPR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  {errors.price && (
                    <Alert className="py-2">
                      <AlertDescription className="text-sm text-red-600">{errors.price}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (beds) *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", Number.parseInt(e.target.value) || 1)}
                    placeholder="1"
                  />
                  {errors.capacity && (
                    <Alert className="py-2">
                      <AlertDescription className="text-sm text-red-600">{errors.capacity}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your hostel, its atmosphere, and what makes it special..."
                  rows={4}
                />
                {errors.description && (
                  <Alert className="py-2">
                    <AlertDescription className="text-sm text-red-600">{errors.description}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Location Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">District *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                      <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <Alert className="py-2">
                      <AlertDescription className="text-sm text-red-600">{errors.location}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Street address, city, state, zip code"
                  />
                  {errors.address && (
                    <Alert className="py-2">
                      <AlertDescription className="text-sm text-red-600">{errors.address}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="contact@hostel.com"
                  />
                  {errors.contactEmail && (
                    <Alert className="py-2">
                      <AlertDescription className="text-sm text-red-600">{errors.contactEmail}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Check-in/Check-out Times */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Check-in/Check-out Times
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkInTime">Check-in Time</Label>
                  <Input
                    id="checkInTime"
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => handleInputChange("checkInTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOutTime">Check-out Time</Label>
                  <Input
                    id="checkOutTime"
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) => handleInputChange("checkOutTime", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Amenities</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {availableAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add custom amenity"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomAmenity())}
                />
                <Button type="button" onClick={addCustomAmenity} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeAmenity(amenity)}
                    >
                      {amenity} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Policies & Rules</h3>
              <Textarea
                value={formData.policies}
                onChange={(e) => handleInputChange("policies", e.target.value)}
                placeholder="Enter hostel policies, rules, and important information for guests..."
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hostel Images</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-gray-400 mb-2">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Click to upload hostel images</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Hostel ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Adding Hostel..." : "Add Hostel"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
