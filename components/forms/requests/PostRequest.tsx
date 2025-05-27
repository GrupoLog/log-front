"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogTrigger
} from "@radix-ui/react-dialog"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getClientFunction, getDriverFunction, getRequestsFunction, getServicingsFunction, getTripFunction, getVehiclesFunction, postDeliveryFunction, postRequestFunction, postTripFunction } from "@/services/APIService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

const FormSchema = z.object({
    id_servico: z.string().min(1, { message: "Selecionar um serviço é obrigatório" }),
    clientes_cpf: z.string().min(1, { message: "Selecionar um cliente é obrigatório" }),
    valor_pagamento: z
        .string()
        .min(1, "Definir o valor do pagamento é obrigatório")
        .refine((val) => !isNaN(Number(val)), {
            message: "Deve ser um número válido",
        }),
    status_pagamento: z.enum(["Pendente", "Pago", "Cancelado"], { message: "Status de pagamento inválido" }).default("Pendente"),
    forma_pagamento: z.enum(["Pix", "Cartao", "Especie"], { message: "Forma de pagamento inválida" }),
    data_solicitacao: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" }),
})

export function PostRequestForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id_servico: "",
            clientes_cpf: "",
            valor_pagamento: "",
            status_pagamento: "Pendente",
            forma_pagamento: "Pix",
            data_solicitacao: "",
        },
    })

    const [clientes, setClientes] = useState<{ nome: string, cpf: string }[]>([])
    const [servicos, setServicos] = useState<{ id_servico: string, id_viagem: string }[]>([])

    const [loadingClientes, setLoadingClientes] = useState(true)
    const [loadingServicos, setLoadingServicos] = useState(true)

    useEffect(() => {
        async function fetchClientes() {
            try {
                const result = await getClientFunction()
                setClientes(result)
            } catch (error) {
                console.error("Erro ao buscar viagens:", error)
            } finally {
                setLoadingClientes(false)
            }
        }

        async function fetchServicos() {
            try {
                const result = await getServicingsFunction()
                setServicos(result)
            } catch (error) {
                console.error("Erro ao buscar serviços:", error)
            } finally {
                setLoadingServicos(false)
            }
        }

        fetchServicos()
        fetchClientes()
    }, [])


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await postRequestFunction(data)

            toast({
                title: "Solicitação cadastrada!",
                description: "A solicitação foi adicionada com sucesso.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Erro ao cadastrar solicitação",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            })
            console.error("Erro ao enviar dados:", error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto bg-lime-300">Adicionar solicitação</Button>
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Adicionar Solicitação</DialogTitle>
                </VisuallyHidden>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <Accordion type="single" collapsible className="w-full">

                            <AccordionItem value="item-1">
                                <AccordionTrigger>Dados da entrega</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="forma_pagamento"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Forma de pagamento</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione a forma de pagamento" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Pix">Pix</SelectItem>
                                                                <SelectItem value="Cartao">Cartão</SelectItem>
                                                                <SelectItem value="Especie">Espécie</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="valor_pagamento"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Valor</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Valor total do pagamento" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="data_solicitacao"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Data</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status_pagamento"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status do pagamento</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o status do pagamento" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Pendente">Pendente</SelectItem>
                                                                <SelectItem value="Pago">Pago</SelectItem>
                                                                <SelectItem value="Cancelado">Cancelado</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Dados do cliente */}
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Dados do cliente</AccordionTrigger>
                                <AccordionContent>
                                    Selecione um cliente existente ou cadastre um novo cliente para essa solicitação.
                                    <div className="grid grid-cols-2 gap-6 pt-4">

                                        <FormField
                                            control={form.control}
                                            name="clientes_cpf"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            disabled={loadingClientes}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={loadingClientes ? "Carregando clientes..." : "Selecione o cliente"} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {clientes.map((cliente) => (
                                                                    <SelectItem key={cliente.cpf} value={cliente.cpf}>
                                                                        {cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")} — {cliente.nome}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>Dados do serviço</AccordionTrigger>
                                <AccordionContent>
                                    Selecione um serviço existente ou cadastre um novo serviço para essa solicitação.
                                    <div className="grid grid-cols-2 gap-6 pt-4">

                                        <FormField
                                            control={form.control}
                                            name="id_servico"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            disabled={loadingServicos}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={loadingServicos ? "Carregando serviços..." : "Selecione o serviço"} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {servicos.map((servico) => (
                                                                    <SelectItem key={servico.id_servico} value={servico.id_servico}>
                                                                        ID do serviço {servico.id_servico} — ID da viagem {servico.id_viagem}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>

                        <div className="text-center">
                            <Button type="submit">Adicionar viagem</Button>
                        </div>

                    </form>
                </Form>
                {/* <PostDriverForm /> */}
                {/* <PostVanForm /> */}
                {/* <PostMotorcycleForm /> */}

            </DialogContent>
        </Dialog>
    )
}
