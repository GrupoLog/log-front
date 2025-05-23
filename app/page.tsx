'use client'
import Link from "next/link"
import { Activity, ArrowRight, Box, Clock, DollarSign, Package, Truck } from "lucide-react"
import { loadChart } from "@/lib/loadChart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MainNav } from "@/components/main-nav"
import { RecentShipments } from "@/components/recent-shipments"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"

import RevenueComponent from "@/components/total-revenue"
import TotalRequestsComponent from "@/components/total-requests"
import MediumTicketComponent from "@/components/medium-ticket"
import PendingPercentualComponent from "@/components/pending-percentage"
import TotalTripsComponent from "@/components/total-trips"

// GRAFICOS DA OVERVIEW
const DoubleBarChart = loadChart('overview/DoubleBarChart');
const PieChart = loadChart('overview/PieChart');
const HorizontalBarChart = loadChart('overview/HorizontalBarChart');
const SingleBarChart = loadChart('overview/SingleBarChart');

// GRAFICOS DA SOLICITACOES
const LineChart = loadChart('requests/LineChart');
const VerticalBarChart = loadChart('requests/VerticalBarChart');
const PieChart1 = loadChart('requests/PieChart');
const HorizontalBarChart1 = loadChart('requests/HorizontalBarChart');

// GRAFICOS DE MOTORISTAS
const VerticalBarChart1 = loadChart('drivers/VerticalBarChart');
const PieChartTipoMotorista = loadChart('drivers/PieChart');
const HorizontalBarChart2 = loadChart('drivers/HorizontalBarChart');

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
            <TabsTrigger value="requests">Solicitações</TabsTrigger>
            <TabsTrigger value="drivers">Motoristas</TabsTrigger>
            <TabsTrigger value="fleet">Frota</TabsTrigger>
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


          <TabsContent value="requests" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Solicitações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <TotalRequestsComponent />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <MediumTicketComponent />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">% de Solicitações Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <PendingPercentualComponent />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolução das Solicitações Realizadas por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Receita Total por Tipo de Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <VerticalBarChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Formas de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart1 />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Clientes com Mais Solicitações</CardTitle>
                </CardHeader>
                <CardContent>
                  <HorizontalBarChart1 />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-12">
              <Card className="lg:col-span-8 col-span-12">
                <CardHeader>
                  <CardTitle>Quantidade de Viagens por Motorista</CardTitle>
                </CardHeader>
                <CardContent>
                  <VerticalBarChart1 />
                </CardContent>
              </Card>

              <div className="lg:col-span-4 col-span-12 flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Quantidade de Viagens Realizadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      <TotalTripsComponent />
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Distribuição de Motoristas por Tipo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChartTipoMotorista />
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Destinos mais Frequentes por Motoristas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HorizontalBarChart2 />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Veículos Mais Utilizados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SingleBarChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fleet" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Solicitações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <TotalRequestsComponent />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <MediumTicketComponent />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">% de Solicitações Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <PendingPercentualComponent />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes com Mais Solicitações</CardTitle>
                </CardHeader>
                <CardContent>
                  <HorizontalBarChart1 />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Formas de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart1 />
                </CardContent>
              </Card>

              <div className="col-span-1 md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução das Solicitações Realizadas por Mês</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
