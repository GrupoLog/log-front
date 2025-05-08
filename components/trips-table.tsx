"use client";
import { deleteClientFunction, getProductFunction, getTripFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PostTripForm } from "./forms/trips/PostTripForm";
import { ViewTrip } from "./view/ViewTrip";

export function TripsTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTripFunction()
                setData(result)
                setSorting("id_viagem")
                setSortDirection("asc")
            } catch (error) {
                console.error("Erro ao buscar dados da viagem:", error)
            }
        }
        fetchData()
    }, [])

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

    const handleUpdateTrip = (updatedTrip) => {
        setData((prevData) =>
            prevData.map((viagem) =>
                viagem.id_viagem === updatedTrip.id_viagem ? updatedTrip : viagem
            )
        );
    };

    const filteredData = sortedData.filter((viagem) =>
        viagem.destino.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite o destino da viagem para filtrar"
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostTripForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("id_viagem")}>
                                    ID
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("origem")}>
                                    Origem
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("destino")}>
                                    Destino
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("data_viagem")}>
                                    Data da viagem
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                    Hora da viagem
                            </TableHead>
                            <TableHead>
                                    Nome do motorista
                            </TableHead>

                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((viagem) => (
                            <TableRow key={viagem.id_viagem}>
                                <TableCell className="font-medium">
                                    {viagem.id_viagem}
                                </TableCell>
                                <TableCell>{viagem.origem}</TableCell>
                                <TableCell>{viagem.destino}</TableCell>
                                <TableCell>{new Date(viagem.data_viagem).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{viagem.hora_viagem}</TableCell>
                                <TableCell>{viagem.nomeMotorista}</TableCell>

                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewTrip viagem={viagem} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
