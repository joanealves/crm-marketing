"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Search, BarChart2, DollarSign, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { SafeHydration } from "@/components/SafeHydration";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Negocio {
  id: string;
  nome: string;
  cliente: string;
  valor: number;
  etapa: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  responsavel?: string;
}

export default function NegociosPage() {
  return (
    <SafeHydration>
      <NegociosContent />
    </SafeHydration>
  );
}

function NegociosContent() {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [etapaFiltro, setEtapaFiltro] = useState<string | null>(null);

  useEffect(() => {
    const storedNegocios = localStorage.getItem("negocios");
    const initialNegocios = storedNegocios
      ? JSON.parse(storedNegocios)
      : [
          {
            id: uuidv4(),
            nome: "Venda de Software",
            cliente: "Empresa A",
            valor: 10000,
            etapa: "proposta",
            dataCriacao: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString(),
            responsavel: "João Silva",
          },
          {
            id: uuidv4(),
            nome: "Consultoria",
            cliente: "Empresa B",
            valor: 5000,
            etapa: "negociação",
            dataCriacao: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString(),
            responsavel: "Maria Souza",
          },
          {
            id: uuidv4(),
            nome: "Implementação ERP",
            cliente: "Empresa C",
            valor: 25000,
            etapa: "fechado",
            dataCriacao: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            dataAtualizacao: new Date().toISOString(),
            responsavel: "Carlos Santos",
          },
          {
            id: uuidv4(),
            nome: "Migração de Dados",
            cliente: "Empresa D",
            valor: 8000,
            etapa: "perdido",
            dataCriacao: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            dataAtualizacao: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            responsavel: "Ana Costa",
          },
        ];
    setNegocios(initialNegocios);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("negocios", JSON.stringify(negocios));
    }
  }, [negocios, isLoaded]);

  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false);
  const [novoNegocioNome, setNovoNegocioNome] = useState("");
  const [novoNegocioCliente, setNovoNegocioCliente] = useState("");
  const [novoNegocioValor, setNovoNegocioValor] = useState<
    number | undefined
  >(undefined);
  const [novoNegocioEtapa, setNovoNegocioEtapa] = useState("proposta");
  const [novoNegocioResponsavel, setNovoNegocioResponsavel] = useState("");

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [negocioEditando, setNegocioEditando] = useState<Negocio | null>(null);
  const [editNegocioNome, setEditNegocioNome] = useState("");
  const [editNegocioCliente, setEditNegocioCliente] = useState("");
  const [editNegocioValor, setEditNegocioValor] = useState<
    number | undefined
  >(undefined);
  const [editNegocioEtapa, setEditNegocioEtapa] = useState("proposta");
  const [editNegocioResponsavel, setEditNegocioResponsavel] = useState("");

  const [isVisualizarOpen, setIsVisualizarOpen] = useState(false);
  const [negocioVisualizando, setNegocioVisualizando] = useState<Negocio | null>(null);

  const resetNovoNegocioForm = () => {
    setNovoNegocioNome("");
    setNovoNegocioCliente("");
    setNovoNegocioValor(undefined);
    setNovoNegocioEtapa("proposta");
    setNovoNegocioResponsavel("");
  };

  const handleAdicionarNegocio = () => {
    if (novoNegocioNome && novoNegocioCliente && novoNegocioValor) {
      const agora = new Date().toISOString();
      const novoNegocio = {
        id: uuidv4(),
        nome: novoNegocioNome,
        cliente: novoNegocioCliente,
        valor: novoNegocioValor,
        etapa: novoNegocioEtapa,
        dataCriacao: agora,
        dataAtualizacao: agora,
        responsavel: novoNegocioResponsavel || "Não atribuído",
      };
      setNegocios([...negocios, novoNegocio]);
      setIsAdicionarOpen(false);
      resetNovoNegocioForm();
    }
  };

  const handleExcluirNegocio = (negocioId: string) => {
    setNegocios(negocios.filter((negocio) => negocio.id !== negocioId));
  };

  const handleEditarNegocio = (negocio: Negocio) => {
    setNegocioEditando(negocio);
    setEditNegocioNome(negocio.nome);
    setEditNegocioCliente(negocio.cliente);
    setEditNegocioValor(negocio.valor);
    setEditNegocioEtapa(negocio.etapa);
    setEditNegocioResponsavel(negocio.responsavel || "");
    setIsEditarOpen(true);
  };

  const handleVisualizarNegocio = (negocio: Negocio) => {
    setNegocioVisualizando(negocio);
    setIsVisualizarOpen(true);
  };

  const handleSalvarEdicaoNegocio = () => {
    if (
      negocioEditando &&
      editNegocioNome &&
      editNegocioCliente &&
      editNegocioValor
    ) {
      const negociosAtualizados = negocios.map((negocio) =>
        negocio.id === negocioEditando.id
          ? {
              ...negocio,
              nome: editNegocioNome,
              cliente: editNegocioCliente,
              valor: editNegocioValor,
              etapa: editNegocioEtapa,
              dataAtualizacao: new Date().toISOString(),
              responsavel: editNegocioResponsavel || negocio.responsavel,
            }
          : negocio
      );
      setNegocios(negociosAtualizados);
      setIsEditarOpen(false);
      setNegocioEditando(null);
    }
  };

  const formatarData = (dataString?: string) => {
    if (!dataString) return "Não disponível";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getEtapaBadge = (etapa: string) => {
    switch (etapa) {
      case "proposta":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Proposta</Badge>;
      case "negociação":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Negociação</Badge>;
      case "fechado":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Fechado</Badge>;
      case "perdido":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Perdido</Badge>;
      default:
        return <Badge variant="outline">{etapa}</Badge>;
    }
  };

  const totalOportunidades = negocios.length;
  const totalValorNegociacao = negocios
    .filter(negocio => negocio.etapa === "negociação")
    .reduce((total, negocio) => total + negocio.valor, 0);
  const totalValorFechado = negocios
    .filter(negocio => negocio.etapa === "fechado")
    .reduce((total, negocio) => total + negocio.valor, 0);
  
  const filteredNegocios = negocios
    .filter(negocio => 
      (negocio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
       negocio.cliente.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!etapaFiltro || negocio.etapa === etapaFiltro)
    );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Tabs defaultValue="lista" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Negócios</h1>
              <p className="text-muted-foreground">Gerencie seus negócios e oportunidades</p>
            </div>
            <div className="flex gap-2">
              <TabsList>
                <TabsTrigger value="lista">Lista</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
              </TabsList>
              <Button onClick={() => setIsAdicionarOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Negócio
              </Button>
            </div>
          </div>

          <TabsContent value="lista" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Oportunidades</p>
                      <h3 className="text-2xl font-bold">{totalOportunidades}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <BarChart2 className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Em Negociação</p>
                      <h3 className="text-2xl font-bold">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(totalValorNegociacao)}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vendas Fechadas</p>
                      <h3 className="text-2xl font-bold">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(totalValorFechado)}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-6">
                <CardTitle>Oportunidades</CardTitle>
                <CardDescription>Gerencie todas as suas oportunidades de negócio</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <div className="relative sm:w-64 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar negócios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select
                    value={etapaFiltro || ""}
                    onValueChange={(val) => setEtapaFiltro(val === "todas" ? null : val)}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filtrar por etapa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as etapas</SelectItem>
                      <SelectItem value="proposta">Proposta</SelectItem>
                      <SelectItem value="negociação">Negociação</SelectItem>
                      <SelectItem value="fechado">Fechado</SelectItem>
                      <SelectItem value="perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead className="hidden md:table-cell">Cliente</TableHead>
                          <TableHead className="hidden md:table-cell">Valor</TableHead>
                          <TableHead>Etapa</TableHead>
                          <TableHead className="hidden lg:table-cell">Responsável</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredNegocios.length > 0 ? (
                          filteredNegocios.map((negocio) => (
                            <TableRow key={negocio.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleVisualizarNegocio(negocio)}>
                              <TableCell className="font-medium">
                                {negocio.nome}
                                <p className="md:hidden text-sm text-muted-foreground">{negocio.cliente}</p>
                                <p className="md:hidden text-sm text-muted-foreground">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(negocio.valor)}
                                </p>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{negocio.cliente}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(negocio.valor)}
                              </TableCell>
                              <TableCell>{getEtapaBadge(negocio.etapa)}</TableCell>
                              <TableCell className="hidden lg:table-cell">{negocio.responsavel || "Não atribuído"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditarNegocio(negocio);
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
                                      handleExcluirNegocio(negocio.id);
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
                            <TableCell colSpan={6} className="text-center py-10">
                              {searchTerm || etapaFiltro ? (
                                <div className="flex flex-col items-center">
                                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">Nenhum negócio encontrado com os filtros aplicados</p>
                                  <Button variant="outline" className="mt-4" onClick={() => {
                                    setSearchTerm("");
                                    setEtapaFiltro(null);
                                  }}>
                                    Limpar filtros
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <BarChart2 className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">Você ainda não tem negócios cadastrados</p>
                                  <Button className="mt-4" onClick={() => setIsAdicionarOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Adicionar Negócio
                                  </Button>
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

          <TabsContent value="kanban" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kanban de Negócios</CardTitle>
                <CardDescription>Visualize seus negócios por etapa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {["proposta", "negociação", "fechado", "perdido"].map((etapa) => (
                    <div key={etapa} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium capitalize">{etapa}</h3>
                        <Badge variant="outline">
                          {negocios.filter(n => n.etapa === etapa).length}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {negocios
                          .filter(n => n.etapa === etapa)
                          .map(negocio => (
                            <Card key={negocio.id} className="p-3 cursor-pointer" onClick={() => handleVisualizarNegocio(negocio)}>
                              <h4 className="font-medium">{negocio.nome}</h4>
                              <p className="text-sm text-muted-foreground">{negocio.cliente}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-medium">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(negocio.valor)}
                                </span>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditarNegocio(negocio);
                                    }}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleExcluirNegocio(negocio.id);
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isAdicionarOpen} onOpenChange={(open) => {
          setIsAdicionarOpen(open);
          if (!open) resetNovoNegocioForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Negócio</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome*
                </Label>
                <Input
                  id="nome"
                  value={novoNegocioNome}
                  onChange={(e) => setNovoNegocioNome(e.target.value)}
                  className="col-span-3"
                  placeholder="Nome do negócio"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente*
                </Label>
                <Input
                  id="cliente"
                  value={novoNegocioCliente}
                  onChange={(e) => setNovoNegocioCliente(e.target.value)}
                  className="col-span-3"
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="valor" className="text-right">
                  Valor*
                </Label>
                <Input
                  type="number"
                  id="valor"
                  value={
                    novoNegocioValor === undefined ? "" : novoNegocioValor.toString()
                  }
                  onChange={(e) => setNovoNegocioValor(Number(e.target.value))}
                  className="col-span-3"
                  placeholder="0,00"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="etapa" className="text-right">
                  Etapa
                </Label>
                <Select
                  value={novoNegocioEtapa}
                  onValueChange={setNovoNegocioEtapa}
                >
                  <SelectTrigger id="etapa" className="col-span-3">
                    <SelectValue placeholder="Selecione a etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposta">Proposta</SelectItem>
                    <SelectItem value="negociação">Negociação</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                    <SelectItem value="perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsavel" className="text-right">
                  Responsável
                </Label>
                <Input
                  id="responsavel"
                  value={novoNegocioResponsavel}
                  onChange={(e) => setNovoNegocioResponsavel(e.target.value)}
                  className="col-span-3"
                  placeholder="Nome do responsável"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsAdicionarOpen(false);
                  resetNovoNegocioForm();
                }}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                onClick={handleAdicionarNegocio}
                disabled={!novoNegocioNome || !novoNegocioCliente || !novoNegocioValor}
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditarOpen} onOpenChange={setIsEditarOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Negócio</DialogTitle>
            </DialogHeader>
            {negocioEditando ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nome" className="text-right">
                    Nome*
                  </Label>
                  <Input
                    id="edit-nome"
                    value={editNegocioNome}
                    onChange={(e) => setEditNegocioNome(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-cliente" className="text-right">
                    Cliente*
                  </Label>
                  <Input
                    id="edit-cliente"
                    value={editNegocioCliente}
                    onChange={(e) => setEditNegocioCliente(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-valor" className="text-right">
                    Valor*
                  </Label>
                  <Input
                    type="number"
                    id="edit-valor"
                    value={
                      editNegocioValor === undefined ? "" : editNegocioValor.toString()
                    }
                    onChange={(e) => setEditNegocioValor(Number(e.target.value))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-etapa" className="text-right">
                    Etapa
                  </Label>
                  <Select
                    value={editNegocioEtapa}
                    onValueChange={setEditNegocioEtapa}
                  >
                    <SelectTrigger id="edit-etapa" className="col-span-3">
                      <SelectValue placeholder="Selecione a etapa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proposta">Proposta</SelectItem>
                      <SelectItem value="negociação">Negociação</SelectItem>
                      <SelectItem value="fechado">Fechado</SelectItem>
                      <SelectItem value="perdido">Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-responsavel" className="text-right">
                    Responsável
                  </Label>
                  <Input
                    id="edit-responsavel"
                    value={editNegocioResponsavel}
                    onChange={(e) => setEditNegocioResponsavel(e.target.value)}
                    className="col-span-3"
                    placeholder="Nome do responsável"
                  />
                </div>
              </div>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsEditarOpen(false);
                  setNegocioEditando(null);
                }}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                onClick={handleSalvarEdicaoNegocio}
                disabled={!editNegocioNome || !editNegocioCliente || !editNegocioValor}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isVisualizarOpen} onOpenChange={setIsVisualizarOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes do Negócio</DialogTitle>
            </DialogHeader>
            {negocioVisualizando && (
              <div className="py-4 space-y-4">
                <div className="border-b pb-3">
                  <h3 className="text-xl font-semibold">{negocioVisualizando.nome}</h3>
                  <p className="text-muted-foreground">{negocioVisualizando.cliente}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(negocioVisualizando.valor)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Etapa</p>
                    <p>{getEtapaBadge(negocioVisualizando.etapa)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsável</p>
                    <p className="font-medium">{negocioVisualizando.responsavel || "Não atribuído"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de criação</p>
                    <p className="font-medium">{formatarData(negocioVisualizando.dataCriacao)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Última atualização</p>
                    <p className="font-medium">{formatarData(negocioVisualizando.dataAtualizacao)}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (negocioVisualizando) {
                      handleEditarNegocio(negocioVisualizando);
                      setIsVisualizarOpen(false);
                    }
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (negocioVisualizando) {
                      handleExcluirNegocio(negocioVisualizando.id);
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