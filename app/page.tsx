'use client'
import dynamic from 'next/dynamic';
import Link from "next/link"
import { Activity, ArrowRight, Box, Clock, DollarSign, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DeliveryStatusChart } from "@/components/delivery-status-chart"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentShipments } from "@/components/recent-shipments"
import RevenueComponent from "@/components/total-revenue"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';
import SingleBarChart from '@/components/charts/VerticalSingleBarChart';
import DoubleBarChart from '@/components/charts/VerticalDoubleBarChart';

const BarChart = dynamic(() => import('@/components/charts/VerticalSingleBarChart'), { ssr: false });
const PieChart = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Report</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-12 gap-4">
              {/* COLUNA ESQUERDA */}
              <div className="col-span-12 lg:col-span-8 flex flex-col justify-between gap-4">
                <Card className="flex-1 h-100">
                  <CardHeader>
                    <CardTitle>Quantidade de Serviços ao Longo dos Meses</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <DoubleBarChart />
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Receita por Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <HorizontalBarChart />
                  </CardContent>
                </Card>
              </div>

              {/* COLUNA DIREITA */}
              <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      <RevenueComponent />
                    </div>
                    <p className="text-xs text-muted-foreground">De todos os períodos</p>
                  </CardContent>
                </Card>

                <Card className="flex-2">
                  <CardHeader>
                    <CardTitle>Veículos Mais Utilizados</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <SingleBarChart />
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Distribuição dos Serviços</CardTitle>
                    <CardDescription>Distribuição dos Serviços por tipo de veículo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChart />
                  </CardContent>
                </Card>
              </div>
            </div>


            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Shipments</CardTitle>
                  <CardDescription>Overview of the most recent shipments in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentShipments />
                </CardContent>
                <CardFooter>
                  <Link href="/shipments">
                    <Button className="w-full" variant="outline">
                      View All Shipments
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Analytics Content</CardTitle>
                  <CardDescription>Detailed analytics will be displayed here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <Activity className="h-8 w-8 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Analytics dashboard content</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Reports Content</CardTitle>
                  <CardDescription>Generated reports will be displayed here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <Box className="h-8 w-8 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Reports dashboard content</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
