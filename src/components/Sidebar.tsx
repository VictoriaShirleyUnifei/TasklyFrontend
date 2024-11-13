'use client'; // Certifica-se de que o componente é tratado como um Client Component

import React from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaRegFolder } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import { VscGraph } from 'react-icons/vsc';

export default function Sidebar() {
  const route = useRouter(); // Usando o useRouter para navegação

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar bg-secondary text-white w-64 min-h-screen py-10">
        <div className='flex flex-col gap-12'>
          <div className='flex items-center justify-center gap-4'>
            <img className='flex w-8' src='logo.svg' />
            <div className="flex font-medium text-xl">Taskly!</div>
          </div>
          <div className='flex flex-col items-start justify-center gap-4 px-16'>
            <div 
              className="flex gap-2 hover:text-primary rounded cursor-pointer"
            >
                <MdOutlineDashboard size={24} />
                <p>Dashboard</p>
            </div>
            <div 
              className="flex gap-2 hover:text-primary rounded cursor-pointer"
            >
                <FaRegFolder size={24}/>
                <p>Projetos</p>
            </div>
            <div 
              className="flex gap-2 hover:text-primary rounded cursor-pointer"
            >
                <BsPerson size={24}/>
              <p>Clientes</p>
            </div>
            <div 
              className="flex gap-2 hover:text-primary rounded cursor-pointer"
            >
                <VscGraph size={24}/>
              <p>Relatórios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* O conteúdo principal vai aqui */}
      </div>
    </div>
  );
}
