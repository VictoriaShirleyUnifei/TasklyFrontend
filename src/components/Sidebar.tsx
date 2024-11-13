'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaRegFolder } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import { VscGraph } from 'react-icons/vsc';

export default function Sidebar() {
  const route = useRouter(); 

  return (
    <div className="flex flex-col w-64 bg-secondary text-white min-h-screen py-10">
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-center gap-4">
          <img className="w-8" src="logo.svg" alt="Logo" />
          <div className="font-medium text-xl">Taskly!</div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4 px-4">
          <div 
            className="flex gap-2 hover:text-primary rounded cursor-pointer"
          >
              <MdOutlineDashboard size={24} />
              <p>Dashboard</p>
          </div>
          <div 
            className="flex gap-2 hover:text-primary rounded cursor-pointer"
          >
              <FaRegFolder size={24} />
              <p>Projetos</p>
          </div>
          <div 
            className="flex gap-2 hover:text-primary rounded cursor-pointer"
          >
              <BsPerson size={24} />
            <p>Clientes</p>
          </div>
          <div 
            className="flex gap-2 hover:text-primary rounded cursor-pointer"
          >
              <VscGraph size={24} />
            <p>Relatórios</p>
          </div>
        </div>
      </div>
    </div>
  );
}
