"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogTrigger
} from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

export function ViewProduct({ produto }) {
    const [open, setOpen] = useState(false)

    function formatDateBR(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return "";
        return date.toLocaleDateString('pt-BR');
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Search size={20} />
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Visualizar Produto</DialogTitle>
                </VisuallyHidden>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">ID</label>
                            <Input value={produto.id_produto} readOnly />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Data validade</label>
                            <Input value={formatDateBR(produto.data_validade)} readOnly />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Peso</label>
                            <Input value={produto.peso} readOnly />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Descrição</label>
                            <Textarea value={produto.descricao} readOnly />
                        </div>

                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
