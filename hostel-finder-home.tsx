"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { SearchFiltersComponent } from "./components/search-filters"
import { HostelCard } from "./components/hostel-card"
import { searchHostels } from "./api/hostels"
import type { Hostel, SearchFilters } from "./types/hostel"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, TrendingUp, Award, Users } from "lucide-react"

export default function HostelFinderHome() {
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true)
    setHasSearched(true)
    try {
      const results = await searchHostels(filters)
      setHostels(results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBook = (hostelId: string) => {
    console.log("Booking hostel:", hostelId)
    // Implement booking logic
  }

  const handleFavorite = (hostelId: string) => {
    console.log("Adding to favorites:", hostelId)
    // Implement favorite logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Hostel</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover amazing hostels worldwide with our smart recommendation system
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-200">Cities</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-blue-200">Hostels</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-blue-200">Avg Rating</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">100K+</div>
                <div className="text-sm text-blue-200">Happy Travelers</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFiltersComponent onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLoading ? "Searching..." : `Found ${hostels.length} hostels`}
              </h2>
              <p className="text-gray-600">Results sorted by our collaborative filtering algorithm</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostels.map((hostel) => (
                  <HostelCard key={hostel.id} hostel={hostel} onBook={handleBook} onFavorite={handleFavorite} />
                ))}
              </div>
            )}

            {!isLoading && hostels.length === 0 && hasSearched && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hostels found</h3>
                <p className="text-gray-600">Try adjusting your search filters to find more options</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">HF</span>
                </div>
                <span className="text-xl font-bold">Hostel Finder</span>
              </div>
              <p className="text-gray-400">Find and book the perfect hostel for your next adventure.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hostel Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
