import React, { useState, useEffect } from 'react';
import EditarPlanModal from './EditarPlanModal'; // Importamos el modal que creamos
const API_URL = "https://cita-ideal-backend.onrender.com";
const GestionPlanes = () => {
    const [planes, setPlanes] = useState([]);
    const [subiendoId, setSubiendoId] = useState(null);

    // ESTADOS PARA LA EDICIÓN
    const [planAEditar, setPlanAEditar] = useState(null);

    useEffect(() => {
        cargarPlanes();
    }, []);

    const cargarPlanes = async () => {
        try {
            const res = await fetch('${API_URL}/api/v1/planes/ver/activos');
            if (res.ok) {
                const data = await res.json();
                setPlanes(data);
            }
        } catch (error) {
            console.error("Error al cargar planes:", error);
        }
    };

    const handleSubirImagen = async (id, archivo) => {
        if (!archivo) return;
        setSubiendoId(id);
        const formData = new FormData();
        formData.append('archivo', archivo);

        try {
           const response = await fetch(`${API_URL}/api/v1/planes/${id}/subir-imagen`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert("✅ Imagen actualizada");
                cargarPlanes();
            }
        } catch (error) {
            alert("❌ Error al subir");
        } finally {
            setSubiendoId(null);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-orange-100 shadow-sm mt-8">
            <h3 className="text-xl font-serif font-bold text-rose-900 mb-6 italic">🎯 Gestión de Experiencias</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planes.map(plan => (
                    <div key={plan.id} className="border border-orange-50 rounded-[2rem] p-5 bg-[#fafaf9] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <div className="h-36 w-full mb-4 rounded-2xl overflow-hidden bg-gray-200 relative">
                                {(plan.imagenUrl || plan.imagen) ? (
                                    <img src={plan.imagenUrl || plan.imagen} className="w-full h-full object-cover" alt={plan.nombre} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">Sin imagen</div>
                                )}
                                {subiendoId === plan.id && (
                                    <div className="absolute inset-0 bg-rose-900/40 backdrop-blur-sm flex items-center justify-center">
                                        <p className="text-white text-[10px] font-bold animate-bounce">SUBIENDO...</p>
                                    </div>
                                )}
                            </div>

                            <h4 className="font-bold text-rose-900 text-lg mb-1">{plan.nombre}</h4>
                            <p className="text-xl font-black text-rose-600 mb-2">
                                ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
                            </p>
                            {/* Busca esta parte en tu PlanDetalle.jsx */}
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-light whitespace-pre-wrap">
                                {plan.descripcion}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {/* BOTÓN PARA EDITAR TEXTO Y PRECIO */}
                            <button
                                onClick={() => setPlanAEditar(plan)}
                                className="w-full bg-amber-100 text-amber-800 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
                            >
                                ✏️ Editar Datos
                            </button>

                            {/* BOTÓN PARA CAMBIAR FOTO */}
                            <label className="block">
                                <span className="sr-only">Elegir foto</span>
                                <div className="relative">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id={`file-${plan.id}`}
                                        onChange={(e) => handleSubirImagen(plan.id, e.target.files[0])}
                                    />
                                    <label
                                        htmlFor={`file-${plan.id}`}
                                        className="w-full bg-rose-50 text-rose-700 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-rose-100"
                                    >
                                        📷 Cambiar Foto
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL DE EDICIÓN - Solo aparece cuando hay un plan seleccionado */}
            {planAEditar && (
                <EditarPlanModal
                    plan={planAEditar}
                    onClose={() => setPlanAEditar(null)}
                    onActualizar={cargarPlanes}
                />
            )}
        </div>
    );
};

export default GestionPlanes;