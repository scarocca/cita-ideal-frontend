import React, { useState, useEffect } from 'react';

const ActualizarFotoPlan = () => {
    const [planes, setPlanes] = useState([]);
    const [planSeleccionado, setPlanSeleccionado] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [cargando, setCargando] = useState(false);

    // Cargamos los planes para llenar el select
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/planes/ver/activos')
            .then(res => res.json())
            .then(data => setPlanes(data))
            .catch(err => console.error("Error al cargar planes:", err));
    }, []);

    const handleSubir = async (e) => {
        e.preventDefault();
        if (!planSeleccionado || !archivo) {
            alert("Selecciona un plan y una imagen");
            return;
        }

        setCargando(true);
        const formData = new FormData();
        formData.append('archivo', archivo);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/planes/${planSeleccionado}/subir-imagen`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("✅ ¡Imagen del plan actualizada en Cloudinary!");
                setArchivo(null);
            } else {
                alert("❌ Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-100 mt-10">
            <h3 className="text-xl font-serif font-bold text-rose-900 mb-6">Actualizar Foto de Plan</h3>
            <form onSubmit={handleSubir} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-[10px] uppercase font-black text-gray-400 mb-2">Seleccionar Plan</label>
                    <select 
                        className="w-full p-3 bg-orange-50/50 border border-orange-100 rounded-xl outline-none"
                        onChange={(e) => setPlanSeleccionado(e.target.value)}
                    >
                        <option value="">-- Elige un plan --</option>
                        {planes.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-[10px] uppercase font-black text-gray-400 mb-2">Nueva Imagen</label>
                    <input 
                        type="file" 
                        onChange={(e) => setArchivo(e.target.files[0])}
                        className="text-xs"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={cargando}
                    className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition-all disabled:bg-gray-300"
                >
                    {cargando ? 'Subiendo...' : 'Actualizar'}
                </button>
            </form>
        </div>
    );
};

export default ActualizarFotoPlan;