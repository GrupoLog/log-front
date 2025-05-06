"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const data = [
  {
    id: "SHP-1234",
    customer: "Acme Corp",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    carrier: "FastShip",
    status: "Delivered",
    date: "2023-04-09",
    eta: "2023-04-08",
    weight: "245 kg",
    value: "$12,500",
  },
  {
    id: "SHP-1235",
    customer: "Globex Inc",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    carrier: "QuickFreight",
    status: "In Transit",
    date: "2023-04-08",
    eta: "2023-04-10",
    weight: "180 kg",
    value: "$8,200",
  },
  {
    id: "SHP-1236",
    customer: "Stark Industries",
    origin: "Boston, MA",
    destination: "Seattle, WA",
    carrier: "PrimeLogistics",
    status: "Processing",
    date: "2023-04-08",
    eta: "2023-04-12",
    weight: "320 kg",
    value: "$22,000",
  },
  {
    id: "SHP-1237",
    customer: "Wayne Enterprises",
    origin: "Gotham City",
    destination: "Metropolis",
    carrier: "FastShip",
    status: "Delayed",
    date: "2023-04-07",
    eta: "2023-04-09",
    weight: "150 kg",
    value: "$9,800",
  },
  {
    id: "SHP-1238",
    customer: "Umbrella Corp",
    origin: "Raccoon City",
    destination: "Silent Hill",
    carrier: "QuickFreight",
    status: "Delivered",
    date: "2023-04-07",
    eta: "2023-04-07",
    weight: "210 kg",
    value: "$15,300",
  },
  {
    id: "SHP-1239",
    customer: "Initech",
    origin: "Austin, TX",
    destination: "Portland, OR",
    carrier: "PrimeLogistics",
    status: "In Transit",
    date: "2023-04-06",
    eta: "2023-04-09",
    weight: "175 kg",
    value: "$7,500",
  },
  {
    id: "SHP-1240",
    customer: "Cyberdyne Systems",
    origin: "San Francisco, CA",
    destination: "Denver, CO",
    carrier: "FastShip",
    status: "Processing",
    date: "2023-04-06",
    eta: "2023-04-10",
    weight: "290 kg",
    value: "$18,200",
  },
  {
    id: "SHP-1241",
    customer: "Soylent Corp",
    origin: "Las Vegas, NV",
    destination: "Phoenix, AZ",
    carrier: "QuickFreight",
    status: "Delivered",
    date: "2023-04-05",
    eta: "2023-04-05",
    weight: "120 kg",
    value: "$5,400",
  },
  {
    id: "SHP-1242",
    customer: "Massive Dynamic",
    origin: "Atlanta, GA",
    destination: "Nashville, TN",
    carrier: "PrimeLogistics",
    status: "Delivered",
    date: "2023-04-05",
    eta: "2023-04-04",
    weight: "230 kg",
    value: "$11,800",
  },
  {
    id: "SHP-1243",
    customer: "Oscorp Industries",
    origin: "Philadelphia, PA",
    destination: "Charlotte, NC",
    carrier: "FastShip",
    status: "In Transit",
    date: "2023-04-04",
    eta: "2023-04-07",
    weight: "260 kg",
    value: "$14,500",
  },
]

export function ShipmentsTable() {
  const [sorting, setSorting] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sorting === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSorting(column)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sorting) return 0

    const aValue = a[sorting]
    const bValue = b[sorting]

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Filter shipments..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Tracking ID</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Customer</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Origin</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Destination</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Carrier</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Date</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>ETA</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Weight</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Value</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("id")}>
                  Tracking ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("customer")}>
                  Customer
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.carrier}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      shipment.status === "Delivered"
                        ? "success"
                        : shipment.status === "In Transit"
                          ? "default"
                          : shipment.status === "Processing"
                            ? "warning"
                            : "destructive"
                    }
                  >
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell>{shipment.date}</TableCell>
                <TableCell>{shipment.eta}</TableCell>
                <TableCell>{shipment.weight}</TableCell>
                <TableCell>{shipment.value}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Generate invoice</DropdownMenuItem>
                      <DropdownMenuItem>Print label</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
