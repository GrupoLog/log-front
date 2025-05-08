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
import { postTripFunction } from "@/services/APIService"  // <-- Troquei para postTripFunction
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PostDriverForm } from "../drivers/PostDriverForm"

const FormSchema = z.object({
    origem: z.string().min(1, { message: "Origem é obrigatória" }),
    destino: z.string().min(1, { message: "Destino é obrigatório" }),
    data_viagem: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" }),
    hora_viagem: z.string().min(1, { message: "Hora é obrigatória" }),
    cnh: z.string().min(1, { message: "CNH do motorista é obrigatória" }),
    id_veiculo: z.string().min(1, { message: "ID do veículo é obrigatório" }),
    observacoes: z.string().optional(),
})

export function PostTripForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            origem: "",
            destino: "",
            data_viagem: "",
            hora_viagem: "",
            cnh: "",
            id_veiculo: "",
            observacoes: "",
        },
    })

    const motoristas = [
        { nome: "João Silva", cnh: "12345678900" },
        { nome: "Maria Souza", cnh: "98765432100" },
        { nome: "Carlos Lima", cnh: "56789012345" },
    ]

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await postTripFunction(data)

            toast({
                title: "Viagem cadastrada!",
                description: "A viagem foi adicionada com sucesso.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Erro ao cadastrar viagem",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            })
            console.error("Erro ao enviar dados:", error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto bg-lime-300">Adicionar viagem</Button>
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Adicionar Viagem</DialogTitle>
                </VisuallyHidden>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <Accordion type="single" collapsible className="w-full">

                            {/* Dados da viagem */}
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Dados da viagem</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="origem"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Origem</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Cidade de origem" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="destino"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Destino</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Cidade de destino" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="data_viagem"
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
                                            name="hora_viagem"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Hora</FormLabel>
                                                    <FormControl>
                                                        <Input type="time" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Dados do motorista */}
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Dados do motorista</AccordionTrigger>
                                <AccordionContent>
                                    Selecione ou cadastre o motorista responsável pela viagem.
                                    <div className="grid grid-cols-2 gap-6 pt-4">

                                        <FormField
                                            control={form.control}
                                            name="cnh"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o motorista" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {motoristas.map((motorista) => (
                                                                <SelectItem key={motorista.cnh} value={motorista.cnh}>
                                                                    {motorista.nome} — {motorista.cnh}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <PostDriverForm />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Dados do veículo */}
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Dados do veículo</AccordionTrigger>
                                <AccordionContent>
                                    Selecione ou cadastre o veículo responsável pela viagem.
                                    <FormField
                                        control={form.control}
                                        name="id_veiculo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ID do veículo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="ID do veículo" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className="text-center">
                            <Button type="submit">Adicionar viagem</Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
