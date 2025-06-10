import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/mysql"
import type { Hostel } from "@/types/hostel"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const location = searchParams.get("location") || ""
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "10000")
    const rating = Number.parseFloat(searchParams.get("rating") || "0")
    const type = searchParams.get("type") || ""

    let query = `
      SELECT 
        id, name, location, address, price, type, description, 
        amenities, images, contact_email, contact_phone,
        check_in_time, check_out_time, policies, capacity,
        rating, reviews_count, availability, created_at, updated_at
      FROM hostels 
      WHERE price >= ? AND price <= ?
    `

    const params: any[] = [minPrice, maxPrice]

    if (location && location !== "all") {
      query += " AND location = ?"
      params.push(location)
    }

    if (rating > 0) {
      query += " AND rating >= ?"
      params.push(rating)
    }

    if (type) {
      query += " AND type = ?"
      params.push(type)
    }

    query += " ORDER BY rating DESC, reviews_count DESC"

    const [rows] = await pool.execute(query, params)

    const hostels = (rows as any[]).map((row) => ({
      id: row.id.toString(),
      name: row.name,
      location: row.location,
      price: Number.parseFloat(row.price),
      rating: Number.parseFloat(row.rating),
      type: row.type,
      image: Array.isArray(row.images) ? row.images[0] : row.images ? JSON.parse(row.images)[0] : "/placeholder.svg",
      amenities: Array.isArray(row.amenities) ? row.amenities : row.amenities ? JSON.parse(row.amenities) : [],
      description: row.description,
      availability: Boolean(row.availability),
      reviews: row.reviews_count,
    }))

    return NextResponse.json(hostels)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch hostels" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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
      INSERT INTO hostels (
        name, location, address, price, type, description, amenities, images,
        contact_email, contact_phone, check_in_time, check_out_time, policies, capacity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params = [
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
    ]

    const [result] = await pool.execute(query, params)
    const insertId = (result as any).insertId

    // Fetch the created hostel
    const [rows] = await pool.execute("SELECT * FROM hostels WHERE id = ?", [insertId])
    const hostel = (rows as any[])[0]

    const responseHostel: Hostel = {
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

    return NextResponse.json(responseHostel, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create hostel" }, { status: 500 })
  }
}
