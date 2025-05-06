"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface Campanha {
  id: string;
  nome: string;
  status: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
  destinatarios: number;
  taxaAbertura: string;
}

interface CampanhaFormProps {
  children: React.ReactNode;
  campanha?: Campanha;
  onCampanhaCreated: (campanha: Campanha) => void; 
}

export function CampanhaForm({ children, campanha, onCampanhaCreated }: CampanhaFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState(campanha?.nome || "");
  const [tipo, setTipo] = useState(campanha?.tipo || "email");
  const [status, setStatus] = useState(campanha?.status || "rascunho");
  const [dataInicio, setDataInicio] = useState(campanha?.dataInicio || "");
  const [dataFim, setDataFim] = useState(campanha?.dataFim || "");
  const [assunto, setAssunto] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [grupo, setGrupo] = useState("todos");

  const [nomeError, setNomeError] = useState("");

  const isEditing = !!campanha;

  const validateForm = () => {
    let isValid = true;
    if (!nome) {
      setNomeError("O nome da campanha é obrigatório.");
      isValid = false;
    } else {
      setNomeError("");
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);

      const novaCampanha = {
        id: Math.random().toString(), 
        nome,
        status,
        tipo,
        dataInicio,
        dataFim,
        destinatarios: 0,
        taxaAbertura: "0%",
      };

      onCampanhaCreated(novaCampanha); 

      toast({
        title: isEditing ? "Campanha atualizada!" : "Campanha criada!",
        description: isEditing
          ? "A campanha foi atualizada com sucesso."
          : "A nova campanha foi criada com sucesso.",
      });

      setNome("");
      setTipo("email");
      setStatus("rascunho");
      setDataInicio("");
      setDataFim("");
      setAssunto("");
      setConteudo("");
      setGrupo("todos");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar campanha" : "Nova campanha"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os detalhes da campanha existente."
              : "Preencha os campos para criar uma nova campanha."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="detalhes" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
              <TabsTrigger value="destinatarios">Destinatários</TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da campanha</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Promoção de Verão 2025"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                  {nomeError && <p className="text-red-500 text-sm">{nomeError}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de campanha</Label>
                    <Select value={tipo} onValueChange={setTipo}>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="notificacao">Notificação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rascunho">Rascunho</SelectItem>
                        <SelectItem value="agendada">Agendada</SelectItem>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="encerrada">Encerrada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data de início</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data de término</Label>
                    <Input
                      id="dataFim"
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conteudo" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  placeholder="Assunto do e-mail ou título da notificação"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conteudo">Conteúdo</Label>
                <Textarea
                  id="conteudo"
                  placeholder="Digite o conteúdo da campanha aqui"
                  className="min-h-[200px]"
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="destinatarios" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grupo">Grupo de destinatários</Label>
                <Select value={grupo} onValueChange={setGrupo}>
                  <SelectTrigger id="grupo">
                    <SelectValue placeholder="Selecione um grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os clientes</SelectItem>
                    <SelectItem value="ativos">Clientes ativos</SelectItem>
                    <SelectItem value="inativos">Clientes inativos</SelectItem>
                    <SelectItem value="novos">Novos clientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Filtros adicionais</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="regiao" className="text-sm">Região</Label>
                    <Select>
                      <SelectTrigger id="regiao">
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="norte">Norte</SelectItem>
                        <SelectItem value="nordeste">Nordeste</SelectItem>
                        <SelectItem value="centro-oeste">Centro-Oeste</SelectItem>
                        <SelectItem value="sudeste">Sudeste</SelectItem>
                        <SelectItem value="sul">Sul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segmento" className="text-sm">Segmento</Label>
                    <Select>
                      <SelectTrigger id="segmento">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="varejo">Varejo</SelectItem>
                        <SelectItem value="servicos">Serviços</SelectItem>
                        <SelectItem value="industria">Indústria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Salvando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Criar campanha"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}