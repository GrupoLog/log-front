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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { getDriverById, getTripById, getVehicleById } from "@/services/APIService"

export function ViewTrip({ viagem }) {
    const [open, setOpen] = useState(false)

    const [trip, setTrip] = useState(null)
    const [loadingTrip, setLoadingTrip] = useState(false)

    const [motorista, setMotorista] = useState(null)
    const [loadingMotorista, setLoadingMotorista] = useState(false)

    const [veiculo, setVeiculo] = useState(null)
    const [loadingVeiculo, setLoadingVeiculo] = useState(false)

    function formatDateBR(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return "";
        return date.toLocaleDateString('pt-BR');
    }

    async function fetchTrip(idViagem) {
        try {
            const data = await getTripById(idViagem)
            setTrip(data)

            if (data?.cnh) {
                fetchMotorista(data.cnh)
            }

            if (data?.chassi) {
                fetchVeiculo(data.chassi)
            }

        } catch (error) {
            console.error(error)
            setTrip(null)
        }
    }

    async function fetchMotorista(idMotorista) {
        setLoadingMotorista(true)
        try {
            const data = await getDriverById(idMotorista)
            setMotorista(data)
        } catch (error) {
            console.error(error)
            setMotorista(null)
        } finally {
            setLoadingMotorista(false)
        }
    }


    async function fetchVeiculo(idVeiculo) {
        setLoadingVeiculo(true)
        try {
            const data = await getVehicleById(idVeiculo)
            setVeiculo(data)
        } catch (error) {
            console.error(error)
            setVeiculo(null)
        } finally {
            setLoadingVeiculo(false)
        }
    }


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
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (isOpen && viagem.id_viagem) {
                fetchTrip(viagem.id_viagem)
                if (viagem.chassi) {
                    fetchVeiculo(viagem.chassi)
                }
            }
        }}>
            <DialogTrigger>
                <Search size={20} />
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Visualizar Viagem</DialogTitle>
                </VisuallyHidden>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Dados da viagem</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">ID</label>
                                        <Input value={viagem.id_viagem} readOnly />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Origem</label>
                                        <Input value={viagem.origem} readOnly />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Destino</label>
                                        <Input value={viagem.destino} readOnly />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Data da viagem</label>
                                        <Input value={formatDateBR(viagem.data_viagem)} readOnly />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Hora da viagem</label>
                                        <Input value={viagem.hora_viagem} readOnly />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Dados do motorista</AccordionTrigger>
                        <AccordionContent>
                            {loadingMotorista ? (
                                <p className="text-gray-500 text-sm">Carregando dados do motorista...</p>
                            ) : motorista ? (
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">CNH</label>
                                            <Input value={motorista.cnh ?? ''} readOnly />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Tipo</label>
                                            <Input value={motorista.tipo ?? ''} readOnly />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Tipo CNH</label>
                                            <Input value={motorista.tipo_cnh ?? ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Nome</label>
                                            <Input value={motorista.nome ?? ''} readOnly />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Telefone 1</label>
                                            <Input value={formatPhone(motorista.telefone_um)} readOnly />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-500 text-sm">Motorista não encontrado.</p>
                            )}


                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Dados do veículo</AccordionTrigger>
                        <AccordionContent>
                            {loadingVeiculo ? (
                                <p className="text-gray-500 text-sm">Carregando dados do veículo...</p>
                            ) : veiculo ? (
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Placa</label>
                                            <Input value={veiculo.placa ?? ''} readOnly />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Modelo</label>
                                            <Input value={veiculo.modelo ?? ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Marca</label>
                                            <Input value={veiculo.marca ?? ''} readOnly />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Ano</label>
                                            <Input value={veiculo.ano ?? ''} readOnly />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-red-500 text-sm">Veículo não encontrado.</p>
                            )}


                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </DialogContent>
        </Dialog>
    )
}
