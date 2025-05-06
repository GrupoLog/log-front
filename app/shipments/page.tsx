import { Package } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { ShipmentsTable } from "@/components/shipments-table"
import { UserNav } from "@/components/user-nav"

export default function ShipmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Shipments</h2>
            <p className="text-muted-foreground">Manage and track all shipments in your logistics system</p>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Total: 1,284 shipments</span>
          </div>
        </div>
        <ShipmentsTable />
      </div>
    </div>
  )
}
