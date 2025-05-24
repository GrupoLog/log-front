"use client";
import { getTransportationsFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ViewDelivery } from "./view/ViewDelivery"
import { PostDeliveryForm } from "./forms/servicings/deliveries/PostDeliveryForm";
import { PostTransportForm } from "./forms/servicings/transport/PostTransportForm";
import { ViewTransport } from "./view/ViewTransport";

export function TransportTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTransportationsFunction()
                setData(result)
                setSorting("id_servico")
                setSortDirection("asc")
            } catch (error) {
                console.error("Erro ao buscar dados do transporte:", error)
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

    const filteredData = sortedData.filter((transporte) =>
        transporte.descricao_transporte.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite parte da descrição para filtrar"
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostTransportForm />
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
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("descricao_transporte")}>
                                    Descrição do transporte
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("qtd_passageiros")}>
                                    Quantidade de passageiros
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((transporte) => (
                            <TableRow key={transporte.id_servico}>
                                <TableCell className="font-medium">
                                    {transporte.id_servico}
                                </TableCell>
                                <TableCell>{transporte.descricao_transporte}</TableCell>
                                <TableCell>{transporte.qtd_passageiros}</TableCell>

                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewTransport transporte={transporte} />
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
