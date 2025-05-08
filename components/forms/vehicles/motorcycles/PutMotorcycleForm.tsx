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
import { putClientFunction, putDriverFunction, putMotorcycleFunction } from "@/services/APIService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function PutMotorcycleForm({ moto, onUpdate }) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...moto,
            phonesList: Array.isArray(moto.phonesList) ? moto.phonesList : [],
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload = {
            ...data,
            cap_carga: Number(data.cap_carga),
        }

        try {
            await putMotorcycleFunction(payload)
            toast({
                title: "Moto atualizada!",
                description: "A moto foi atualizada com sucesso.",
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
                    <DialogTitle>Editar Moto</DialogTitle>
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
                                            <Input value={moto.chassi} readOnly className="bg-gray-100 text-gray-500" />
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
                                            <Input value={moto.chassi} readOnly className="bg-gray-100 text-gray-500" />
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
                                            <Input value={moto.placa} readOnly className="bg-gray-100 text-gray-500" />
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
                                            <Input value={moto.cap_carga} readOnly className="bg-gray-100 text-gray-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-2 text-center">
                            <Button type="submit">Editar moto</Button>
                        </div>
                    </form>

                </Form>
            </DialogContent>
        </Dialog >
    )
}
