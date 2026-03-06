import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const GaleriaFotos = () => {
    const [imagenes, setImagenes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/galeria/todas")
            .then(response => response.json())
            .then(data => setImagenes(data))
            .catch(error => console.error("Error cargando fotos:", error));
    }, []);

    const getImagenUrl = (archivo) => {
        if (!archivo) return 'https://via.placeholder.com/400';
        if (archivo.startsWith('http')) return archivo;
        return `http://localhost:8080/imagenes/galeria/${archivo}`;
    };

    return (
        <section className="min-h-screen bg-[#fafaf9] pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-serif font-bold text-rose-900 mb-4 tracking-tight">Nuestros Momentos</h2>
                    <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
                </div>

                {/* Usamos el Grid de 3 columnas que acordamos antes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {imagenes.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            // EL TRUCO: group para animar lo de adentro, hover: para subir la card
                            className="group relative rounded-[2.5rem] bg-white p-2 transition-all duration-500 hover:-translate-y-3"
                        >
                            {/* El Resplandor (Glow) de fondo: solo aparece en hover */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-rose-200 to-orange-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />

                            {/* Contenedor de la Imagen */}
                            <div className="relative overflow-hidden rounded-[2.2rem] border border-orange-50 bg-white shadow-md transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-rose-200/50">
                                <img
                                    src={getImagenUrl(img.archivo)}
                                    alt={img.titulo}
                                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay con el título que aparece suavemente */}
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <p className="p-6 font-serif text-lg italic text-white">
                                        {img.titulo}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GaleriaFotos;