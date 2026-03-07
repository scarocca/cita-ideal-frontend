import React, { useState, useEffect } from 'react';
import EditarPlanModal from './EditarPlanModal'; 

const API_URL = "https://cita-ideal-backend.onrender.com";

const GestionPlanes = () => {
    const [planes, setPlanes] = useState([]);
    const [subiendoId, setSubiendoId] = useState(null);
    const [planAEditar, setPlanAEditar] = useState(null);

    const cargarPlanes = async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/planes/ver/activos`);
            if (res.ok) {
                const data = await res.json();
                setPlanes(data);
            }
        } catch (error) { console.error(error); }
    };

    useEffect(() => { cargarPlanes(); }, []);

    const getPlanImage = (p) => {
        const link = p.imagenUrl || p.fotoUrl || p.url || p.imagen;
        return link ? link.replace("http://", "https://") : null;
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-orange-100 shadow-sm mt-8">
            <h3 className="text-xl font-serif font-bold text-rose-900 mb-6 italic">🎯 Gestión de Experiencias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planes.map(plan => (
                    <div key={plan.id} className="border border-orange-50 rounded-[2rem] p-5 bg-[#fafaf9] shadow-sm">
                        <div className="h-36 w-full mb-4 rounded-2xl overflow-hidden bg-gray-200">
                            {getPlanImage(plan) ? (
                                <img src={getPlanImage(plan)} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 text-xs">Sin imagen</div>
                            )}
                        </div>
                        <h4 className="font-bold text-rose-900">{plan.nombre}</h4>
                        <p className="text-xl font-black text-rose-600">
                          {/* ✅ CORREGIDO: precioBase */}
                          ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
                        </p>
                        <button onClick={() => setPlanAEditar(plan)} className="w-full bg-amber-100 text-amber-800 py-3 rounded-xl mt-4 font-bold">
                          ✏️ Editar Datos
                        </button>
                    </div>
                ))}
            </div>
            {planAEditar && <EditarPlanModal plan={planAEditar} onClose={() => setPlanAEditar(null)} onActualizar={cargarPlanes} />}
        </div>
    );
};

export default GestionPlanes;