import { NextResponse } from "next/server"
import pool from "@/lib/mysql"

export async function GET() {
  try {
    const query = `
      SELECT 
        id, name, location, address, price, type, description, 
        amenities, images, contact_email, contact_phone,
        check_in_time, check_out_time, policies, capacity,
        rating, reviews_count, availability, created_at, updated_at
      FROM hostels 
      ORDER BY created_at DESC
    `

    const [rows] = await pool.execute(query)

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
