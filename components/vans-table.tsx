"use client";
import { deleteClientFunction, getClientFunction, getMotorcycleFunction, getProductFunction, getVanFunction } from "../services/APIService"
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
import { PostVanForm } from "./forms/PostVanForm";
import { PutVanForm } from "./forms/PutVanForm";
import { ViewVan } from "./view/ViewVan";

export function VansTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getVanFunction()
                setData(result)
            } catch (error) {
                console.error("Erro ao buscar dados da van:", error)
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



    const handleUpdateVan = (updatedVan) => {
        setData((prevData) =>
            prevData.map((moto) =>
                van.chassi === updatedProduct.chassi ? updatedProduct : van
            )
        );
    };

    const filteredData = sortedData.filter((van) =>
        van.placa.toLowerCase().includes(filterText.toLowerCase())
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
                <PostVanForm />
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
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("cap_passageiros")}>
                                    Capacidade de passageiros
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((van) => (
                            <TableRow key={van.chassi}>
                                <TableCell className="font-medium">
                                    {van.chassi}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            van.proprietario === "Proprio"
                                                ? "outline"
                                                : van.proprietario === "Terceirizado"
                                                    ? "secondary"
                                                    : "default"
                                        }
                                    >
                                        {van.proprietario}
                                    </Badge>
                                </TableCell>


                                <TableCell>{van.placa}</TableCell>
                                <TableCell>{van.cap_passageiros}</TableCell>
                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewVan van={van} />
                                        <PutVanForm van={van} onUpdate={handleUpdateVan} />
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
