"use client"

import { Heart, Star, MapPin, Wifi, Car, Coffee, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Hostel } from "../types/hostel"

interface HostelCardProps {
  hostel: Hostel
  onBook: (hostelId: string) => void
  onFavorite: (hostelId: string) => void
}

export function HostelCard({ hostel, onBook, onFavorite }: HostelCardProps) {
  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Breakfast: Coffee,
    "Common Area": Users,
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative">
        <img src={hostel.image || "/placeholder.svg"} alt={hostel.name} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onFavorite(hostel.id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Badge className={`absolute top-2 left-2 ${hostel.availability ? "bg-green-500" : "bg-red-500"}`}>
          {hostel.availability ? "Available" : "Booked"}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{hostel.name}</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">NPR {hostel.price}</div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{hostel.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{hostel.rating}</span>
              <span className="ml-1 text-sm text-gray-500">({hostel.reviews} reviews)</span>
            </div>
            <Badge variant="outline">{hostel.type}</Badge>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{hostel.description}</p>

          <div className="flex flex-wrap gap-2">
            {hostel.amenities.slice(0, 4).map((amenity) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
              return (
                <div key={amenity} className="flex items-center text-xs text-gray-500">
                  {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                  {amenity}
                </div>
              )
            })}
          </div>

          <Button
            onClick={() => onBook(hostel.id)}
            disabled={!hostel.availability}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all"
          >
            {hostel.availability ? "Book Now" : "Not Available"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
