import React, { useState } from 'react';

const CrearPlanForm = ({ onPlanCreado }) => {
    const [archivo, setArchivo] = useState(null);
    const [datos, setDatos] = useState({ nombre: '', descripcion: '', precio: '', activo: true });
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!archivo) return alert("Por favor, selecciona una imagen para el plan.");

        setCargando(true);
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('nombre', datos.nombre);
        formData.append('descripcion', datos.descripcion);
        formData.append('precioBase', datos.precio); // Usamos precioBase como en tu Entidad Java
        formData.append('activo', datos.activo);

        try {
            const response = await fetch('http://localhost:8080/api/v1/planes/crear-con-foto', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("🚀 ¡Nuevo Plan creado con éxito!");
                setDatos({ nombre: '', descripcion: '', precio: '', activo: true });
                setArchivo(null);
                if (onPlanCreado) onPlanCreado(); 
            }
        } catch (error) {
            console.error("Error al crear plan:", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-orange-100 mb-10">
            <h3 className="text-xl font-serif font-bold text-rose-900 mb-6 flex items-center gap-2">
                ✨ Crear Nueva Experiencia
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                    {/* INPUT NOMBRE - CORREGIDO */}
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2 uppercase ml-2">Nombre del Plan</label>
                        <input
                            type="text"
                            placeholder="Ej: Cena bajo las estrellas"
                            // Añadimos bg-white y text-slate-900 para que se vea la letra
                            className={`w-full p-4 bg-white text-slate-900 border rounded-2xl outline-none focus:ring-2 font-medium ${
                                datos.nombre.length > 0 && (datos.nombre.length < 5 || datos.nombre.length > 25)
                                ? 'border-red-400 focus:ring-red-300'
                                : 'border-orange-100 focus:ring-rose-400'
                            }`}
                            value={datos.nombre}
                            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                            required
                        />
                        {datos.nombre.length > 0 && (datos.nombre.length < 5 || datos.nombre.length > 25) && (
                            <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">
                                ⚠️ Debe tener entre 5 y 25 caracteres
                            </p>
                        )}
                    </div>

                    {/* TEXTAREA DESCRIPCION - CORREGIDO */}
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2 uppercase ml-2">Descripción</label>
                        <textarea
                            placeholder="Describe la experiencia..."
                            className="w-full p-4 bg-white text-slate-900 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-rose-400 h-32 font-medium"
                            value={datos.descripcion}
                            onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* INPUT PRECIO - CORREGIDO */}
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2 uppercase ml-2">Precio base (CLP)</label>
                        <input
                            type="number"
                            placeholder="Ej: 85000"
                            className="w-full p-4 bg-white text-slate-900 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-rose-400 font-medium"
                            value={datos.precio}
                            onChange={(e) => setDatos({ ...datos, precio: e.target.value })}
                            required
                        />
                    </div>

                    <div className="p-4 border-2 border-dashed border-orange-200 rounded-2xl bg-orange-50/20 text-center">
                        <label className="block text-xs font-bold text-slate-800 mb-2 uppercase">Imagen de Portada</label>
                        <input
                            type="file"
                            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-rose-600 file:text-white cursor-pointer"
                            onChange={(e) => setArchivo(e.target.files[0])}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-rose-700 transition-all transform active:scale-95 disabled:bg-gray-400 mt-4"
                    >
                        {cargando ? '🚀 Guardando en la nube...' : 'Publicar Plan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearPlanForm;