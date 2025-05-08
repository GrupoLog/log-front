"use client";
import { deleteClientFunction, getClientFunction } from "../services/APIService"
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
import { Badge } from "@/components/ui/badge"
import { Form } from "./ui/form";
import { PostClientForm } from "./forms/clients/PostClientForm";
import { PutClientForm } from "./forms/clients/PutClientForm";
import { ViewClient } from "./view/ViewClient";
import { toast } from "./ui/use-toast";

export function ClientsTable() {
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
        const result = await getClientFunction()
        setData(result)
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error)
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


  const sortedData = [...data]
  .filter((client) => client && typeof client.cpf === "string")
  .sort((a, b) => {
    if (!sorting) return 0;

    const aValue = a[sorting];
    const bValue = b[sorting];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });





  async function onDelete(cpf: string) {
    const confirmed = window.confirm("Tem certeza que deseja deletar este cliente?");
    if (!confirmed) return;

    try {
      await deleteClientFunction(cpf);
      setData((prevData) => prevData.filter((cliente) => cliente.cpf !== cpf));
      console.log("Cliente deletado")

      toast({
        title: "Cliente deletado",
        description: `O cliente com CPF ${cpf} foi removido com sucesso.`,
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

  const handleUpdateClient = (updatedClient) => {
    setData((prevData) =>
      prevData.map((cliente) =>
        cliente.cpf === updatedClient.cpf ? updatedClient : cliente
      )
    );
  };

  // const filteredData = sortedData.filter((cliente) =>
  //   cliente.cpf.replace(/\D/g, "").includes(filterText.replace(/\D/g, ""))
  // );

  const filteredData = sortedData.filter((cliente) =>
    typeof cliente.cpf === "string" &&
    cliente.cpf.replace(/\D/g, "").includes(filterText.replace(/\D/g, ""))
  );


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Digite o CPF para filtrar"
          className="max-w-sm"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <PostClientForm />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
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
              <TableHead>Sobrenome</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("rua")}>
                  Rua
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("bairro")}>
                  Bairro
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead className="text-right">Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((cliente) => (
              <TableRow key={cliente.cpf}>
                <TableCell className="font-medium">
                  {cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")}
                </TableCell>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.sobrenome}</TableCell>
                <TableCell>{cliente.rua}</TableCell>
                <TableCell>{cliente.bairro}</TableCell>
                <TableCell>{cliente.numero}</TableCell>
                <TableCell>{cliente.cidade}</TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-end gap-4">
                    <ViewClient cliente={cliente} />
                    <PutClientForm cliente={cliente} onUpdate={handleUpdateClient} />
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
