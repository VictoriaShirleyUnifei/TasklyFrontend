import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex w-full font-poppins gap-4 text-textColor-secondary  p-4 text-center justify-end fixed bottom-0 left-0 ">
      <div>&copy; 2024 Taskly!</div>
      <div>Todos os direitos reservados.</div>
    </footer>
  );
};

export default Footer;
