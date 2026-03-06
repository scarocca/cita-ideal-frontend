import React from 'react';

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Círculo Rojo (Pasión/Citas) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px] animate-blob"></div>
      {/* Círculo Púrpura (Elegancia) */}
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-700/10 blur-[100px] animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default BackgroundElements;