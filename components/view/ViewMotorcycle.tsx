"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import * as Dialog from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"


export function ViewMotorcycle({ moto }) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Search size={20} />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                    <VisuallyHidden>
                        <Dialog.Title>Visualizar Moto</Dialog.Title>
                    </VisuallyHidden>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Chassi</label>
                                <Input value={moto.chassi} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Proprietário</label>
                                <Input value={moto.proprietario} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Placa</label>
                                <Input value={moto.placa} readOnly className="bg-gray-100 text-gray-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Capacidade de carga</label>
                                <Input value={moto.cap_carga} readOnly className="bg-gray-100 text-gray-500" />
                            </div>

                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
