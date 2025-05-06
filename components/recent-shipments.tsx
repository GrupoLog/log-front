import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const shipments = [
  {
    id: "SHP-1234",
    customer: "Acme Corp",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    status: "Delivered",
    date: "2023-04-09",
  },
  {
    id: "SHP-1235",
    customer: "Globex Inc",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    status: "In Transit",
    date: "2023-04-08",
  },
  {
    id: "SHP-1236",
    customer: "Stark Industries",
    origin: "Boston, MA",
    destination: "Seattle, WA",
    status: "Processing",
    date: "2023-04-08",
  },
  {
    id: "SHP-1237",
    customer: "Wayne Enterprises",
    origin: "Gotham City",
    destination: "Metropolis",
    status: "Delayed",
    date: "2023-04-07",
  },
  {
    id: "SHP-1238",
    customer: "Umbrella Corp",
    origin: "Raccoon City",
    destination: "Silent Hill",
    status: "Delivered",
    date: "2023-04-07",
  },
]

export function RecentShipments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tracking ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Origin</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell className="font-medium">{shipment.id}</TableCell>
            <TableCell>{shipment.customer}</TableCell>
            <TableCell>{shipment.origin}</TableCell>
            <TableCell>{shipment.destination}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
