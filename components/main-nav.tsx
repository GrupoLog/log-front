"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Box, Truck, UsersRound, Package } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
        <Box className="h-4 w-4" />
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
        <Package className="h-4 w-4" />
        <span>Produtos</span>
      </Link>

      <Link
        href="/drivers"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/drivers" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Package className="h-4 w-4" />
        <span>Motoristas</span>
      </Link>
      <Link
        href="/requests"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/requests" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Package className="h-4 w-4" />
        <span>Solicitações</span>
      </Link>
      <Link
        href="/services"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/services" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Package className="h-4 w-4" />
        <span>Serviços</span>
      </Link>

      <Link
        href="/trips"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/trips" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Package className="h-4 w-4" />
        <span>Viagens</span>
      </Link>
      <Link
        href="/vehicles"
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/vehicles" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Package className="h-4 w-4" />
        <span>Veículos</span>
      </Link>
    </nav>
  )
}
