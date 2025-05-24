"use client"

import type React from "react"
import { useState, useRef } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Box, Boxes, UsersRound, UserRoundCog, LayoutDashboard, ChevronDown, Car, Truck, FileText, Briefcase } from "lucide-react"

import { cn } from "@/lib/utils"
import { useClickOutside } from "@/hooks/use-click-outsude"


export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const [openVehicles, setOpenVehicles] = useState(false)
  const [openServices, setOpenServices] = useState(false)
  const vehiclesRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useClickOutside(vehiclesRef, () => setOpenVehicles(false))
  useClickOutside(servicesRef, () => setOpenServices(false))

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
      <Link
        href="/shipments"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/shipments" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Box className="h-4 w-4" />
        <span>Shipments</span>
      </Link>
      <Link
        href="/clients"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/clients" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <UsersRound className="h-4 w-4" />
        <span>Clientes</span>
      </Link>
      <Link
        href="/products"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/products" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Boxes className="h-4 w-4" />
        <span>Produtos</span>
      </Link>

      <Link
        href="/drivers"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/drivers" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <UserRoundCog className="h-4 w-4" />
        <span>Motoristas</span>
      </Link>
      <Link
        href="/requests"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/requests" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <FileText className="h-4 w-4" />
        <span>Solicitações</span>
      </Link>
      <Link
        href="/trips"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/trips" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Truck className="h-4 w-4" />
        <span>Viagens</span>
      </Link>

      <div ref={servicesRef} className="relative">
        <button
          onClick={() => setOpenServices((prev) => !prev)}
          className={cn(
            "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none",
            pathname.startsWith("/servicings") ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Briefcase className="h-4 w-4" />
          <span>Serviços</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {openServices && (
          <div className="absolute left-0 mt-2 w-40 rounded-md border bg-popover shadow-md z-50">
            <Link
              href="/servicings/deliveries"
              className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Entregas
            </Link>
            <Link
              href="/servicings/transport"
              className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Transporte
            </Link>

          </div>
        )}
      </div>

      <div ref={vehiclesRef} className="relative">
        <button
          onClick={() => setOpenVehicles((prev) => !prev)}
          className={cn(
            "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none",
            pathname.startsWith("/vehicles") ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Car className="h-4 w-4" />
          <span>Veículos</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {openVehicles && (
          <div className="absolute left-0 mt-2 w-40 rounded-md border bg-popover shadow-md z-50">
            <Link
              href="/vehicles/vans"
              className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Vans
            </Link>
            <Link
              href="/vehicles/motorcycles"
              className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Motos
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
