"use client";
import { deleteClientFunction, getClientFunction, getProductFunction } from "../services/APIService"
import { useEffect, useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { PostProductForm } from "./forms/PostProductForm";
import { PutProductForm } from "./forms/PutProductForm";
import { ViewClient } from "./view/ViewClient";
import { toast } from "./ui/use-toast";
import { ViewProduct } from "./view/ViewProduct";

export function ProductsTable() {
    const [data, setData] = useState([])
    const [sorting, setSorting] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [filterText, setFilterText] = useState("")
    // // // // // // // // // // // // // // // // // // // // // // // // //
    const [selectedClient, setSelectedClient] = useState(null)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [clientes, setClientes] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)


    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getProductFunction()
                setData(result)
            } catch (error) {
                console.error("Erro ao buscar dados do produto:", error)
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


    async function onDelete(cpf: string) {
        const confirmed = window.confirm("Tem certeza que deseja deletar este produto?");
        if (!confirmed) return;

        try {
            await deleteClientFunction(cpf);
            setData((prevData) => prevData.filter((produto) => produto.id_produto !== id_produto));
            console.log("Cliente deletado")

            toast({
                title: "Cliente deletado",
                description: `O produto com ID ${id_produto} foi removido com sucesso.`,
            });
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            toast({
                title: "Erro ao deletar",
                description: "Ocorreu um erro ao tentar deletar o cliente.",
                variant: "destructive",
            });
        }
    }

    const handleUpdateProduct = (updatedProduct) => {
        setData((prevData) =>
            prevData.map((produto) =>
                produto.id_produto === updatedProduct.id_produto ? updatedProduct : produto
            )
        );
    };

    const filteredData = sortedData.filter((produto) =>
        produto.descricao.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Digite a descrição do produto para filtrar"
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <PostProductForm />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("id_produto")}>
                                    ID
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("peso")}>
                                    Peso
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("data_validade")}>
                                    Data de validade
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("descricao")}>
                                    Descrição
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">Opções</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((produto) => (
                            <TableRow key={produto.id_produto}>
                                <TableCell className="font-medium">
                                    {produto.id_produto}
                                </TableCell>
                                <TableCell>{produto.peso}g</TableCell>
                                <TableCell>{new Date(produto.data_validade).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{produto.descricao}</TableCell>
                                <TableCell className="text-left">
                                    <div className="flex justify-end gap-4">
                                        <ViewProduct produto={produto} />
                                        <PutProductForm produto={produto} onUpdate={handleUpdateProduct} />
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
