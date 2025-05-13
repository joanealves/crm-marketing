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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CheckCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  CalendarIcon, 
  PhoneIcon, 
  MailIcon, 
  VideoIcon,
  ListTodo
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { SafeHydration } from "@/components/SafeHydration";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { tarefas as tarefasIniciais } from "@/data/tarefa";
import { Tarefa } from "@/types/tarefa";

export default function TarefasPage() {
  return (
    <SafeHydration>
      <TarefasContent />
    </SafeHydration>
  );
}

function TarefasContent() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isLoaded, setIsLoaded] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<string | null>(null);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedTarefas = localStorage.getItem("tarefas_crm");
      let initialTarefas;

      if (storedTarefas) {
        initialTarefas = JSON.parse(storedTarefas);
      } else {
        initialTarefas = tarefasIniciais;
      }
      setTarefas(initialTarefas);
      setIsLoaded(true);
    } catch (error) {
      console.error("Erro ao carregar tarefas do localStorage:", error);
      setTarefas(tarefasIniciais);
      setIsLoaded(true);
    }
  }, []);


  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("tarefas_crm", JSON.stringify(tarefas));
      } catch (error) {
        console.error("Erro ao salvar tarefas no localStorage:", error);
      }
    }
  }, [tarefas, isLoaded]);

  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({
    titulo: "",
    descricao: "",
    clienteNome: "",
    data: "",
    tipo: "reuniao",
    prioridade: "media",
    status: "pendente"
  });

  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
  const [isVisualizarOpen, setIsVisualizarOpen] = useState(false);
  const [tarefaVisualizando, setTarefaVisualizando] = useState<Tarefa | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const resetNovaTarefaForm = () => {
    setNovaTarefa({
      titulo: "",
      descricao: "",
      clienteNome: "",
      data: "",
      tipo: "reuniao",
      prioridade: "media",
      status: "pendente"
    });
    setSelectedDate(undefined);
  };


  const handleAdicionarTarefa = () => {
    if (novaTarefa.titulo && novaTarefa.clienteNome && selectedDate) {
      const newTask: Tarefa = {
        id: uuidv4(),
        titulo: novaTarefa.titulo,
        descricao: novaTarefa.descricao || "",
        clienteId: uuidv4(), 
        clienteNome: novaTarefa.clienteNome,
        data: selectedDate.toISOString(),
        status: novaTarefa.status as "pendente" | "concluida", 
        tipo: novaTarefa.tipo as "reuniao" | "ligacao" | "email", 
        prioridade: novaTarefa.prioridade as "alta" | "media" | "baixa" 
      };
      setTarefas([...tarefas, newTask]);
      setIsAdicionarOpen(false);
      resetNovaTarefaForm();
    }
  };

  const handleExcluirTarefa = (tarefaId: string) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== tarefaId));
  };

  const handleEditarTarefa = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa);
    setSelectedDate(new Date(tarefa.data));
    setIsEditarOpen(true);
  };

  const handleVisualizarTarefa = (tarefa: Tarefa) => {
    setTarefaVisualizando(tarefa);
    setIsVisualizarOpen(true);
  };

  const handleSalvarEdicaoTarefa = () => {
    if (tarefaEditando && selectedDate) {
      const tarefasAtualizadas = tarefas.map((tarefa) =>
        tarefa.id === tarefaEditando.id
          ? {
              ...tarefaEditando,
              data: selectedDate.toISOString(),
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
      tarefa.id === tarefaId
        ? {
            ...tarefa,
            status: (tarefa.status === "pendente" ? "concluida" : "pendente") as "pendente" | "concluida",
          }
        : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return format(data, "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "ligacao":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 flex items-center gap-1"><PhoneIcon className="h-3 w-3" /> Ligação</Badge>;
      case "email":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1"><MailIcon className="h-3 w-3" /> Email</Badge>;
      case "reuniao":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1"><VideoIcon className="h-3 w-3" /> Reunião</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "media":
        return <Badge variant="default">Média</Badge>;
      case "baixa":
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluida":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Concluída</Badge>;
      case "pendente":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalTarefas = tarefas.length;
  const tarefasPendentes = tarefas.filter(tarefa => tarefa.status === "pendente").length;
  const tarefasConcluidas = tarefas.filter(tarefa => tarefa.status === "concluida").length;
  const tarefasAltaPrioridade = tarefas.filter(tarefa => tarefa.prioridade === "alta" && tarefa.status === "pendente").length;
  
  const filteredTarefas = tarefas
    .filter(tarefa => 
      (tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tarefa.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (tarefa.descricao && tarefa.descricao.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (!tipoFiltro || tarefa.tipo === tipoFiltro) &&
      (!prioridadeFiltro || tarefa.prioridade === prioridadeFiltro)
    );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Tabs defaultValue="lista" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Tarefas</h1>
              <p className="text-muted-foreground">Gerencie suas tarefas e compromissos</p>
            </div>
            <div className="flex gap-2">
              <TabsList>
                <TabsTrigger value="lista">Lista</TabsTrigger>
                <TabsTrigger value="calendario">Calendário</TabsTrigger>
              </TabsList>
              <Button onClick={() => setIsAdicionarOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Tarefa
              </Button>
            </div>
          </div>

          <TabsContent value="lista" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <ListTodo className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <h3 className="text-2xl font-bold">{totalTarefas}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                      <CalendarIcon className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                      <h3 className="text-2xl font-bold">{tarefasPendentes}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <CheckCheck className="h-6 w-6 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Concluídas</p>
                      <h3 className="text-2xl font-bold">{tarefasConcluidas}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                      <CalendarIcon className="h-6 w-6 text-red-700 dark:text-red-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Alta Prioridade</p>
                      <h3 className="text-2xl font-bold">{tarefasAltaPrioridade}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-6">
                <CardTitle>Todas as Tarefas</CardTitle>
                <CardDescription>Gerencie todas as suas tarefas e compromissos</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <div className="relative sm:w-64 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar tarefas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <Select
                      value={tipoFiltro || ""}
                      onValueChange={(val) => setTipoFiltro(val === "todos" ? null : val)}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filtrar por tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os tipos</SelectItem>
                        <SelectItem value="reuniao">Reunião</SelectItem>
                        <SelectItem value="ligacao">Ligação</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={prioridadeFiltro || ""}
                      onValueChange={(val) => setPrioridadeFiltro(val === "todas" ? null : val)}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filtrar por prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as prioridades</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead className="hidden md:table-cell">Cliente</TableHead>
                          <TableHead className="hidden lg:table-cell">Data</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Prioridade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTarefas.length > 0 ? (
                          filteredTarefas.map((tarefa) => (
                            <TableRow key={tarefa.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleVisualizarTarefa(tarefa)}>
                              <TableCell className="font-medium">
                                {tarefa.titulo}
                                <p className="md:hidden text-sm text-muted-foreground">{tarefa.clienteNome}</p>
                                <p className="lg:hidden text-sm text-muted-foreground">{formatarData(tarefa.data)}</p>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{tarefa.clienteNome}</TableCell>
                              <TableCell className="hidden lg:table-cell">{formatarData(tarefa.data)}</TableCell>
                              <TableCell>{getTipoBadge(tarefa.tipo)}</TableCell>
                              <TableCell>{getPrioridadeBadge(tarefa.prioridade)}</TableCell>
                              <TableCell>{getStatusBadge(tarefa.status)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleConcluirTarefa(tarefa.id);
                                    }}
                                  >
                                    <CheckCheck className={`h-4 w-4 ${tarefa.status === "concluida" ? "text-green-600" : ""}`} />
                                    <span className="sr-only">Concluir</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditarTarefa(tarefa);
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
                                      handleExcluirTarefa(tarefa.id);
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
                              {searchTerm || tipoFiltro || prioridadeFiltro ? (
                                <div className="flex flex-col items-center">
                                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">Nenhuma tarefa encontrada com os filtros aplicados</p>
                                  <Button variant="outline" className="mt-4" onClick={() => {
                                    setSearchTerm("");
                                    setTipoFiltro(null);
                                    setPrioridadeFiltro(null);
                                  }}>
                                    Limpar filtros
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <ListTodo className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">Você ainda não tem tarefas cadastradas</p>
                                  <Button className="mt-4" onClick={() => setIsAdicionarOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Adicionar Tarefa
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

          <TabsContent value="calendario" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendário de Tarefas</CardTitle>
                <CardDescription>Visualize suas tarefas no calendário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Visualização de calendário em desenvolvimento</h3>
                  <p className="text-muted-foreground mb-4">
                    Esta funcionalidade estará disponível em breve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isAdicionarOpen} onOpenChange={(open) => {
          setIsAdicionarOpen(open);
          if (!open) resetNovaTarefaForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Tarefa</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="titulo" className="text-right">
                  Título*
                </Label>
                <Input
                  id="titulo"
                  value={novaTarefa.titulo}
                  onChange={(e) => setNovaTarefa({...novaTarefa, titulo: e.target.value})}
                  className="col-span-3"
                  placeholder="Título da tarefa"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">
                  Descrição
                </Label>
                <Input
                  id="descricao"
                  value={novaTarefa.descricao}
                  onChange={(e) => setNovaTarefa({...novaTarefa, descricao: e.target.value})}
                  className="col-span-3"
                  placeholder="Descrição da tarefa"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente*
                </Label>
                <Input
                  id="cliente"
                  value={novaTarefa.clienteNome}
                  onChange={(e) => setNovaTarefa({...novaTarefa, clienteNome: e.target.value})}
                  className="col-span-3"
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="data" className="text-right">
                  Data e Hora*
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={
                        "w-full col-span-3 text-left font-normal" +
                        (selectedDate
                          ? " text-foreground"
                          : " text-muted-foreground")
                      }
                    >
                      {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy HH:mm", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <Input
                        type="time"
                        onChange={(e) => {
                          if (selectedDate && e.target.value) {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            const newDate = new Date(selectedDate);
                            newDate.setHours(hours, minutes);
                            setSelectedDate(newDate);
                          }
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={novaTarefa.tipo}
                  onValueChange={(val) => setNovaTarefa({...novaTarefa, tipo: val})}
                >
                  <SelectTrigger id="tipo" className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reuniao">Reunião</SelectItem>
                    <SelectItem value="ligacao">Ligação</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prioridade" className="text-right">
                  Prioridade
                </Label>
                <Select
                  value={novaTarefa.prioridade}
                  onValueChange={(val) => setNovaTarefa({...novaTarefa, prioridade: val})}
                >
                  <SelectTrigger id="prioridade" className="col-span-3">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsAdicionarOpen(false);
                  resetNovaTarefaForm();
                }}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                onClick={handleAdicionarTarefa}
                disabled={!novaTarefa.titulo || !novaTarefa.clienteNome || !selectedDate}
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditarOpen} onOpenChange={setIsEditarOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>
            {tarefaEditando ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-titulo" className="text-right">
                    Título*
                  </Label>
                  <Input
                    id="edit-titulo"
                    value={tarefaEditando.titulo}
                    onChange={(e) => setTarefaEditando({...tarefaEditando, titulo: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-descricao" className="text-right">
                    Descrição
                  </Label>
                  <Input
                   id="edit-descricao"
                   value={tarefaEditando.descricao}
                   onChange={(e) => setTarefaEditando({...tarefaEditando, descricao: e.target.value})}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-cliente" className="text-right">
                   Cliente*
                 </Label>
                 <Input
                   id="edit-cliente"
                   value={tarefaEditando.clienteNome}
                   onChange={(e) => setTarefaEditando({...tarefaEditando, clienteNome: e.target.value})}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-data" className="text-right">
                   Data e Hora*
                 </Label>
                 <Popover>
                   <PopoverTrigger asChild>
                     <Button
                       variant={"outline"}
                       className={
                         "w-full col-span-3 text-left font-normal" +
                         (selectedDate
                           ? " text-foreground"
                           : " text-muted-foreground")
                       }
                     >
                       {selectedDate ? (
                         format(selectedDate, "dd/MM/yyyy HH:mm", { locale: ptBR })
                       ) : (
                         <span>Selecione uma data</span>
                       )}
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                       mode="single"
                       locale={ptBR}
                       selected={selectedDate}
                       onSelect={setSelectedDate}
                       initialFocus
                     />
                     <div className="p-3 border-t">
                       <Input
                         type="time"
                         defaultValue={selectedDate ? format(selectedDate, "HH:mm") : ""}
                         onChange={(e) => {
                           if (selectedDate && e.target.value) {
                             const [hours, minutes] = e.target.value.split(':').map(Number);
                             const newDate = new Date(selectedDate);
                             newDate.setHours(hours, minutes);
                             setSelectedDate(newDate);
                           }
                         }}
                       />
                     </div>
                   </PopoverContent>
                 </Popover>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-tipo" className="text-right">
                   Tipo
                 </Label>
                 <Select
                   value={tarefaEditando.tipo}
                   onValueChange={(val: "reuniao" | "ligacao" | "email") => setTarefaEditando({...tarefaEditando, tipo: val})}
                 >
                   <SelectTrigger id="edit-tipo" className="col-span-3">
                     <SelectValue placeholder="Selecione o tipo" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="reuniao">Reunião</SelectItem>
                     <SelectItem value="ligacao">Ligação</SelectItem>
                     <SelectItem value="email">Email</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-prioridade" className="text-right">
                   Prioridade
                 </Label>
                 <Select
                   value={tarefaEditando.prioridade}
                   onValueChange={(val: "alta" | "media" | "baixa") => setTarefaEditando({...tarefaEditando, prioridade: val})}
                 >
                   <SelectTrigger id="edit-prioridade" className="col-span-3">
                     <SelectValue placeholder="Selecione a prioridade" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="alta">Alta</SelectItem>
                     <SelectItem value="media">Média</SelectItem>
                     <SelectItem value="baixa">Baixa</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="edit-status" className="text-right">
                   Status
                 </Label>
                 <Select
                   value={tarefaEditando.status}
                   onValueChange={(val: "pendente" | "concluida") => setTarefaEditando({...tarefaEditando, status: val})}
                 >
                   <SelectTrigger id="edit-status" className="col-span-3">
                     <SelectValue placeholder="Selecione o status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="pendente">Pendente</SelectItem>
                     <SelectItem value="concluida">Concluída</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
           ) : null}
           <DialogFooter>
             <Button type="button" variant="secondary" onClick={() => setIsEditarOpen(false)}>
               Cancelar
             </Button>
             <Button 
               type="submit" 
               onClick={handleSalvarEdicaoTarefa}
               disabled={!tarefaEditando?.titulo || !tarefaEditando?.clienteNome || !selectedDate}
             >
               Salvar
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>

       <Dialog open={isVisualizarOpen} onOpenChange={setIsVisualizarOpen}>
         <DialogContent className="sm:max-w-md">
           <DialogHeader>
             <DialogTitle>Detalhes da Tarefa</DialogTitle>
           </DialogHeader>
           {tarefaVisualizando ? (
             <div className="py-4">
               <div className="flex justify-between items-center mb-4">
                 <div className="flex gap-2">
                   {getTipoBadge(tarefaVisualizando.tipo)}
                   {getPrioridadeBadge(tarefaVisualizando.prioridade)}
                   {getStatusBadge(tarefaVisualizando.status)}
                 </div>
                 <div className="flex gap-2">
                   <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => {
                       handleConcluirTarefa(tarefaVisualizando.id);
                       setTarefaVisualizando({
                         ...tarefaVisualizando,
                         status: tarefaVisualizando.status === "pendente" ? "concluida" : "pendente"
                       });
                     }}
                   >
                     <CheckCheck className={`h-4 w-4 ${tarefaVisualizando.status === "concluida" ? "text-green-600" : ""}`} />
                     <span className="sr-only">Concluir</span>
                   </Button>
                   <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => {
                       setIsVisualizarOpen(false);
                       handleEditarTarefa(tarefaVisualizando);
                     }}
                   >
                     <Edit className="h-4 w-4" />
                     <span className="sr-only">Editar</span>
                   </Button>
                   <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => {
                       handleExcluirTarefa(tarefaVisualizando.id);
                       setIsVisualizarOpen(false);
                     }}
                   >
                     <Trash2 className="h-4 w-4" />
                     <span className="sr-only">Excluir</span>
                   </Button>
                 </div>
               </div>

               <div className="space-y-4">
                 <div>
                   <h3 className="text-xl font-semibold">{tarefaVisualizando.titulo}</h3>
                 </div>
                 
                 <div className="grid grid-cols-[100px_1fr] gap-2">
                   <span className="text-sm font-medium text-muted-foreground">Cliente:</span>
                   <span>{tarefaVisualizando.clienteNome}</span>
                 </div>
                 
                 <div className="grid grid-cols-[100px_1fr] gap-2">
                   <span className="text-sm font-medium text-muted-foreground">Data:</span>
                   <span>{formatarData(tarefaVisualizando.data)}</span>
                 </div>
                 
                 {tarefaVisualizando.descricao && (
                   <div>
                     <span className="text-sm font-medium text-muted-foreground">Descrição:</span>
                     <p className="mt-1 text-sm">{tarefaVisualizando.descricao}</p>
                   </div>
                 )}
               </div>
             </div>
           ) : null}
           <DialogFooter>
             <Button type="button" onClick={() => setIsVisualizarOpen(false)}>
               Fechar
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     </div>
   </div>
 );
}
