"use client"

import { Package } from "lucide-react"
import { ProductsTable } from "@/components/products-table"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { useEffect, useState } from "react"
import { getTripFunction } from "@/services/APIService"
import { TripsTable } from "@/components/trips-table"

export default function TripsPage() {
  const [tripsData, setTripsData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getTripFunction()
        setTripsData(result)
      } catch (error) {
        console.error("Erro ao buscar dados das viagens:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const tripsCount = tripsData.length  

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
            <h2 className="text-3xl font-bold tracking-tight">Viagens</h2>
            <p className="text-muted-foreground">Gerencie e acompanhe todos as viagens cadastradas</p>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Total: {loading ? "Carregando..." : tripsCount} viagens</span>
          </div>
        </div>
        <TripsTable />
      </div>
    </div>
  )
}
