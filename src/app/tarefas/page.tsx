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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCheck, Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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

interface Tarefa {
  id: string;
  descricao: string;
  responsavel: string;
  prazo: string | null;
  concluida: boolean;
}

export default function TarefasPage() {
  return (
    <SafeHydration>
      <TarefasContent />
    </SafeHydration>
  );
}

function TarefasContent() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTarefas = localStorage.getItem("tarefas");
      let initialTarefas;

      if (storedTarefas) {
        initialTarefas = JSON.parse(storedTarefas);
      } else {
        initialTarefas = [
          {
            id: uuidv4(),
            descricao: "Ligar para o cliente",
            responsavel: "João",
            prazo: new Date().toISOString(),
            concluida: false,
          },
          {
            id: uuidv4(),
            descricao: "Enviar proposta",
            responsavel: "Maria",
            prazo: null,
            concluida: false,
          },
        ];
      }
      setTarefas(initialTarefas);
      setIsLoaded(true);
    } catch (error) {
      console.error("Erro ao carregar tarefas do localStorage:", error);
      setTarefas([]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
      } catch (error) {
        console.error("Erro ao salvar tarefas no localStorage:", error);
      }
    }
  }, [tarefas, isLoaded]);

  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false);
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState("");
  const [novaTarefaResponsavel, setNovaTarefaResponsavel] = useState("");
  const [novaTarefaPrazo, setNovaTarefaPrazo] = useState<Date | undefined>(
    undefined
  );

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
  const [editTarefaDescricao, setEditTarefaDescricao] = useState("");
  const [editTarefaResponsavel, setEditTarefaResponsavel] = useState("");
  const [editTarefaPrazo, setEditTarefaPrazo] = useState<Date | undefined>(
    undefined
  );

  const handleAdicionarTarefa = () => {
    if (novaTarefaDescricao && novaTarefaResponsavel) {
      const novaTarefa: Tarefa = {
        id: uuidv4(),
        descricao: novaTarefaDescricao,
        responsavel: novaTarefaResponsavel,
        prazo: novaTarefaPrazo ? novaTarefaPrazo.toISOString() : null,
        concluida: false,
      };
      setTarefas([...tarefas, novaTarefa]);
      setIsAdicionarOpen(false);
      setNovaTarefaDescricao("");
      setNovaTarefaResponsavel("");
      setNovaTarefaPrazo(undefined);
    }
  };

  const handleExcluirTarefa = (tarefaId: string) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== tarefaId));
  };

  const handleEditarTarefa = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa);
    setEditTarefaDescricao(tarefa.descricao);
    setEditTarefaResponsavel(tarefa.responsavel);
    setEditTarefaPrazo(tarefa.prazo ? new Date(tarefa.prazo) : undefined);
    setIsEditarOpen(true);
  };

  const handleSalvarEdicaoTarefa = () => {
    if (tarefaEditando) {
      const tarefasAtualizadas = tarefas.map((tarefa) =>
        tarefa.id === tarefaEditando.id
          ? {
              ...tarefa,
              descricao: editTarefaDescricao,
              responsavel: editTarefaResponsavel,
              prazo: editTarefaPrazo ? editTarefaPrazo.toISOString() : null,
            }
          : tarefa
      );
      setTarefas(tarefasAtualizadas);
      setIsEditarOpen(false);
      setTarefaEditando(null);
    }
  };

  const handleConcluirTarefa = (tarefaId: string) => {
    const tarefasAtualizadas = tarefas.map((tarefa) =>
      tarefa.id === tarefaId ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="container mx-auto py-8 flex-1 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Tarefas</h1>

        <Button onClick={() => setIsAdicionarOpen(true)} className="mb-4">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Concluída</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tarefas.map((tarefa) => (
              <TableRow key={tarefa.id}>
                <TableCell>{tarefa.descricao}</TableCell>
                <TableCell>{tarefa.responsavel}</TableCell>
                <TableCell>
                  {tarefa.prazo
                    ? format(new Date(tarefa.prazo), "dd/MM/yyyy", {
                        locale: ptBR,
                      })
                    : "Sem prazo"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleConcluirTarefa(tarefa.id)}
                  >
                    {tarefa.concluida ? (
                      <CheckCheck className="h-4 w-4" />
                    ) : (
                      "Marcar"
                    )}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditarTarefa(tarefa)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleExcluirTarefa(tarefa.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isAdicionarOpen} onOpenChange={setIsAdicionarOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Tarefa</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">
                  Descrição
                </Label>
                <Input
                  id="descricao"
                  value={novaTarefaDescricao}
                  onChange={(e) => setNovaTarefaDescricao(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsavel" className="text-right">
                  Responsável
                </Label>
                <Input
                  id="responsavel"
                  value={novaTarefaResponsavel}
                  onChange={(e) => setNovaTarefaResponsavel(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prazo" className="text-right">
                  Prazo
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={
                        "w-[240px] pl-3 text-left font-normal" +
                        (novaTarefaPrazo
                          ? " text-foreground"
                          : " text-muted-foreground")
                      }
                    >
                      {novaTarefaPrazo ? (
                        format(novaTarefaPrazo, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={novaTarefaPrazo}
                      onSelect={setNovaTarefaPrazo}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsAdicionarOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" onClick={handleAdicionarTarefa}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditarOpen} onOpenChange={setIsEditarOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>
            {tarefaEditando ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-descricao" className="text-right">
                    Descrição
                  </Label>
                  <Input
                    id="edit-descricao"
                    value={editTarefaDescricao}
                    onChange={(e) => setEditTarefaDescricao(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-responsavel" className="text-right">
                    Responsável
                  </Label>
                  <Input
                    id="edit-responsavel"
                    value={editTarefaResponsavel}
                    onChange={(e) => setEditTarefaResponsavel(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-prazo" className="text-right">
                    Prazo
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={
                          "w-[240px] pl-3 text-left font-normal" +
                          (editTarefaPrazo
                            ? " text-foreground"
                            : " text-muted-foreground")
                        }
                      >
                        {editTarefaPrazo ? (
                          format(editTarefaPrazo, "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={editTarefaPrazo}
                        onSelect={setEditTarefaPrazo}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : (
              <p>Nenhuma tarefa selecionada para edição.</p>
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
                onClick={handleSalvarEdicaoTarefa}
                disabled={!tarefaEditando}
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