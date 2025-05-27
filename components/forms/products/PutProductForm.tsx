"use client"
import { useState } from "react"
import { Pencil } from "lucide-react"
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
import { putProductFunction } from "@/services/APIService"
import { Textarea } from "../../ui/textarea"

const FormSchema = z.object({
    id_produto: z.number({
        required_error: "ID do produto é obrigatório",
    }),
    peso: z.number({
        required_error: "Peso é obrigatório",
        invalid_type_error: "Peso deve ser um número",
    }),
    data_validade: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Data inválida",
    }),
    descricao: z.string(),
})


export function PutProductForm({ produto, onUpdate }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: produto,
    })

    const [open, setOpen] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await putProductFunction(data);
            toast({
                title: "Produto atualizado!",
                description: "O produto foi atualizado com sucesso.",
            });
            form.reset();
            if (onUpdate) {
                onUpdate(data);
            }
            setOpen(false);
        } catch (error) {
            toast({
                title: "Erro ao atualizar produto",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            });
            console.error("Erro ao enviar dados:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Pencil size={20} />
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent
                className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none"
            >
                <VisuallyHidden>
                    <DialogTitle>Editar Produto</DialogTitle>
                </VisuallyHidden>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="id_produto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                readOnly
                                                className="bg-gray-100 text-gray-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="peso"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Peso</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Digite o peso"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(
                                                    e.target.value === "" ? undefined : Number(e.target.value)
                                                )}
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
                            <Button type="submit">Editar produto</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
