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
import { postMotorcycleFunction } from "@/services/APIService"

const FormSchema = z.object({
    chassi: z.string().min(1, "Chassi é obrigatório"),
    proprietario: z.string().min(1, "Proprietário é obrigatório"),
    placa: z.string().min(1, "Placa é obrigatória"),
    cap_carga: z
        .string()
        .min(1, "Capacidade de carga é obrigatória")
        .refine((val) => !isNaN(Number(val)), {
            message: "Deve ser um número válido",
        }),
})

export function PostMotorcycleForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            chassi: "",
            proprietario: "",
            placa: "",
            cap_carga: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const payload = {
                ...data,
                cap_carga: Number(data.cap_carga),
            }

            await postMotorcycleFunction(payload)

            toast({
                title: "Moto cadastrada!",
                description: "A moto foi adicionada com sucesso.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Erro ao cadastrar moto",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            })
            console.error("Erro ao enviar dados:", error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto bg-lime-300">Adicionar moto</Button>
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent
                className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none"
            >
                <VisuallyHidden>
                    <DialogTitle>Adicionar Moto</DialogTitle>
                </VisuallyHidden>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="chassi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chassi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o código do chassi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="proprietario"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Proprietário</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Selecione o proprietário" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="placa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Placa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite a placa da moto" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cap_carga"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capacidade de carga</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Digite a capacidade de carga"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-2 text-center">
                            <Button type="submit">Adicionar moto</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
