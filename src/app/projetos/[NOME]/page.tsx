"use client";
import BaseLayout from "@/components/BaseLayout";
import { useParams } from "next/navigation";
import React from "react";

export default function DetalhesProjeto() {
  const params = useParams();
  const NOME = Array.isArray(params.NOME) ? params.NOME[0] : params.NOME; // Garante que seja uma string

  // Decodifica o nome do projeto para remover caracteres de escape
  const nomeProjetoDecodificado = decodeURIComponent(NOME || "Projeto Desconhecido");

  return (
    <BaseLayout title={`Detalhes do Projeto: ${nomeProjetoDecodificado}`}>
      <div className="p-8">
      </div>
    </BaseLayout>
  );
}
