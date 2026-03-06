import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = "https://cita-ideal-backend.onrender.com";
const GestionGaleria = ({ onFotoSubida }) => {
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo || !titulo) return alert("Por favor, completa el título y selecciona una imagen");

    setSubiendo(true);

    // IMPORTANTE: Para enviar archivos usamos FormData
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('titulo', titulo);

    try {
      const response = await fetch(`${API_URL}/api/v1/galeria/subir`, {
        method: 'POST',
        body: formData, // No agregues Content-Type, el navegador lo hará solo
      });

      if (response.ok) {
        alert("¡Imagen subida con éxito!");
        setTitulo('');
        setArchivo(null);
        e.target.reset(); // Limpia el input de archivo
        if (onFotoSubida) onFotoSubida(); // Refresca la lista de fotos
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 mb-8"
    >
      <h3 className="text-lg font-serif font-bold text-rose-900 mb-4">Añadir nueva foto a la Galería</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
       <div className="flex-1">
  <label className="block text-[10px] uppercase font-black text-orange-500 mb-2 ml-1">
    Título de la Foto
  </label>
  <input 
    type="text" 
    placeholder="Ej: Cena Romántica en la Playa..."
    // ESTA CLASE ES LA CLAVE: text-slate-900 para que la letra sea oscura
    className="w-full p-4 bg-white border-2 border-orange-100 rounded-2xl text-slate-900 font-medium outline-none focus:border-rose-400 transition-all placeholder:text-gray-300"
    value={titulo}
    onChange={(e) => setTitulo(e.target.value)}
  />
</div>

        <div className="flex-grow">
          <label className="block text-[10px] uppercase font-black text-gray-400 mb-1 ml-2">Seleccionar Archivo</label>
          <input 
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={subiendo}
          className={`px-8 py-2 rounded-xl font-bold text-sm transition-all ${
            subiendo 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-100'
          }`}
        >
          {subiendo ? 'Subiendo...' : 'Subir Foto'}
        </button>
      </form>
    </motion.div>
  );
};

export default GestionGaleria;