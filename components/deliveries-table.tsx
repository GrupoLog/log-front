"use client";
import { deleteClientFunction, getDeliveriesFunction, getProductFunction, getTripFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ViewDelivery } from "./view/ViewDelivery"
import { PostDeliveryForm } from "./forms/servicings/deliveries/PostDeliveryForm";

export function DeliveriesTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getDeliveriesFunction()
                setData(result)
                setSorting("id_servico")
                setSortDirection("asc")
            } catch (error) {
                console.error("Erro ao buscar dados da entrega:", error)
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

    // const handleUpdateDelivery = (updatedDelivery) => {
    //     setData((prevData) =>
    //         prevData.map((entrega) =>
    //             entrega.id_servico === updatedDelivery.id_servico ? updatedDelivery : entrega
    //         )
    //     );
    // };

    const filteredData = sortedData.filter((entrega) =>
        entrega.destinatario.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite o destinatário para filtrar" 
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostDeliveryForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("id_servico")}>
                                    ID
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("destinatario")}>
                                    Destinatário
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("descricao_produto")}>
                                    Descrição do produto
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("peso_total")}>
                                    Peso total
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((entrega) => (
                            <TableRow key={entrega.id_servico}>
                                <TableCell className="font-medium">
                                    {entrega.id_servico}
                                </TableCell>
                                <TableCell>{entrega.destinatario}</TableCell>
                                <TableCell>{entrega.descricao_produto}</TableCell>
                                <TableCell>{entrega.peso_total}kg</TableCell>

                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewDelivery entrega={entrega} />
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
