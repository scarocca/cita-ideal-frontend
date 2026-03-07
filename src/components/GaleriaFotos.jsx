import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Asegúrate de que esta URL sea la de tu Backend en Render
const API_URL = "https://cita-ideal-backend.onrender.com";

const GaleriaFotos = () => {
    const [imagenes, setImagenes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // CORRECCIÓN: Usamos backticks ( ` ) para que la variable API_URL funcione
        fetch(`${API_URL}/api/v1/galeria/todas`)
            .then(response => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                return response.json();
            })
            .then(data => {
                setImagenes(data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error cargando fotos:", error);
                setCargando(false);
            });
    }, []);

    // Función optimizada para obtener la URL de Cloudinary
    const getImagenUrl = (img) => {
        // Intentamos obtener el link de cualquier campo posible que venga del Backend
        const link = img.url || img.fotoUrl || img.archivo;
        
        if (!link) return 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
        
        // Forzamos HTTPS para evitar bloqueos de contenido mixto en el navegador
        return link.replace("http://", "https://");
    };

    return (
        <section className="min-h-screen bg-[#fafaf9] pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-serif font-bold text-rose-900 mb-4 tracking-tight">
                        Nuestros Momentos
                    </h2>
                    <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
                    <p className="mt-4 text-orange-800/60 italic font-light">
                        Capturando la magia de cada Cita Ideal
                    </p>
                </div>

                {cargando ? (
                    <div className="text-center py-20 text-rose-300 animate-pulse font-serif italic">
                        Cargando galería...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {imagenes.map((img, index) => (
                            <motion.div
                                key={img.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative rounded-[2.5rem] bg-white p-2 transition-all duration-500 hover:-translate-y-3"
                            >
                                {/* Resplandor decorativo en hover */}
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-rose-200 to-orange-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />

                                {/* Contenedor de la Imagen */}
                                <div className="relative overflow-hidden rounded-[2.2rem] border border-orange-50 bg-white shadow-md transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-rose-200/50">
                                    <img
                                        src={getImagenUrl(img)}
                                        alt={img.titulo || "Momento Cita Ideal"}
                                        className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/800x600?text=Error+al+cargar";
                                        }}
                                    />

                                    {/* Overlay con el título */}
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <p className="p-8 font-serif text-xl italic text-white w-full text-center mb-2">
                                            {img.titulo || "Cita Ideal"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!cargando && imagenes.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 italic">Aún no hay fotos en nuestra galería pública.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GaleriaFotos;