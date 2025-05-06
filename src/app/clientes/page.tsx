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
import { Plus, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid'; 
import { SafeHydration } from "@/components/SafeHydration"; 
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
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

  useEffect(() => {
    const storedClientes = localStorage.getItem("clientes");
    const initialClientes = storedClientes ? JSON.parse(storedClientes) : [
      { id: uuidv4(), nome: "João da Silva", email: "joao@email.com", telefone: "1234-5678" },
      { id: uuidv4(), nome: "Maria Souza", email: "maria@email.com", telefone: "9876-5432" },
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

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [editClienteNome, setEditClienteNome] = useState("");
  const [editClienteEmail, setEditClienteEmail] = useState("");
  const [editClienteTelefone, setEditClienteTelefone] = useState("");

  const handleAdicionarCliente = () => {
    if (novoClienteNome && novoClienteEmail && novoClienteTelefone) {
      const novoCliente = {
        id: uuidv4(), 
        nome: novoClienteNome,
        email: novoClienteEmail,
        telefone: novoClienteTelefone,
      };
      setClientes([...clientes, novoCliente]);
      setIsAdicionarOpen(false);
      setNovoClienteNome("");
      setNovoClienteEmail("");
      setNovoClienteTelefone("");
    }
  };

  const handleExcluirCliente = (clienteId: string) => {
    setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setEditClienteNome(cliente.nome);
    setEditClienteEmail(cliente.email);
    setEditClienteTelefone(cliente.telefone);
    setIsEditarOpen(true);
  };

  const handleSalvarEdicaoCliente = () => {
    if (clienteEditando && editClienteNome && editClienteEmail && editClienteTelefone) {
      const clientesAtualizados = clientes.map((cliente) =>
        cliente.id === clienteEditando.id
          ? { ...cliente, nome: editClienteNome, email: editClienteEmail, telefone: editClienteTelefone }
          : cliente
      );
      setClientes(clientesAtualizados);
      setIsEditarOpen(false);
      setClienteEditando(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Clientes</h1>

      <Button onClick={() => setIsAdicionarOpen(true)} className="mb-4">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Cliente
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{cliente.telefone}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center space-x-2 justify-end"> 
                  <Button variant="ghost" size="icon" onClick={() => handleEditarCliente(cliente)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleExcluirCliente(cliente.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAdicionarOpen} onOpenChange={setIsAdicionarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Cliente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input id="nome" value={novoClienteNome} onChange={(e) => setNovoClienteNome(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value={novoClienteEmail} onChange={(e) => setNovoClienteEmail(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefone" className="text-right">
                Telefone
              </Label>
              <Input id="telefone" value={novoClienteTelefone} onChange={(e) => setNovoClienteTelefone(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsAdicionarOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" onClick={handleAdicionarCliente}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditarOpen} onOpenChange={setIsEditarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          {clienteEditando ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nome" className="text-right">
                  Nome
                </Label>
                <Input id="edit-nome" value={editClienteNome} onChange={(e) => setEditClienteNome(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input id="edit-email" value={editClienteEmail} onChange={(e) => setEditClienteEmail(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-telefone" className="text-right">
                  Telefone
                </Label>
                <Input id="edit-telefone" value={editClienteTelefone} onChange={(e) => setEditClienteTelefone(e.target.value)} className="col-span-3" />
              </div>
            </div>
          ) : (
            <p>Nenhum cliente selecionado para edição.</p>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditarOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" onClick={handleSalvarEdicaoCliente} disabled={!clienteEditando}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}