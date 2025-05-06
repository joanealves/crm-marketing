"use client";

import { useState, useEffect } from "react";
import { CampanhasList } from "@/components/campanha/campanhas-list";
import { CampanhaForm } from "@/components/campanha/campanha-form";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Mail, 
  BarChart2, 
  Share2, 
  Calendar,
  Eye,
  Users,
  MailOpen,
  MousePointer,
  TrendingUp
} from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface Campanha {
  id: string;
  nome: string;
  status: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
  destinatarios: number;
  taxaAbertura: string;
  taxaCliques?: string;
  ROI?: string;
}

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<string | null>(null);
  const [tipoFiltro, setTipoFiltro] = useState<string | null>(null);
  
  const [isVisualizarOpen, setIsVisualizarOpen] = useState(false);
  const [campanhaVisualizando, setCampanhaVisualizando] = useState<Campanha | null>(null);
  
  useEffect(() => {
    const storedCampanhas = localStorage.getItem("campanhas");
    const initialCampanhas = storedCampanhas
      ? JSON.parse(storedCampanhas)
      : [
          {
            id: uuidv4(),
            nome: "Promoção de Primavera",
            status: "ativa",
            tipo: "email",
            dataInicio: "2024-05-01",
            dataFim: "2024-05-31",
            destinatarios: 1000,
            taxaAbertura: "25%",
            taxaCliques: "8%",
            ROI: "120%"
          },
          {
            id: uuidv4(),
            nome: "Liquidação de Inverno",
            status: "encerrada",
            tipo: "sms",
            dataInicio: "2024-06-01",
            dataFim: "2024-06-30",
            destinatarios: 500,
            taxaAbertura: "30%",
            taxaCliques: "12%",
            ROI: "150%"
          },
          {
            id: uuidv4(),
            nome: "Lançamento Novo Produto",
            status: "agendada",
            tipo: "notificacao",
            dataInicio: "2024-07-15",
            dataFim: "2024-08-15",
            destinatarios: 2000,
            taxaAbertura: "0%",
            taxaCliques: "0%",
            ROI: "0%"
          },
          {
            id: uuidv4(),
            nome: "Black Friday Antecipada",
            status: "rascunho",
            tipo: "email",
            dataInicio: "2024-11-01",
            dataFim: "2024-11-30",
            destinatarios: 5000,
            taxaAbertura: "0%",
            taxaCliques: "0%",
            ROI: "0%"
          }
        ];
    setCampanhas(initialCampanhas);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("campanhas", JSON.stringify(campanhas));
    }
  }, [campanhas, isLoaded]);

  const handleCampanhaCreated = (novaCampanha: Campanha) => {
    novaCampanha.id = uuidv4();
    novaCampanha.taxaCliques = novaCampanha.taxaCliques || "0%";
    novaCampanha.ROI = novaCampanha.ROI || "0%";
    setCampanhas([...campanhas, novaCampanha]);
  };

  const handleCampanhaDeleted = (campanhaId: string) => {
    setCampanhas(campanhas.filter((campanha) => campanha.id !== campanhaId));
  };
  
  const handleVisualizarCampanha = (campanha: Campanha) => {
    setCampanhaVisualizando(campanha);
    setIsVisualizarOpen(true);
  };

  const formatarData = (dataString?: string) => {
    if (!dataString) return "Não definida";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ativa":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ativa</Badge>;
      case "encerrada":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Encerrada</Badge>;
      case "agendada":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Agendada</Badge>;
      case "rascunho":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Rascunho</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getTipoBadge = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "email":
        return <Badge variant="outline" className="flex items-center gap-1"><Mail className="h-3 w-3" /> Email</Badge>;
      case "sms":
        return <Badge variant="outline" className="flex items-center gap-1"><Share2 className="h-3 w-3" /> SMS</Badge>;
      case "notificacao":
        return <Badge variant="outline" className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Notificação</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const totalCampanhas = campanhas.length;
  const campanhasAtivas = campanhas.filter(campanha => campanha.status.toLowerCase() === "ativa").length;
  const totalDestinatarios = campanhas.reduce((total, campanha) => total + campanha.destinatarios, 0);
  
  const taxaAberturaMedia = campanhas.length > 0 
    ? campanhas
        .filter(campanha => campanha.taxaAbertura !== "0%")
        .reduce((total, campanha) => total + parseInt(campanha.taxaAbertura), 0) / 
        campanhas.filter(campanha => campanha.taxaAbertura !== "0%").length || 0
    : 0;

  const filteredCampanhas = campanhas
    .filter(campanha => 
      campanha.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!statusFiltro || campanha.status.toLowerCase() === statusFiltro.toLowerCase()) &&
      (!tipoFiltro || campanha.tipo.toLowerCase() === tipoFiltro.toLowerCase())
    );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Tabs defaultValue="lista" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Campanhas</h1>
              <p className="text-muted-foreground">Gerencie suas campanhas de marketing</p>
            </div>
            <div className="flex gap-2">
              <TabsList>
                <TabsTrigger value="lista">Lista</TabsTrigger>
                <TabsTrigger value="calendario">Calendário</TabsTrigger>
              </TabsList>
              <CampanhaForm onCampanhaCreated={handleCampanhaCreated}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Campanha
                </Button>
              </CampanhaForm>
            </div>
          </div>

          <TabsContent value="lista" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Campanhas</p>
                      <h3 className="text-2xl font-bold">{totalCampanhas}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <BarChart2 className="h-6 w-6 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Campanhas Ativas</p>
                      <h3 className="text-2xl font-bold">{campanhasAtivas}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Destinatários</p>
                      <h3 className="text-2xl font-bold">{totalDestinatarios.toLocaleString()}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                      <MailOpen className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa Abertura Méd.</p>
                      <h3 className="text-2xl font-bold">{Math.round(taxaAberturaMedia)}%</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-6">
                <CardTitle>Listagem de Campanhas</CardTitle>
                <CardDescription>Gerencie todas as suas campanhas de marketing</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <div className="relative sm:w-64 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar campanhas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Select
                      value={statusFiltro || ""}
                      onValueChange={(val) => setStatusFiltro(val === "todos" ? null : val)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="agendada">Agendada</SelectItem>
                        <SelectItem value="encerrada">Encerrada</SelectItem>
                        <SelectItem value="rascunho">Rascunho</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={tipoFiltro || ""}
                      onValueChange={(val) => setTipoFiltro(val === "todos" ? null : val)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="notificacao">Notificação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead className="hidden md:table-cell">Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden lg:table-cell">Período</TableHead>
                          <TableHead className="hidden xl:table-cell">Destinatários</TableHead>
                          <TableHead className="hidden xl:table-cell">Taxa Abertura</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCampanhas.length > 0 ? (
                          filteredCampanhas.map((campanha) => (
                            <TableRow key={campanha.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleVisualizarCampanha(campanha)}>
                              <TableCell className="font-medium">
                                {campanha.nome}
                                <p className="md:block lg:hidden text-sm text-muted-foreground mt-1">
                                  {formatarData(campanha.dataInicio)} - {formatarData(campanha.dataFim)}
                                </p>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {getTipoBadge(campanha.tipo)}
                              </TableCell>
                              <TableCell>{getStatusBadge(campanha.status)}</TableCell>
                              <TableCell className="hidden lg:table-cell">
                                {formatarData(campanha.dataInicio)} - {formatarData(campanha.dataFim)}
                              </TableCell>
                              <TableCell className="hidden xl:table-cell">
                                {campanha.destinatarios.toLocaleString()}
                              </TableCell>
                              <TableCell className="hidden xl:table-cell">
                                {campanha.taxaAbertura}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Editar</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCampanhaDeleted(campanha.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Excluir</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-10">
                              {searchTerm || statusFiltro || tipoFiltro ? (
                                <div className="flex flex-col items-center">
                                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">Nenhuma campanha encontrada com os filtros aplicados</p>
                                  <Button variant="outline" className="mt-4" onClick={() => {
                                    setSearchTerm("");
                                    setStatusFiltro(null);
                                    setTipoFiltro(null);
                                  }}>
                                    Limpar filtros
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <Mail className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">Você ainda não tem campanhas cadastradas</p>
                                  <CampanhaForm onCampanhaCreated={handleCampanhaCreated}>
                                    <Button className="mt-4">
                                      <Plus className="mr-2 h-4 w-4" />
                                      Criar Campanha
                                    </Button>
                                  </CampanhaForm>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendario" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendário de Campanhas</CardTitle>
                <CardDescription>Visualize suas campanhas em formato de calendário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Em breve</h3>
                    <p className="text-muted-foreground">
                      O calendário de campanhas estará disponível em breve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isVisualizarOpen} onOpenChange={setIsVisualizarOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes da Campanha</DialogTitle>
            </DialogHeader>
            {campanhaVisualizando && (
              <div className="py-4 space-y-4">
                <div className="border-b pb-3">
                  <h3 className="text-xl font-semibold">{campanhaVisualizando.nome}</h3>
                  <div className="flex gap-2 mt-2">
                    {getTipoBadge(campanhaVisualizando.tipo)}
                    {getStatusBadge(campanhaVisualizando.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Início</p>
                    <p className="font-medium">{formatarData(campanhaVisualizando.dataInicio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Término</p>
                    <p className="font-medium">{formatarData(campanhaVisualizando.dataFim)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Destinatários</p>
                    <p className="font-medium">{campanhaVisualizando.destinatarios.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de Abertura</p>
                    <p className="font-medium">{campanhaVisualizando.taxaAbertura}</p>
                  </div>
                  {campanhaVisualizando.taxaCliques && (
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de Cliques</p>
                      <p className="font-medium">{campanhaVisualizando.taxaCliques}</p>
                    </div>
                  )}
                  {campanhaVisualizando.ROI && (
                    <div>
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="font-medium">{campanhaVisualizando.ROI}</p>
                    </div>
                  )}
                </div>

                {campanhaVisualizando.status.toLowerCase() !== "rascunho" && campanhaVisualizando.status.toLowerCase() !== "agendada" && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-3">Métricas</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <MailOpen className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-muted-foreground">Aberturas</p>
                        <p className="font-medium">{campanhaVisualizando.taxaAbertura}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <MousePointer className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                        <p className="text-xs text-muted-foreground">Cliques</p>
                        <p className="font-medium">{campanhaVisualizando.taxaCliques || "0%"}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-muted-foreground">ROI</p>
                        <p className="font-medium">{campanhaVisualizando.ROI || "0%"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsVisualizarOpen(false);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (campanhaVisualizando) {
                      handleCampanhaDeleted(campanhaVisualizando.id);
                      setIsVisualizarOpen(false);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsVisualizarOpen(false)}
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}