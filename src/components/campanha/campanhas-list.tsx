"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

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

interface CampanhasListProps {
  campanhas: Campanha[];
  onCampanhaDeleted: (campanhaId: string) => void;
}

export function CampanhasList({ campanhas, onCampanhaDeleted }: CampanhasListProps) {

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data Início</TableHead>
            <TableHead>Data Fim</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campanhas.map((campanha) => (
            <TableRow key={campanha.id}>
              <TableCell>{campanha.nome}</TableCell>
              <TableCell>{campanha.tipo}</TableCell>
              <TableCell>{campanha.status}</TableCell>
              <TableCell>{campanha.dataInicio}</TableCell>
              <TableCell>{campanha.dataFim}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onCampanhaDeleted(campanha.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}