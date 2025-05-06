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
import { Plus, Edit, Trash2, Search } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  cargo?: string;
  status?: string;
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
          },
          {
            id: uuidv4(),
            nome: "Maria Souza",
            email: "maria@email.com",
            telefone: "(11) 9876-5432",
            empresa: "Startup Inovadora",
            cargo: "CEO",
            status: "lead",
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

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [editClienteNome, setEditClienteNome] = useState("");
  const [editClienteEmail, setEditClienteEmail] = useState("");
  const [editClienteTelefone, setEditClienteTelefone] = useState("");
  const [editClienteEmpresa, setEditClienteEmpresa] = useState("");
  const [editClienteCargo, setEditClienteCargo] = useState("");
  const [editClienteStatus, setEditClienteStatus] = useState("");

  const handleAdicionarCliente = () => {
    if (novoClienteNome && novoClienteEmail && novoClienteTelefone) {
      const novoCliente = {
        id: uuidv4(),
        nome: novoClienteNome,
        email: novoClienteEmail,
        telefone: novoClienteTelefone,
        empresa: novoClienteEmpresa,
        cargo: novoClienteCargo,
        status: novoClienteStatus,
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
                <p className="text-muted-foreground">Gerencie seus clientes e contatos</p>
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
                placeholder="Buscar clientes..."
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
                      <TableHead className="hidden xl:table-cell">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.length > 0 ? (
                      filteredClientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 hidden sm:flex">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {cliente.nome.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{cliente.nome}</span>
                                <p className="text-sm text-muted-foreground sm:hidden">{cliente.email}</p>
                                <p className="text-sm text-muted-foreground md:hidden">{cliente.telefone}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{cliente.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                          <TableCell className="hidden lg:table-cell">{cliente.empresa || "-"}</TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {getStatusBadge(cliente.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditarCliente(cliente)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleExcluirCliente(cliente.id)}
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
                        <TableCell colSpan={6} className="text-center py-6">
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

        {/* Modal Adicionar Cliente */}
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

        {/* Modal Editar Cliente */}
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
      </div>
    </div>
  );
}