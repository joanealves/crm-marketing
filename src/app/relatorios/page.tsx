"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "lucide-react";
import { vendas } from "@/data/vendas";
import { campanhas } from "@/data/campanhas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface VendasMensais {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export default function RelatoriosPage() {
  const [vendasMensais, setVendasMensais] = useState<VendasMensais>({
    labels: [],
    datasets: [],
  });
  const [campanhasData, setCampanhasData] = useState<ChartData>({ labels: [], datasets: [] });
  const [totalVendas, setTotalVendas] = useState(0);
  const [taxaAberturaMedia, setTaxaAberturaMedia] = useState(0);

  useEffect(() => {
    const vendasPorMes: { [key: string]: number } = {};
    vendas.forEach(venda => {
      const dataVenda = new Date(venda.data);
      const mesAno = `${dataVenda.getMonth() + 1}/${dataVenda.getFullYear()}`;
      if (vendasPorMes[mesAno]) {
        vendasPorMes[mesAno] += venda.valor;
      } else {
        vendasPorMes[mesAno] = venda.valor;
      }
    });

    const labelsVendas = Object.keys(vendasPorMes);
    const dataVendas = Object.values(vendasPorMes);

    setVendasMensais({
      labels: labelsVendas,
      datasets: [
        {
          label: 'Vendas Mensais',
          data: dataVendas,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });

    const labelsCampanhas = campanhas.map(campanha => campanha.nome);
    const dataCampanhas = campanhas.map(campanha => {
      const taxaAbertura = campanha.taxaAbertura ? parseFloat(campanha.taxaAbertura.replace('%', '')) : 0;
      return taxaAbertura;
    });

    setCampanhasData({
      labels: labelsCampanhas,
      datasets: [
        {
          label: 'Taxa de Abertura (%)',
          data: dataCampanhas,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });

    const totalVendasCalculado = vendas.reduce((acc, venda) => acc + venda.valor, 0);
    setTotalVendas(totalVendasCalculado);

    const totalTaxaAbertura = campanhas.reduce((acc, campanha) => {
      const taxaAbertura = campanha.taxaAbertura ? parseFloat(campanha.taxaAbertura.replace('%', '')) : 0;
      return acc + taxaAbertura;
    }, 0);
    const taxaAberturaMediaCalculada = campanhas.length > 0 ? totalTaxaAbertura / campanhas.length : 0;
    setTaxaAberturaMedia(taxaAberturaMediaCalculada);

  }, []);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vendas por Período',
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Desempenho de Campanhas',
      },
    },
  };

  return (
    <div className="flex h-screen"> 
      <Sidebar /> 

      <div className="flex-1 overflow-y-auto p-8"> 
        <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumo Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Vendas</p>
                <p className="text-2xl font-bold">R$ {totalVendas.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Número de Campanhas</p>
                <p className="text-2xl font-bold">{campanhas.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Abertura Média</p>
                <p className="text-2xl font-bold">{taxaAberturaMedia.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI Total</p>
                <p className="text-2xl font-bold">Em breve</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-4 w-4" />
                <span>Vendas por Período</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vendasMensais?.labels?.length > 0 ? (
                <Line options={lineChartOptions} data={vendasMensais} />
              ) : (
                <p className="text-muted-foreground">Nenhum dado de vendas disponível.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="h-4 w-4" />
                <span>Desempenho de Campanhas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {campanhasData?.labels?.length > 0 ? (
                <Bar options={barChartOptions} data={campanhasData} />
              ) : (
                <p className="text-muted-foreground">Nenhum dado de campanhas disponível.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}