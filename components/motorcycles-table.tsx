"use client";
import { deleteClientFunction, getClientFunction, getMotorcycleFunction, getProductFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { PostMotorcycleForm } from "./forms/PostMotorcycleForm";
import { PutProductForm } from "./forms/PutProductForm";
import { ViewClient } from "./view/ViewClient";
import { toast } from "./ui/use-toast";
import { ViewProduct } from "./view/ViewProduct";
import { ViewMotorcycle } from "./view/ViewMotorcycle";
import { PutMotorcycleForm } from "./forms/PutMotorcycleForm";

export function MotorcyclesTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getMotorcycleFunction()
                setData(result)
            } catch (error) {
                console.error("Erro ao buscar dados da moto:", error)
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



    const handleUpdateMotorcycle = (updatedMotorcycle) => {
        setData((prevData) =>
            prevData.map((moto) =>
                moto.chassi === updatedProduct.chassi ? updatedProduct : moto
            )
        );
    };

    const filteredData = sortedData.filter((moto) =>
        moto.placa.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite a placa para filtrar"
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostMotorcycleForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("chassi")}>
                                    Chassi
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("proprietario")}>
                                    Proprietário
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("placa")}>
                                    Placa
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("cap_carga")}>
                                    Capacidade de carga
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((moto) => (
                            <TableRow key={moto.chassi}>
                                <TableCell className="font-medium">
                                    {moto.chassi}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            moto.proprietario === "Proprio"
                                                ? "outline"
                                                : moto.proprietario === "Terceirizado"
                                                    ? "secondary"
                                                    : "default"
                                        }
                                    >
                                        {moto.proprietario}
                                    </Badge>
                                </TableCell>


                                <TableCell>{moto.placa}</TableCell>
                                <TableCell>{moto.cap_carga}kg</TableCell>
                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewMotorcycle moto={moto} />
                                        <PutMotorcycleForm moto={moto} onUpdate={handleUpdateMotorcycle} />
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
