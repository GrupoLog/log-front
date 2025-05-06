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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { postProductFunction } from "@/services/APIService"
import { Textarea } from "../ui/textarea"

// Alteração no schema Zod
const FormSchema = z.object({
    peso: z.string().transform((val) => {
        const parsedVal = Number(val)
        return isNaN(parsedVal) ? undefined : parsedVal // Evita atribuir 0 se for vazio
    }).refine((val) => val !== undefined, {
        message: "Peso é obrigatório",
    }),
    data_validade: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data inválida",
    }),
    descricao: z.string(),
})

export function PostProductForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            peso: "",
            data_validade: "",
            descricao: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await postProductFunction(data)

            toast({
                title: "Produto cadastrado!",
                description: "O produto foi adicionado com sucesso.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Erro ao cadastrar produto",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            })
            console.error("Erro ao enviar dados:", error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto bg-lime-300">Adicionar produto</Button>
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent
                className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none"
            >
                <VisuallyHidden>
                    <DialogTitle>Adicionar Produto</DialogTitle>
                </VisuallyHidden>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="peso"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Peso</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Digite o peso do produto"
                                                {...field}
                                                required
                                                value={field.value ?? ""}  // Deixa o valor vazio inicialmente
                                                onChange={(e) => field.onChange(e.target.value)}  // Passa o valor como string inicialmente
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="data_validade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Validade</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="Validade do produto"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Digite a descrição" {...field} rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-2 text-center">
                            <Button type="submit">Adicionar produto</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
