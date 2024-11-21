"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  prazo: string;
  responsavel: string;
  status: string;
}

interface Subtarefa {
  id: number;
  titulo: string;
  descricao?: string;
  prazo: string;
  responsavel: string;
  status: string;
  tarefaId: number;
}

interface TarefasContextData {
  tarefas: Tarefa[];
  subtarefas: Subtarefa[];
  setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>;
  setSubtarefas: React.Dispatch<React.SetStateAction<Subtarefa[]>>;
}

interface TarefasProviderProps {
  children: ReactNode; 
}

const TarefasContext = createContext<TarefasContextData | undefined>(undefined);

export const TarefasProvider: React.FC<TarefasProviderProps> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [subtarefas, setSubtarefas] = useState<Subtarefa[]>([]);

  return (
    <TarefasContext.Provider value={{ tarefas, subtarefas, setTarefas, setSubtarefas }}>
      {children}
    </TarefasContext.Provider>
  );
};

export const useTarefas = (): TarefasContextData => {
  const context = useContext(TarefasContext);
  if (!context) {
    throw new Error("useTarefas deve ser usado dentro de um TarefasProvider");
  }
  return context;
};
