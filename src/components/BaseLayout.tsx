'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

interface BaseLayoutProps {
  title: string;
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar sempre presente */}
        <Sidebar />

        {/* Conteúdo principal com título dinâmico */}
        <div className="flex-1 p-8 space-y-4">
          <h1 className="text-4xl font-bold text-customGray font-poppins">{title}</h1>
          {children}
        </div>
      </div>

      {/* Footer sempre presente */}
      <Footer />
    </div>
  );
};

export default BaseLayout;
