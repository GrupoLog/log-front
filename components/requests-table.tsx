"use client";
import { deleteClientFunction, getProductFunction, getRequestsFunction, getTripFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PostTripForm } from "./forms/trips/PostTripForm";
import { ViewTrip } from "./view/ViewTrip";
import { PostRequestForm } from "./forms/requests/PostRequest";

export function RequestsTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getRequestsFunction()
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

    const handleUpdateRequest = (updatedRequest) => {
        setData((prevData) =>
            prevData.map((solicitacao) =>
                solicitacao.id_solicitacao === updatedRequest.id_solicitacao ? updatedRequest : solicitacao
            )
        );
    };

    const filteredData = sortedData.filter((solicitacao) =>
        solicitacao.clientes_cpf.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite o CPF do cliente para filtrar"
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostRequestForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("id_solicitacao")}>
                                    ID
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                CPF do cliente
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("data_solicitacao")}>
                                    Data da solicitação
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("origem")}>
                                    Forma de pagamento
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("destino")}>
                                    Valor do pagamento
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>


                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((solicitacao) => (
                            <TableRow key={solicitacao.id_solicitacao}>
                                <TableCell className="font-medium">
                                    {solicitacao.id_solicitacao}
                                </TableCell>
                                <TableCell>
                                    {solicitacao.clientes_cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")}
                                </TableCell>
                                <TableCell>{new Date(solicitacao.data_solicitacao).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{solicitacao.forma_pagamento}</TableCell>
                                <TableCell>
                                    {Number(solicitacao.valor_pagamento).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </TableCell>

                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewTrip viagem={solicitacao} />
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
