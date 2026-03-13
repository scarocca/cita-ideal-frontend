import React from 'react';
import PlanCard from './PlanCard'; // Si lo tienes en el mismo archivo, omite esta importación

const Gallery = ({ planes = [] }) => (
  <section id="experiencias" className="py-20 bg-transparent relative z-10">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-serif font-bold text-rose-900 text-center mb-10">
        Experiencias a la Orilla del Mar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {planes.length > 0 ? (
          planes.map((plan, index) => (
            <PlanCard 
              key={plan.id || index} 
              plan={plan} 
              index={index} 
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 italic">
            No hay planes disponibles por el momento.
          </p>
        )}
      </div>
    </div>
  </section>
);

export default Gallery;