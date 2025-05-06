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
import { postClientFunction } from "@/services/APIService"

const FormSchema = z.object({
  cpf: z.string().min(11, { message: "CPF inválido" }),
  nome: z.string().min(2, { message: "Nome obrigatório" }),
  sobrenome: z.string().min(2, { message: "Sobrenome obrigatório" }),
  rua: z.string(),
  bairro: z.string(),
  numero: z.number(),
  cidade: z.string(),
})

export function PostClientForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: "",
      nome: "",
      sobrenome: "",
      rua: "",
      bairro: "",
      numero: undefined,
      cidade: "",
    },
  })

async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
    await postClientFunction(data)

    toast({
      title: "Cliente cadastrado!",
      description: "O cliente foi adicionado com sucesso.",
    })
    form.reset()
  } catch (error) {
    toast({
      title: "Erro ao cadastrar cliente",
      description: "Tente novamente mais tarde.",
      variant: "destructive",
    })
    console.error("Erro ao enviar dados:", error)
  }
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto bg-lime-300">Adicionar cliente</Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

      <DialogContent
        className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none"
      >
        <VisuallyHidden>
          <DialogTitle>Adicionar Cliente</DialogTitle>
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
                      <Input placeholder="000.000.000-00" {...field} />
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
              <Button type="submit">Adicionar cliente</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
