"use client";
import { getDriverFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PostClientForm } from "./forms/PostClientForm";
import { PutClientForm } from "./forms/PutClientForm";
import { ViewDriver } from "./view/ViewDriver";
import { PostDriverForm } from "./forms/PostDriverForm";
import { PutDriverForm } from "./forms/PutDriverForm";

export function DriversTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getDriverFunction()
                setData(result)
            } catch (error) {
                console.error("Erro ao buscar dados do motorista:", error)
            }
        }
        fetchData()
    }, [])

    const formatPhoneNumber = (phone: string) => {
        if (!phone) return phone;
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    };

    const handleSort = (column: string) => {
        if (sorting === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSorting(column)
            setSortDirection("asc")
        }
    }

    const sortedData = [...data]
        .filter((driver) => driver && typeof driver.cpf === "string")
        .sort((a, b) => {
            if (!sorting) return 0;
            const aValue = a[sorting];
            const bValue = b[sorting];
            if (aValue == null || bValue == null) return 0;
            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const handleUpdateDriver = (updatedDriver) => {
        setData((prevData) =>
            prevData.map((driver) =>
                driver.cpf === updatedDriver.cpf ? updatedDriver : driver
            )
        );
    };

    const filteredData = sortedData.filter((driver) =>
        typeof driver.nome === "string" &&
        driver.nome.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite o nome para filtrar"
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostDriverForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("cnh")}>
                                    CNH
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("cpf")}>
                                    CPF
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("nome")}>
                                    Nome
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Tipo CNH</TableHead>
                            <TableHead>Telefone 1</TableHead>
                            <TableHead>Telefone 2</TableHead>
                            <TableHead>Gerente (CNH)</TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((driver) => (
                            <TableRow key={driver.cpf}>
                                <TableCell>{driver.cnh}</TableCell>
                                <TableCell>{driver.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")}</TableCell>
                                <TableCell>{driver.nome}</TableCell>
                                <TableCell>{driver.tipo}</TableCell>
                                <TableCell>{driver.tipo_cnh}</TableCell>
                                <TableCell>{formatPhoneNumber(driver.telefone_um)}</TableCell>
                                <TableCell>{formatPhoneNumber(driver.telefone_dois)}</TableCell>
                                <TableCell>{driver.cnh_supervisionado}</TableCell>
                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewDriver motorista={driver} />
                                        <PutDriverForm motorista={driver} onUpdate={handleUpdateDriver} />
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
