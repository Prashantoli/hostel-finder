import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/mysql"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const hostelId = params.id

    const {
      name,
      location,
      address,
      price,
      type,
      description,
      amenities,
      images,
      contactEmail,
      contactPhone,
      checkInTime,
      checkOutTime,
      policies,
      capacity,
    } = body

    const query = `
      UPDATE hostels SET 
        name = ?, location = ?, address = ?, price = ?, type = ?, 
        description = ?, amenities = ?, images = ?, contact_email = ?, 
        contact_phone = ?, check_in_time = ?, check_out_time = ?, 
        policies = ?, capacity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `

    const queryParams = [
      name,
      location,
      address,
      price,
      type,
      description,
      JSON.stringify(amenities),
      JSON.stringify(images),
      contactEmail,
      contactPhone,
      checkInTime,
      checkOutTime,
      policies,
      capacity,
      hostelId,
    ]

    await pool.execute(query, queryParams)

    // Fetch updated hostel
    const [rows] = await pool.execute("SELECT * FROM hostels WHERE id = ?", [hostelId])
    const hostel = (rows as any[])[0]

    if (!hostel) {
      return NextResponse.json({ error: "Hostel not found" }, { status: 404 })
    }

    const responseHostel = {
      id: hostel.id.toString(),
      name: hostel.name,
      location: hostel.location,
      price: Number.parseFloat(hostel.price),
      rating: Number.parseFloat(hostel.rating),
      type: hostel.type,
      image: JSON.parse(hostel.images)[0] || "/placeholder.svg",
      amenities: JSON.parse(hostel.amenities),
      description: hostel.description,
      availability: Boolean(hostel.availability),
      reviews: hostel.reviews_count,
    }

    return NextResponse.json(responseHostel)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update hostel" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hostelId = params.id

    const [result] = await pool.execute("DELETE FROM hostels WHERE id = ?", [hostelId])

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Hostel not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Hostel deleted successfully" })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete hostel" }, { status: 500 })
  }
}
