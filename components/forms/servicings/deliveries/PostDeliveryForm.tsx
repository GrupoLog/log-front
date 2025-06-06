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
import { getDriverFunction, getTripFunction, getVehiclesFunction, postDeliveryFunction, postTripFunction } from "@/services/APIService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

const FormSchema = z.object({
    destinatario: z.string().min(1, { message: "O destinatário é obrigatório" }),
    id_viagem: z.string().min(1, { message: "Selecionar uma viagem é obrigatório" }),
    peso_total: z
        .string()
        .min(1, "Peso total é obrigatório")
        .refine((val) => !isNaN(Number(val)), {
            message: "Deve ser um número válido",
        }),
    descricao_produto: z.string().min(1, { message: "A descrição do produto é obrigatória" }),
})

export function PostDeliveryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            destinatario: "",
            id_viagem: "",
            peso_total: "",
            descricao_produto: "",
        },
    })

    const [viagens, setViagens] = useState<{ nome: string, cnh: string }[]>([])
    const [loadingViagens, setLoadingViagens] = useState(true)

    useEffect(() => {
        async function fetchViagens() {
            try {
                const result = await getTripFunction()
                setViagens(result)
            } catch (error) {
                console.error("Erro ao buscar viagens:", error)
            } finally {
                setLoadingViagens(false)
            }
        }

        fetchViagens()
    }, [])


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await postDeliveryFunction(data)

            toast({
                title: "Entrega cadastrada!",
                description: "A entrega foi adicionada com sucesso.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Erro ao cadastrar entrega",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            })
            console.error("Erro ao enviar dados:", error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto bg-lime-300">Adicionar entrega</Button>
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Adicionar Entrega</DialogTitle>
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
                                            name="destinatario"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Destinatário</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nome do destinatário" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="peso_total"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Peso</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Peso total do produto" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="descricao_produto"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Descrição do produto" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Dados da viagem */}
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Dados da viagem</AccordionTrigger>
                                <AccordionContent>
                                    Selecione uma viagem existente ou cadastre uma nova viagem para essa entrega.
                                    <div className="grid grid-cols-2 gap-6 pt-4">

                                        <FormField
                                            control={form.control}
                                            name="id_viagem"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            disabled={loadingViagens}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={loadingViagens ? "Carregando viagens..." : "Selecione a viagem"} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {viagens.map((viagem) => (
                                                                    <SelectItem key={viagem.id_viagem} value={viagem.id_viagem}>
                                                                        {viagem.origem} — {viagem.destino}
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
