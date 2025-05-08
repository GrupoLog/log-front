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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { postDriverFunction } from "@/services/APIService"

const FormSchema = z.object({
  cnh: z.string().min(1, { message: "CNH obrigatória" }),  // CNH obrigatória
  cpf: z.string().min(11, { message: "CPF inválido" }),
  nome: z.string().min(2, { message: "Nome obrigatório" }),
  tipo: z.enum(["Fixo", "Terceirizado"], { message: "Tipo inválido" }),  // Dropdown com as opções Fixo e Terceirizado
  tipo_cnh: z.enum(["A", "B", "C", "D", "E", "AB"], { message: "Tipo de CNH inválido" }),
  telefone_um: z.string().min(10, { message: "Telefone 1 obrigatório" }),  // Telefone 1 obrigatório
  telefone_dois: z.string().optional(),
  cnh_supervisionado: z.string().optional(),  // CNH supervisionado como campo normal de texto
})

export function PostDriverForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cnh: "",
      cpf: "",
      nome: "",
      tipo: "Fixo",  // Default para "Fixo"
      tipo_cnh: "A",  // Default para o tipo "A"
      telefone_um: "",
      telefone_dois: "",
      cnh_supervisionado: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await postDriverFunction(data)

      toast({
        title: "Motorista cadastrado!",
        description: "O motorista foi adicionado com sucesso.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Erro ao cadastrar motorista",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
      console.error("Erro ao enviar dados:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto bg-lime-300">Adicionar motorista</Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

      <DialogContent
        className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none"
      >
        <VisuallyHidden>
          <DialogTitle>Adicionar Motorista</DialogTitle>
        </VisuallyHidden>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
            {/* Coluna da Esquerda */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cnh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNH</FormLabel>
                    <FormControl>
                      <Input placeholder="Número da CNH" {...field} />
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
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
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
            </div>

            {/* Coluna da Direita */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tipo_cnh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de CNH</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Input placeholder="(00) 00000-0000" {...field} />
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
                    <FormLabel>Telefone 2 (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnh_supervisionado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNH Supervisionado</FormLabel>
                    <FormControl>
                      <Input placeholder="CNH supervisionado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 text-center">
              <Button type="submit">Adicionar motorista</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
