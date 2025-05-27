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
import { getDeliveryById, getDriverById, getTransportationById, getTripById, getVehicleById } from "@/services/APIService"

export function ViewTransport({ transporte }) {
    const [open, setOpen] = useState(false)

    const [transportation, setTransportation] = useState(null)
    const [loadingTrip, setLoadingTrip] = useState(false)

    const [trip, setTrip] = useState(null)


    function formatDateBR(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return "";
        return date.toLocaleDateString('pt-BR');
    }

    async function fetchTransportation(idTransporte) {
        try {
            const data = await getTransportationById(idTransporte)
            setTransportation(data)

            if (data?.id_viagem) {
                fetchTrip(data.id_viagem)
            }

        } catch (error) {
            console.error(error)
            setTransportation(null)
        }
    }

    async function fetchTrip(idViagem) {
        setLoadingTrip(true)
        try {
            const data = await getTripById(idViagem)
            setTrip(data)
        } catch (error) {
            console.error(error)
            setTrip(null)
        } finally {
            setLoadingTrip(false)
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
            if (isOpen && transporte.id_viagem) {
                fetchTransportation(transporte.id_viagem)
                // if (viagem.chassi) {
                //     fetchVeiculo(viagem.chassi)
                // }
            }
        }}>
            <DialogTrigger>
                <Search size={20} />
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Visualizar Transporte</DialogTitle>
                </VisuallyHidden>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Dados do transporte</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">ID</label>
                                        <Input value={transporte.id_servico} readOnly className="bg-gray-100 text-gray-500" />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Descrição</label>
                                        <Input value={transporte.descricao_transporte} readOnly className="bg-gray-100 text-gray-500" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Quantidade de passageiros</label>
                                        <Input value={transporte.qtd_passageiros} readOnly className="bg-gray-100 text-gray-500" />
                                    </div>
                                </div>
                            </div>

                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Dados da viagem</AccordionTrigger>
                        <AccordionContent>
                            {loadingTrip ? (
                                <p className="text-gray-500 text-sm">Carregando dados da viagem...</p>
                            ) : trip ? (
                                <div className="grid grid-cols-2 gap-6">
                                    {/* DADOS DA VIAGEM PROPRIAMENTE DITA */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">ID da Viagem</label>
                                            <Input value={trip.id_viagem ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Origem</label>
                                            <Input value={trip.origem ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Data da viagem</label>
                                            <Input value={formatDateBR(trip.data_viagem)} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>

                                    </div>

                                    <div className="space-y-4">
                                        <div className="invisible">
                                            <label className="text-sm font-medium text-gray-700">Destino</label>
                                            <Input value={trip.destino ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Destino</label>
                                            <Input value={trip.destino ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Hora da viagem</label>
                                            <Input value={trip.hora_viagem} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                    </div>



                                    {/* DADOS DO MOTORISTA PROPRIAMENTE DITO */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">CNH</label>
                                            <Input value={trip.cnh ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Tipo</label>
                                            <Input value={trip.tipo ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>

                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Nome do motorista</label>
                                            <Input value={trip.nome ?? ''} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Telefone 1</label>
                                            <Input value={formatPhone(trip.telefone_um)} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                    </div>
                                    {/* DADOS DO VEICULO PROPRIAMENTE DITO */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Placa do veículo</label>
                                            <Input value={formatPhone(trip.placa)} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Proprietário</label>
                                            <Input value={formatPhone(trip.proprietario)} readOnly className="bg-gray-100 text-gray-500" />
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <p className="text-red-500 text-sm">Motorista não encontrado.</p>
                            )}


                        </AccordionContent>

                    </AccordionItem>

                </Accordion>

            </DialogContent>
        </Dialog>
    )
}
