"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"

export function ViewClient({ cliente }) {
  const [open, setOpen] = useState(false)
  const phones = Array.isArray(cliente.phonesList) ? cliente.phonesList : []

  function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '')

    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3')
    } else {
      return phone
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Search size={20} />
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

      <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
        <VisuallyHidden>
          <DialogTitle>Visualizar Cliente</DialogTitle>
        </VisuallyHidden>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">CPF</label>
              <Input value={cliente.cpf} readOnly />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <Input value={cliente.nome} readOnly />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Sobrenome</label>
              <Input value={cliente.sobrenome} readOnly />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Telefone 1</label>
              <Input
                value={phones[0] ? formatPhone(phones[0]) : ''}
                readOnly
              />
            </div>

            {phones[1] && (
              <div>
                <label className="text-sm font-medium text-gray-700">Telefone 2</label>
                <Input
                  value={formatPhone(phones[1])}
                  readOnly
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Rua</label>
              <Input value={cliente.rua} readOnly />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Bairro</label>
              <Input value={cliente.bairro} readOnly />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Número</label>
              <Input value={String(cliente.numero)} readOnly />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Cidade</label>
              <Input value={cliente.cidade} readOnly />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
