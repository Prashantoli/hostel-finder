"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, MoreHorizontal, Star, MapPin, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Hostel } from "../types/hostel"

interface HostelManagementTableProps {
  hostels: Hostel[]
  onEdit: (hostel: Hostel) => void
  onDelete: (hostelId: string) => void
  onView: (hostel: Hostel) => void
}

export function HostelManagementTable({ hostels, onEdit, onDelete, onView }: HostelManagementTableProps) {
  const [selectedHostels, setSelectedHostels] = useState<string[]>([])

  const handleSelectAll = () => {
    if (selectedHostels.length === hostels.length) {
      setSelectedHostels([])
    } else {
      setSelectedHostels(hostels.map((h) => h.id))
    }
  }

  const handleSelectHostel = (hostelId: string) => {
    setSelectedHostels((prev) => (prev.includes(hostelId) ? prev.filter((id) => id !== hostelId) : [...prev, hostelId]))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Hostels</CardTitle>
            <CardDescription>Manage and monitor your hostel listings</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{hostels.length} Total</Badge>
            <Badge variant="outline" className="text-green-600">
              {hostels.filter((h) => h.availability).length} Available
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {hostels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hostels yet</h3>
            <p className="text-gray-600">Add your first hostel to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedHostels.length === hostels.length}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </TableHead>
                    <TableHead>Hostel</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hostels.map((hostel) => (
                    <TableRow key={hostel.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedHostels.includes(hostel.id)}
                          onChange={() => handleSelectHostel(hostel.id)}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={hostel.image || "/placeholder.svg"} alt={hostel.name} />
                            <AvatarFallback>{hostel.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{hostel.name}</div>
                            <div className="text-sm text-gray-500">{hostel.reviews} reviews</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hostel.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{hostel.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Banknote className="h-4 w-4 mr-1" />
                          NPR {hostel.price}/night
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {hostel.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={hostel.availability ? "bg-green-500" : "bg-red-500"}>
                          {hostel.availability ? "Available" : "Booked"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView(hostel)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(hostel)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete(hostel.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {hostels.map((hostel) => (
                <Card key={hostel.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={hostel.image || "/placeholder.svg"} alt={hostel.name} />
                        <AvatarFallback>{hostel.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{hostel.name}</h3>
                        <p className="text-sm text-gray-500">{hostel.location}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(hostel)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(hostel)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(hostel.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{hostel.type}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        {hostel.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">NPR {hostel.price}/night</div>
                      <Badge className={hostel.availability ? "bg-green-500" : "bg-red-500"}>
                        {hostel.availability ? "Available" : "Booked"}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
