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
import { Plus, Edit, Trash2, Search, Mail, Phone, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { v4 as uuidv4 } from "uuid";
import { SafeHydration } from "@/components/SafeHydration";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ClientOnly } from "@/components/clientes/client-only";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  cargo?: string;
  status?: string;
  valor?: number;
  ultimoContato?: string;
  proximoContato?: string;
  notas?: string;
  observacoes?: string;
  criadoEm?: string;
  valorTotal?: number;
}

export default function ClientesPage() {
  return (
    <SafeHydration>
      <ClientesContent />
    </SafeHydration>
  );
}

function ClientesContent() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  useEffect(() => {
    const storedClientes = localStorage.getItem("clientes");
    const initialClientes = storedClientes
      ? JSON.parse(storedClientes)
      : [
          {
            id: uuidv4(),
            nome: "João da Silva",
            email: "joao@email.com",
            telefone: "(11) 1234-5678",
            empresa: "Tech Solutions",
            cargo: "Diretor de TI",
            status: "ativo",
            valor: 120000,
            ultimoContato: "2025-04-15",
            proximoContato: "2025-05-10",
            notas: "Cliente importante, interessado em renovação",
            criadoEm: "2023-06-10",
            valorTotal: 120000
          },
          {
            id: uuidv4(),
            nome: "Maria Souza",
            email: "maria@email.com",
            telefone: "(11) 9876-5432",
            empresa: "Startup Inovadora",
            cargo: "CEO",
            status: "lead",
            valor: 0,
            ultimoContato: "2025-04-22",
            proximoContato: "2025-05-05",
            notas: "Potencial para projeto de grande valor",
            criadoEm: "2024-02-15",
            valorTotal: 0
          },
          {
            id: uuidv4(),
            nome: "Carlos Mendes",
            email: "carlos@email.com",
            telefone: "(21) 98765-4321",
            empresa: "Indústria Nacional",
            cargo: "Gerente de TI",
            status: "oportunidade",
            valor: 65000,
            ultimoContato: "2025-04-20",
            proximoContato: "2025-05-15",
            notas: "Negociação em andamento para novo serviço",
            criadoEm: "2023-10-05",
            valorTotal: 45000
          },
          {
            id: uuidv4(),
            nome: "Ana Oliveira",
            email: "ana@empresa.com",
            telefone: "(31) 91234-5678",
            empresa: "Consultoria Global",
            cargo: "Diretora Financeira",
            status: "inativo",
            valor: 0,
            ultimoContato: "2025-03-10",
            proximoContato: "",
            notas: "Cliente antigo, sem contato recente",
            criadoEm: "2023-01-20",
            valorTotal: 35000
          },
        ];
    setClientes(initialClientes);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
  }, [clientes, isLoaded]);

  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false);
  const [novoClienteNome, setNovoClienteNome] = useState("");
  const [novoClienteEmail, setNovoClienteEmail] = useState("");
  const [novoClienteTelefone, setNovoClienteTelefone] = useState("");
  const [novoClienteEmpresa, setNovoClienteEmpresa] = useState("");
  const [novoClienteCargo, setNovoClienteCargo] = useState("");
  const [novoClienteStatus, setNovoClienteStatus] = useState("lead");
  const [novoClienteNotas, setNovoClienteNotas] = useState("");

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [editClienteNome, setEditClienteNome] = useState("");
  const [editClienteEmail, setEditClienteEmail] = useState("");
  const [editClienteTelefone, setEditClienteTelefone] = useState("");
  const [editClienteEmpresa, setEditClienteEmpresa] = useState("");
  const [editClienteCargo, setEditClienteCargo] = useState("");
  const [editClienteStatus, setEditClienteStatus] = useState("");
  const [editClienteNotas, setEditClienteNotas] = useState("");

  const handleViewClientDetails = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsViewingDetails(true);
  };

  const handleAdicionarCliente = () => {
    if (novoClienteNome && novoClienteEmail && novoClienteTelefone) {
      const hoje = new Date().toISOString();
      const novoCliente = {
        id: uuidv4(),
        nome: novoClienteNome,
        email: novoClienteEmail,
        telefone: novoClienteTelefone,
        empresa: novoClienteEmpresa,
        cargo: novoClienteCargo,
        status: novoClienteStatus,
        valor: 0,
        ultimoContato: hoje,
        notas: novoClienteNotas,
        criadoEm: hoje,
        valorTotal: 0
      };
      setClientes([...clientes, novoCliente]);
      setIsAdicionarOpen(false);
      resetNovoClienteForm();
    }
  };

  const resetNovoClienteForm = () => {
    setNovoClienteNome("");
    setNovoClienteEmail("");
    setNovoClienteTelefone("");
    setNovoClienteEmpresa("");
    setNovoClienteCargo("");
    setNovoClienteStatus("lead");
    setNovoClienteNotas("");
  };

  const handleExcluirCliente = (clienteId: string) => {
    setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setEditClienteNome(cliente.nome);
    setEditClienteEmail(cliente.email);
    setEditClienteTelefone(cliente.telefone);
    setEditClienteEmpresa(cliente.empresa || "");
    setEditClienteCargo(cliente.cargo || "");
    setEditClienteStatus(cliente.status || "lead");
    setEditClienteNotas(cliente.notas || "");
    setIsEditarOpen(true);
  };

  const handleSalvarEdicaoCliente = () => {
    if (
      clienteEditando &&
      editClienteNome &&
      editClienteEmail &&
      editClienteTelefone
    ) {
      const clientesAtualizados = clientes.map((cliente) =>
        cliente.id === clienteEditando.id
          ? {
              ...cliente,
              nome: editClienteNome,
              email: editClienteEmail,
              telefone: editClienteTelefone,
              empresa: editClienteEmpresa,
              cargo: editClienteCargo,
              status: editClienteStatus,
              notas: editClienteNotas,
            }
          : cliente
      );
      setClientes(clientesAtualizados);
      setIsEditarOpen(false);
      setClienteEditando(null);
    }
  };
  
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ativo</Badge>;
      case "lead":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Lead</Badge>;
      case "oportunidade":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Oportunidade</Badge>;
      case "inativo":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status || "Não definido"}</Badge>;
    }
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined) return "R$ 0,00";
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  
  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cliente.empresa && cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase())) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Card className="w-full">
          <CardHeader className="px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">Clientes</CardTitle>
                <CardDescription>Gerencie seus clientes e contatos</CardDescription>
              </div>
              <Button onClick={() => setIsAdicionarOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Cliente
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, empresa ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Telefone</TableHead>
                      <TableHead className="hidden lg:table-cell">Empresa</TableHead>
                      <TableHead className="hidden lg:table-cell">Valor</TableHead>
                      <TableHead className="hidden xl:table-cell">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.length > 0 ? (
                      filteredClientes.map((cliente) => (
                        <TableRow key={cliente.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewClientDetails(cliente)}>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 hidden sm:flex">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {cliente.nome.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="cursor-pointer" onClick={() => handleViewClientDetails(cliente)}>
                                <span className="font-medium">{cliente.nome}</span>
                                <p className="text-sm text-muted-foreground sm:hidden">{cliente.email}</p>
                                <p className="text-sm text-muted-foreground md:hidden">{cliente.telefone}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{cliente.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                          <TableCell className="hidden lg:table-cell">{cliente.empresa || "-"}</TableCell>
                          <TableCell className="hidden lg:table-cell">{formatCurrency(cliente.valor)}</TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {getStatusBadge(cliente.status)}
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditarCliente(cliente);
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
                                  handleExcluirCliente(cliente.id);
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
                        <TableCell colSpan={7} className="text-center py-6">
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isAdicionarOpen} onOpenChange={(open) => {
          setIsAdicionarOpen(open);
          if (!open) resetNovoClienteForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome*
                </Label>
                <Input
                  id="nome"
                  value={novoClienteNome}
                  onChange={(e) => setNovoClienteNome(e.target.value)}
                  className="col-span-3"
                  placeholder="Nome completo"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={novoClienteEmail}
                  onChange={(e) => setNovoClienteEmail(e.target.value)}
                  className="col-span-3"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone*
                </Label>
                <Input
                  id="telefone"
                  value={novoClienteTelefone}
                  onChange={(e) => setNovoClienteTelefone(e.target.value)}
                  className="col-span-3"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="empresa" className="text-right">
                  Empresa
                </Label>
                <Input
                  id="empresa"
                  value={novoClienteEmpresa}
                  onChange={(e) => setNovoClienteEmpresa(e.target.value)}
                  className="col-span-3"
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cargo" className="text-right">
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  value={novoClienteCargo}
                  onChange={(e) => setNovoClienteCargo(e.target.value)}
                  className="col-span-3"
                  placeholder="Cargo ou função"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  value={novoClienteStatus}
                  onChange={(e) => setNovoClienteStatus(e.target.value)}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="lead">Lead</option>
                  <option value="oportunidade">Oportunidade</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notas" className="text-right">
                  Notas
                </Label>
                <textarea
                  id="notas"
                  value={novoClienteNotas}
                  onChange={(e) => setNovoClienteNotas(e.target.value)}
                  rows={3}
                  className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Observações sobre o cliente"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsAdicionarOpen(false);
                  resetNovoClienteForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" onClick={handleAdicionarCliente}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditarOpen} onOpenChange={setIsEditarOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            {clienteEditando ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nome" className="text-right">
                    Nome*
                  </Label>
                  <Input
                    id="edit-nome"
                    value={editClienteNome}
                    onChange={(e) => setEditClienteNome(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email*
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editClienteEmail}
                    onChange={(e) => setEditClienteEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-telefone" className="text-right">
                    Telefone*
                  </Label>
                  <Input
                    id="edit-telefone"
                    value={editClienteTelefone}
                    onChange={(e) => setEditClienteTelefone(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-empresa" className="text-right">
                    Empresa
                  </Label>
                  <Input
                    id="edit-empresa"
                    value={editClienteEmpresa}
                    onChange={(e) => setEditClienteEmpresa(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-cargo" className="text-right">
                    Cargo
                  </Label>
                  <Input
                    id="edit-cargo"
                    value={editClienteCargo}
                    onChange={(e) => setEditClienteCargo(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <select
                    id="edit-status"
                    value={editClienteStatus}
                    onChange={(e) => setEditClienteStatus(e.target.value)}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="lead">Lead</option>
                    <option value="oportunidade">Oportunidade</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-notas" className="text-right">
                    Notas
                  </Label>
                  <textarea
                    id="edit-notas"
                    value={editClienteNotas}
                    onChange={(e) => setEditClienteNotas(e.target.value)}
                    rows={3}
                    className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Observações sobre o cliente"
                  />
                </div>
              </div>
            ) : (
              <p>Nenhum cliente selecionado para edição.</p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditarOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSalvarEdicaoCliente}
                disabled={!clienteEditando}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet open={isViewingDetails} onOpenChange={setIsViewingDetails}>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader className="pb-4">
            <SheetTitle className="text-xl">Detalhes do Cliente</SheetTitle>
              <SheetDescription>
                Informações do cliente
              </SheetDescription>
            </SheetHeader>
            
            {selectedCliente && (
              <ClientOnly>
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {selectedCliente.nome.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{selectedCliente.nome}</h3>
                        <p className="text-sm text-muted-foreground">{selectedCliente.cargo} em {selectedCliente.empresa}</p>
                        {getStatusBadge(selectedCliente.status)}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsViewingDetails(false);
                        handleEditarCliente(selectedCliente);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>

                  <Tabs defaultValue="info">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="info">Informações</TabsTrigger>
                      <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                      <TabsTrigger value="historico">Histórico</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info" className="mt-0">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm">{selectedCliente.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Telefone</p>
                            <p className="text-sm">{selectedCliente.telefone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Empresa</p>
                            <p className="text-sm">{selectedCliente.empresa || "-"}</p>
                          </div>
                        </div>
                        <div className="pt-3">
                          <p className="text-sm font-medium mb-1">Notas</p>
                          <p className="text-sm text-muted-foreground">{selectedCliente.notas || "Nenhuma nota registrada para este cliente."}</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="financeiro" className="mt-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Valor em negociação</p>
                            <p className="text-lg font-semibold">{formatCurrency(selectedCliente.valor)}</p>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-sm text-muted-foreground">Valor total</p>
                            <p className="text-lg font-semibold">{formatCurrency(selectedCliente.valorTotal)}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Histórico financeiro</p>
                          <div className="bg-muted/30 rounded-md p-3">
                            {(selectedCliente.valorTotal && selectedCliente.valorTotal > 0) ? (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Projeto anterior</span>
                                  <span className="font-medium">{formatCurrency((selectedCliente.valorTotal || 0) - (selectedCliente.valor || 0))}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-sm">
                                  <span>Em negociação</span>
                                  <span className="font-medium">{formatCurrency(selectedCliente.valor)}</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Nenhum histórico financeiro disponível</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Próximos passos</p>
                          <div className="bg-muted/30 rounded-md p-3">
                            {selectedCliente.proximoContato ? (
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm">Próxima reunião</p>
                                  <p className="text-sm font-medium">{formatDate(selectedCliente.proximoContato)}</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Reagendar
                                </Button>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">Nenhum contato agendado</p>
                                <Button variant="outline" size="sm">
                                  Agendar
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="historico" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Informações de registro</p>
                          <div className="bg-muted/30 rounded-md p-3">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Cliente desde</span>
                                <span className="font-medium">{formatDate(selectedCliente.criadoEm)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Último contato</span>
                                <span className="font-medium">{formatDate(selectedCliente.ultimoContato)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Próximo contato</span>
                                <span className="font-medium">{selectedCliente.proximoContato ? formatDate(selectedCliente.proximoContato) : "-"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Atividades recentes</p>
                          <div className="bg-muted/30 rounded-md p-3">
                            {selectedCliente.ultimoContato ? (
                              <div className="space-y-3">
                                <div className="flex gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Phone className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm">Ligação realizada</p>
                                    <p className="text-xs text-muted-foreground">{formatDate(selectedCliente.ultimoContato)}</p>
                                  </div>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Mail className="h-4 w-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm">Email enviado</p>
                                    <p className="text-xs text-muted-foreground">{formatDate(selectedCliente.ultimoContato)}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Nenhuma atividade registrada para este cliente.</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Observações</p>
                          <div className="bg-muted/30 rounded-md p-3">
                            <p className="text-sm text-muted-foreground">
                              {selectedCliente.observacoes || "Nenhuma observação registrada para este cliente."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <SheetFooter className="flex-col gap-3 mt-6">
                    <div className="flex gap-3 w-full">
                      <Button className="flex-1" variant="outline" size="sm" asChild>
                        <a href={`mailto:${selectedCliente.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </a>
                      </Button>
                      <Button className="flex-1" variant="outline" size="sm" asChild>
                        <a href={`tel:${selectedCliente.telefone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Ligar
                        </a>
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        handleExcluirCliente(selectedCliente.id);
                        setIsViewingDetails(false);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir Cliente
                    </Button>
                  </SheetFooter>
                </div>
              </ClientOnly>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}