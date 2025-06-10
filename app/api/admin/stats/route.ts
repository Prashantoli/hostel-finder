import { NextResponse } from "next/server"
import pool from "@/lib/mysql"

export async function GET() {
  try {
    // Get total hostels
    const [totalResult] = await pool.execute("SELECT COUNT(*) as total FROM hostels")
    const totalHostels = (totalResult as any[])[0].total

    // Get available hostels
    const [availableResult] = await pool.execute("SELECT COUNT(*) as available FROM hostels WHERE availability = true")
    const availableHostels = (availableResult as any[])[0].available

    // Get total potential revenue
    const [revenueResult] = await pool.execute("SELECT SUM(price) as revenue FROM hostels WHERE availability = true")
    const totalRevenue = (revenueResult as any[])[0].revenue || 0

    // Get average rating
    const [ratingResult] = await pool.execute("SELECT AVG(rating) as avg_rating FROM hostels WHERE rating > 0")
    const averageRating = Math.round(((ratingResult as any[])[0].avg_rating || 0) * 10) / 10

    return NextResponse.json({
      totalHostels,
      availableHostels,
      totalRevenue: Number.parseFloat(totalRevenue),
      averageRating,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
