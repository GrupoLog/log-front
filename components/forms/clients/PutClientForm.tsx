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
import { putClientFunction } from "@/services/APIService"

const FormSchema = z.object({
  cpf: z.string().min(11, { message: "CPF inválido" }),
  nome: z.string().min(2, { message: "Nome obrigatório" }),
  sobrenome: z.string().min(2, { message: "Sobrenome obrigatório" }),
  rua: z.string(),
  bairro: z.string(),
  numero: z.number(),
  cidade: z.string(),
  phonesList: z.array(z.string()).optional(),
})

export function PutClientForm({ cliente, onUpdate }) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...cliente,
      phonesList: Array.isArray(cliente.phonesList) ? cliente.phonesList : [],
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Filtra telefones vazios e remove espaços
    const cleanedPhones = (data.phonesList || [])
      .map(phone => phone.trim())
      .filter(phone => phone.length > 0)

    const payload = {
      ...data,
      phonesList: cleanedPhones.length > 0 ? cleanedPhones : undefined,
    }

    try {
      await putClientFunction(payload)
      toast({
        title: "Cliente atualizado!",
        description: "O cliente foi atualizado com sucesso.",
      })
      form.reset()
      if (onUpdate) {
        onUpdate(payload)
      }
      setOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao atualizar cliente",
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
          <DialogTitle>Editar Cliente</DialogTitle>
        </VisuallyHidden>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input value={cliente.cpf} readOnly className="bg-gray-100 text-gray-500" />
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
                name="sobrenome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Telefone 1 */}
              <FormField
                control={form.control}
                name="phonesList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o telefone 1"
                        value={field.value?.[0] || ""}
                        onChange={e => {
                          const newPhones = [...(field.value || [])]
                          newPhones[0] = e.target.value
                          field.onChange(newPhones)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Telefone 2 */}
              <FormField
                control={form.control}
                name="phonesList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o telefone 2"
                        value={field.value?.[1] || ""}
                        onChange={e => {
                          const newPhones = [...(field.value || [])]
                          newPhones[1] = e.target.value
                          field.onChange(newPhones)
                        }}
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
                name="rua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a cidade" {...field} />
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
    </Dialog>
  )
}
