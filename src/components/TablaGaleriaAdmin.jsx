import React, { useEffect, useState } from 'react';

const TablaGaleriaAdmin = ({ refresh }) => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/galeria/todas')
      .then(res => res.json())
      .then(data => setFotos(data));
  }, [refresh]);

  const eliminarFoto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta foto?")) {
      const response = await fetch(`http://localhost:8080/api/v1/galeria/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFotos(fotos.filter(f => f.id !== id));
      }
    }
  };

  return (
    <div className="mt-8 bg-white rounded-[2rem] p-8 border border-orange-100 shadow-sm">
      <h3 className="text-xl font-serif font-bold text-rose-900 mb-6">Fotos en Galería</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {fotos.map(foto => (
          <div key={foto.id} className="flex flex-col gap-2">
            {/* Contenedor de la imagen */}
            <div className="relative group rounded-2xl overflow-hidden aspect-square border border-orange-50 shadow-sm">
              <img 
                src={foto.archivo} 
                alt={foto.titulo} 
                className="w-full h-full object-cover" 
              />
              {/* Botón de eliminar que aparece al pasar el mouse */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => eliminarFoto(foto.id)}
                  className="bg-rose-600 text-white p-2 rounded-xl hover:bg-rose-800 shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* TÍTULO VISIBLE ABAJO */}
            <p className="text-[11px] font-bold text-rose-900 truncate px-1 uppercase tracking-wider text-center">
              {foto.titulo || "Sin título"}
            </p>
          </div>
        ))}
      </div>

      {fotos.length === 0 && (
        <p className="text-center py-10 text-gray-400 italic">No hay fotos para mostrar.</p>
      )}
    </div>
  );
};

export default TablaGaleriaAdmin;