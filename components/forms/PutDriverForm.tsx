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
import { putClientFunction, putDriverFunction } from "@/services/APIService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
    cnh: z.string().min(11, { message: "CNH inválida" }),
    cpf: z.string().min(11, { message: "CPF inválido" }),
    nome: z.string().min(2, { message: "Nome obrigatório" }),
    tipo: z.enum(["Fixo", "Terceirizado"], { message: "Tipo inválido" }),
    tipo_cnh: z.enum(["A", "B", "C", "D", "E", "AB"], { message: "Tipo de CNH inválido" }),
    cnh_supervisionado: z.string().optional(),
    telefone_um: z.string().min(10, { message: "Telefone 1 inválido" }),
    telefone_dois: z.string().optional(),
})

export function PutDriverForm({ motorista, onUpdate }) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...motorista,
            phonesList: Array.isArray(motorista.phonesList) ? motorista.phonesList : [],
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const cleanedPhones = (data.phonesList || [])
            .map(phone => phone.trim())
            .filter(phone => phone.length > 0)

        const payload = {
            ...data,
            phonesList: cleanedPhones.length > 0 ? cleanedPhones : undefined,
        }

        try {
            await putDriverFunction(payload)
            toast({
                title: "Motorista atualizado!",
                description: "O motorista foi atualizado com sucesso.",
            })
            form.reset()
            if (onUpdate) {
                onUpdate(payload)
            }
            setOpen(false)
        } catch (error) {
            toast({
                title: "Erro ao atualizar motorista",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            })
            console.error("Erro ao enviar dados:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Pencil size={20} />
            </DialogTrigger>

            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

            <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
                <VisuallyHidden>
                    <DialogTitle>Editar Motorista</DialogTitle>
                </VisuallyHidden>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="cnh"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CNH</FormLabel>
                                        <FormControl>
                                            <Input value={motorista.cnh} readOnly className="bg-gray-100 text-gray-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <Input value={motorista.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")} readOnly className="bg-gray-100 text-gray-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefone_um"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o telefone 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={motorista.tipo} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Fixo">Fixo</SelectItem>
                                                    <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tipo_cnh"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de CNH</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo de CNH" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="C">C</SelectItem>
                                                <SelectItem value="D">D</SelectItem>
                                                <SelectItem value="E">E</SelectItem>
                                                <SelectItem value="AB">AB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cnh_supervisionado"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gerente (CNH)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o número da CNH do gerente" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefone_dois"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone 2</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o telefone 2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-2 text-center">
                            <Button type="submit">Editar cliente</Button>
                        </div>
                    </form>

                </Form>
            </DialogContent>
        </Dialog >
    )
}
