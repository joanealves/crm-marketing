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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import { SafeHydration } from "@/components/SafeHydration"; 

interface Negocio {
  id: string;
  nome: string;
  cliente: string;
  valor: number;
  etapa: string;
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

  useEffect(() => {
    const storedNegocios = localStorage.getItem("negocios");
    const initialNegocios = storedNegocios ? JSON.parse(storedNegocios) : [
      { id: uuidv4(), nome: "Venda de Software", cliente: "Empresa A", valor: 10000, etapa: "proposta" },
      { id: uuidv4(), nome: "Consultoria", cliente: "Empresa B", valor: 5000, etapa: "negociação" },
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
  const [novoNegocioValor, setNovoNegocioValor] = useState<number | undefined>(undefined);
  const [novoNegocioEtapa, setNovoNegocioEtapa] = useState("proposta");

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [negocioEditando, setNegocioEditando] = useState<Negocio | null>(null);
  const [editNegocioNome, setEditNegocioNome] = useState("");
  const [editNegocioCliente, setEditNegocioCliente] = useState("");
  const [editNegocioValor, setEditNegocioValor] = useState<number | undefined>(undefined);
  const [editNegocioEtapa, setEditNegocioEtapa] = useState("proposta");

  const handleAdicionarNegocio = () => {
    if (novoNegocioNome && novoNegocioCliente && novoNegocioValor) {
      const novoNegocio = {
        id: uuidv4(),
        nome: novoNegocioNome,
        cliente: novoNegocioCliente,
        valor: novoNegocioValor,
        etapa: novoNegocioEtapa,
      };
      setNegocios([...negocios, novoNegocio]);
      setIsAdicionarOpen(false);
      setNovoNegocioNome("");
      setNovoNegocioCliente("");
      setNovoNegocioValor(undefined);
      setNovoNegocioEtapa("proposta");
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
    setIsEditarOpen(true);
  };

  const handleSalvarEdicaoNegocio = () => {
    if (negocioEditando && editNegocioNome && editNegocioCliente && editNegocioValor) {
      const negociosAtualizados = negocios.map((negocio) =>
        negocio.id === negocioEditando.id
          ? { ...negocio, nome: editNegocioNome, cliente: editNegocioCliente, valor: editNegocioValor, etapa: editNegocioEtapa }
          : negocio
      );
      setNegocios(negociosAtualizados);
      setIsEditarOpen(false);
      setNegocioEditando(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Negócios</h1>

      <Button onClick={() => setIsAdicionarOpen(true)} className="mb-4">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Negócio
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {negocios.map((negocio) => (
            <TableRow key={negocio.id}>
              <TableCell>{negocio.nome}</TableCell>
              <TableCell>{negocio.cliente}</TableCell>
              <TableCell>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(negocio.valor)}</TableCell>
              <TableCell>{negocio.etapa}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEditarNegocio(negocio)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleExcluirNegocio(negocio.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAdicionarOpen} onOpenChange={setIsAdicionarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Negócio</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input id="nome" value={novoNegocioNome} onChange={(e) => setNovoNegocioNome(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cliente" className="text-right">
                Cliente
              </Label>
              <Input id="cliente" value={novoNegocioCliente} onChange={(e) => setNovoNegocioCliente(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <Input
                type="number"
                id="valor"
                value={novoNegocioValor === undefined ? "" : novoNegocioValor.toString()}
                onChange={(e) => setNovoNegocioValor(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="etapa" className="text-right">
                Etapa
              </Label>
              <Select value={novoNegocioEtapa} onValueChange={setNovoNegocioEtapa} >
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
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsAdicionarOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" onClick={handleAdicionarNegocio}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditarOpen} onOpenChange={setIsEditarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Negócio</DialogTitle>
          </DialogHeader>
          {negocioEditando ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nome" className="text-right">
                  Nome
                </Label>
                <Input id="edit-nome" value={editNegocioNome} onChange={(e) => setEditNegocioNome(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-cliente" className="text-right">
                  Cliente
                </Label>
                <Input id="edit-cliente" value={editNegocioCliente} onChange={(e) => setEditNegocioCliente(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-valor" className="text-right">
                  Valor
                </Label>
                <Input
                  type="number"
                  id="edit-valor"
                  value={editNegocioValor === undefined ? "" : editNegocioValor.toString()}
                  onChange={(e) => setEditNegocioValor(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-etapa" className="text-right">
                  Etapa
                </Label>
                <Select value={editNegocioEtapa} onValueChange={setEditNegocioEtapa}>
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
            </div>
          ) : (
            <p>Nenhum negócio selecionado para edição.</p>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditarOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" onClick={handleSalvarEdicaoNegocio} disabled={!negocioEditando}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}