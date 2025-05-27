"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import * as Dialog from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"

export function ViewDriver({ motorista }) {
    const [open, setOpen] = useState(false)
    const phones = Array.isArray(motorista.phonesList) ? motorista.phonesList : []

    function formatPhone(phone) {
        if (!phone) return ''
        const cleaned = phone.replace(/\D/g, '')

        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3')
        } else {
            return phone
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Search size={20} />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                    <VisuallyHidden>
                        <Dialog.Title>Visualizar Motorista</Dialog.Title>
                    </VisuallyHidden>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">CNH</label>
                                <Input value={motorista.cnh} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">CPF</label>
                                <Input value={motorista.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Nome</label>
                                <Input value={motorista.nome} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Telefone 1</label>
                                <Input value={formatPhone(motorista.telefone_um)} readOnly className="bg-gray-100 text-gray-500" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Tipo</label>
                                <Input value={motorista.tipo} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Tipo CNH</label>
                                <Input value={motorista.tipo_cnh} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Gerente (CNH)</label>
                                <Input value={motorista.cnh_supervisionado} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Telefone 2</label>
                                <Input value={formatPhone(motorista.telefone_dois)} readOnly className="bg-gray-100 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
