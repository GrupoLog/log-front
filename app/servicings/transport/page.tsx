"use client"
import { UserRound } from "lucide-react"
import { ClientsTable } from "@/components/clients-table"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { useEffect, useState } from "react"
import { getClientFunction, getDeliveriesFunction, getMotorcycleFunction } from "@/services/APIService"
import { DriversTable } from "@/components/drivers-table"
import { MotorcyclesTable } from "@/components/motorcycles-table"
import { DeliveriesTable } from "@/components/deliveries-table"
import { TransportTable } from "@/components/transport-table"

export default function TransportPage() {
    const [transportData, setTransportData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getDeliveriesFunction()
                setTransportData(result)
            } catch (error) {
                console.error("Erro ao buscar dados dos transportes:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const transportCount = transportData.length

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
                        <h2 className="text-3xl font-bold tracking-tight">Transportes</h2>
                        <p className="text-muted-foreground">Gerencie e acompanhe todos os transportes cadastrados</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserRound className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Total: {loading ? "Carregando..." : transportCount} transportes</span>
                    </div>
                </div>
                <TransportTable />
            </div>
        </div>
    )
}

